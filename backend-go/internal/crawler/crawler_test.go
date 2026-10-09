package crawler

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"

	"zaloapp-backend/internal/config"
	"zaloapp-backend/internal/models"
	"zaloapp-backend/internal/service"
)

// Dùng chính file feed của dự án làm dữ liệu mẫu
func loadProjectFeed(t *testing.T) models.GasPriceData {
	t.Helper()
	raw, err := os.ReadFile(filepath.Join("..", "..", "..", "gas-price-latest.json"))
	if err != nil {
		t.Fatalf("không đọc được gas-price-latest.json: %v", err)
	}
	var feed models.GasPriceData
	if err := json.Unmarshal(raw, &feed); err != nil {
		t.Fatalf("feed JSON lỗi: %v", err)
	}
	return feed
}

func newTestCrawler(t *testing.T, feed any, status int) (*GasCrawler, *service.GasService) {
	t.Helper()
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(status)
		_ = json.NewEncoder(w).Encode(feed)
	}))
	t.Cleanup(srv.Close)

	cfg := &config.Config{DataDir: t.TempDir(), GasFeedURL: srv.URL}
	svc, err := service.NewGasService(cfg)
	if err != nil {
		t.Fatal(err)
	}
	return NewGasCrawler(cfg, svc), svc
}

func TestSyncAppliesValidFeed(t *testing.T) {
	feed := loadProjectFeed(t)
	c, svc := newTestCrawler(t, feed, http.StatusOK)
	if err := c.CrawlAndUpdate(); err != nil {
		t.Fatal(err)
	}
	got := svc.GetPrices()
	if got.UpdateInfo.EffectiveDate != feed.UpdateInfo.EffectiveDate {
		t.Fatalf("kỳ = %s, muốn %s", got.UpdateInfo.EffectiveDate, feed.UpdateInfo.EffectiveDate)
	}
	if len(svc.GetHistory()) != len(feed.History) {
		t.Fatalf("lịch sử = %d kỳ, muốn %d", len(svc.GetHistory()), len(feed.History))
	}
	// Lần hai: không đổi gì
	if err := c.CrawlAndUpdate(); err != nil {
		t.Fatal(err)
	}
}

func TestSyncSkipsOlderFeed(t *testing.T) {
	feed := loadProjectFeed(t)
	feed.UpdateInfo.EffectiveDate = "01/01/2020"
	feed.Products[1].PriceZone1 = 11110
	c, svc := newTestCrawler(t, feed, http.StatusOK)
	before := svc.GetPrices().Products[1].PriceZone1
	if err := c.CrawlAndUpdate(); err != nil {
		t.Fatal(err)
	}
	if after := svc.GetPrices().Products[1].PriceZone1; after != before {
		t.Fatalf("feed cũ đã ghi đè giá: %d → %d", before, after)
	}
}

func TestSyncRejectsBrokenFeed(t *testing.T) {
	cases := map[string]func(*models.GasPriceData){
		"giá ngoài khoảng": func(f *models.GasPriceData) { f.Products[0].PriceZone1 = 150 },
		"vùng 2 < vùng 1":  func(f *models.GasPriceData) { f.Products[0].PriceZone2 = f.Products[0].PriceZone1 - 100 },
		"thiếu mặt hàng":   func(f *models.GasPriceData) { f.Products = f.Products[:2] },
		"sai ngày":         func(f *models.GasPriceData) { f.UpdateInfo.EffectiveDate = "2026-10-01" },
	}
	for name, mutate := range cases {
		t.Run(name, func(t *testing.T) {
			feed := loadProjectFeed(t)
			mutate(&feed)
			c, svc := newTestCrawler(t, feed, http.StatusOK)
			before := svc.GetPrices()
			if err := c.CrawlAndUpdate(); err == nil {
				t.Fatal("feed hỏng mà không báo lỗi")
			}
			if svc.GetPrices().Products[0].PriceZone1 != before.Products[0].PriceZone1 {
				t.Fatal("feed hỏng đã ghi đè dữ liệu")
			}
		})
	}
}

func TestSyncHandlesHTTPError(t *testing.T) {
	c, _ := newTestCrawler(t, map[string]string{"error": "x"}, http.StatusBadGateway)
	if err := c.CrawlAndUpdate(); err == nil {
		t.Fatal("HTTP 502 mà không báo lỗi")
	}
}
