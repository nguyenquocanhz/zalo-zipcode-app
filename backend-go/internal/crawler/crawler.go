package crawler

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/robfig/cron/v3"
	"zaloapp-backend/internal/config"
	"zaloapp-backend/internal/models"
	"zaloapp-backend/internal/service"
)

// GasCrawler tự động đồng bộ giá xăng dầu định kỳ từ feed JSON
type GasCrawler struct {
	cfg        *config.Config
	gasService *service.GasService
	httpClient *http.Client
}

// NewGasCrawler khởi tạo crawler
func NewGasCrawler(cfg *config.Config, gasService *service.GasService) *GasCrawler {
	return &GasCrawler{
		cfg:        cfg,
		gasService: gasService,
		httpClient: &http.Client{
			Timeout: 15 * time.Second,
		},
	}
}

// StartBackgroundWorker chạy cronjob cào dữ liệu định kỳ mỗi ngày
func (c *GasCrawler) StartBackgroundWorker(ctx context.Context) {
	loc, err := time.LoadLocation(c.cfg.Timezone)
	if err != nil {
		log.Printf("[Crawler] Không tải được múi giờ %s: %v. Dùng múi giờ Local.", c.cfg.Timezone, err)
		loc = time.Local
	}

	cronScheduler := cron.New(cron.WithLocation(loc))

	// 1. Cronjob cào dữ liệu mỗi ngày (Daily Cron)
	_, err = cronScheduler.AddFunc(c.cfg.DailyCronSchedule, func() {
		log.Printf("[CronJob] Đang chạy cronjob cào dữ liệu định kỳ mỗi ngày (%s theo múi giờ %s)...", c.cfg.DailyCronSchedule, loc.String())
		if err := c.CrawlAndUpdate(); err != nil {
			log.Printf("[CronJob] Lỗi cào dữ liệu: %v", err)
		}
	})
	if err != nil {
		log.Printf("[CronJob] Lỗi đăng ký Daily Cron (%s): %v", c.cfg.DailyCronSchedule, err)
	} else {
		log.Printf("[CronJob] ✓ Đã kích hoạt CronJob cào dữ liệu mỗi ngày: '%s' (Múi giờ: %s)", c.cfg.DailyCronSchedule, loc.String())
	}

	// 2. Cronjob theo dõi kỳ điều hành Thứ Năm (Thursday Flash Cron)
	if c.cfg.ThursdayCronSchedule != "" {
		_, err = cronScheduler.AddFunc(c.cfg.ThursdayCronSchedule, func() {
			log.Printf("[CronJob] Khung giờ điều hành Thứ Năm (%s): Đang quét bảng giá liên Bộ mới...", c.cfg.ThursdayCronSchedule)
			if err := c.CrawlAndUpdate(); err != nil {
				log.Printf("[CronJob] Lỗi cào dữ liệu Thứ Năm: %v", err)
			}
		})
		if err != nil {
			log.Printf("[CronJob] Lỗi đăng ký Thursday Cron (%s): %v", c.cfg.ThursdayCronSchedule, err)
		} else {
			log.Printf("[CronJob] ✓ Đã kích hoạt CronJob kỳ điều hành Thứ Năm: '%s'", c.cfg.ThursdayCronSchedule)
		}
	}

	// 3. Đồng bộ đều đặn theo chu kỳ (CRAWLER_INTERVAL_MINUTES), bắt cả kỳ điều chỉnh bất thường
	if c.cfg.CrawlerIntervalMinutes > 0 {
		spec := fmt.Sprintf("@every %dm", c.cfg.CrawlerIntervalMinutes)
		if _, err := cronScheduler.AddFunc(spec, func() { _ = c.CrawlAndUpdate() }); err != nil {
			log.Printf("[CronJob] Lỗi đăng ký đồng bộ định kỳ (%s): %v", spec, err)
		} else {
			log.Printf("[CronJob] ✓ Đã kích hoạt đồng bộ định kỳ: '%s'", spec)
		}
	}

	cronScheduler.Start()
	defer cronScheduler.Stop()

	// 4. Đồng bộ ngay 1 lần khi server vừa boot (nếu bật)
	if c.cfg.CrawlOnStartup {
		go func() {
			time.Sleep(2 * time.Second)
			log.Println("[Crawler] Khởi động lần đầu: Đang chạy kiểm tra giá...")
			_ = c.CrawlAndUpdate()
		}()
	}

	// Chờ context hủy khi shutdown server
	<-ctx.Done()
	log.Println("[Crawler] Đã dừng toàn bộ CronJob cào dữ liệu an toàn")
}

// CrawlAndUpdate đồng bộ giá từ feed JSON (gas-price-latest.json).
//
// Feed do GitHub Action scripts/gas-updater dựng từ thông cáo báo chí Petrolimex (OCR bảng giá,
// kiểm tra chéo), nên backend và Mini App dùng chung một nguồn số liệu. Backend chỉ nhận feed
// khi nó hợp lệ và không cũ hơn dữ liệu đang có.
func (c *GasCrawler) CrawlAndUpdate() error {
	feed, err := c.fetchFeed()
	if err != nil {
		log.Printf("[Crawler] Không tải được feed giá %s: %v", c.cfg.GasFeedURL, err)
		return err
	}
	if err := validateFeed(feed); err != nil {
		log.Printf("[Crawler] Feed giá không hợp lệ, giữ nguyên dữ liệu hiện hành: %v", err)
		return err
	}

	current := c.gasService.GetPrices()
	feedDate, _ := parseVNDate(feed.UpdateInfo.EffectiveDate)
	if curDate, err := parseVNDate(current.UpdateInfo.EffectiveDate); err == nil && feedDate.Before(curDate) {
		log.Printf("[Crawler] Feed đang ở kỳ %s, cũ hơn kỳ %s hiện có. Bỏ qua.", feed.UpdateInfo.EffectiveDate, current.UpdateInfo.EffectiveDate)
		return nil
	}
	if sameData(current, *feed) {
		log.Printf("[Crawler] Giá kỳ %s đã là mới nhất.", feed.UpdateInfo.EffectiveDate)
		return nil
	}

	if err := c.gasService.UpdatePrices(*feed); err != nil {
		return err
	}
	log.Printf("[Crawler] ✓ Đã đồng bộ giá kỳ %s (%d mặt hàng, %d kỳ lịch sử)", feed.UpdateInfo.EffectiveDate, len(feed.Products), len(feed.History))
	return nil
}

func (c *GasCrawler) fetchFeed() (*models.GasPriceData, error) {
	ctx, cancel := context.WithTimeout(context.Background(), c.httpClient.Timeout)
	defer cancel()
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, c.cfg.GasFeedURL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Cache-Control", "no-cache")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("HTTP %d", resp.StatusCode)
	}

	var feed models.GasPriceData
	if err := json.NewDecoder(io.LimitReader(resp.Body, 2<<20)).Decode(&feed); err != nil {
		return nil, fmt.Errorf("JSON lỗi: %w", err)
	}
	return &feed, nil
}

// validateFeed chặn feed hỏng: thiếu mặt hàng, giá ngoài khoảng, ngày sai định dạng
func validateFeed(feed *models.GasPriceData) error {
	if _, err := parseVNDate(feed.UpdateInfo.EffectiveDate); err != nil {
		return fmt.Errorf("effectiveDate %q sai định dạng DD/MM/YYYY", feed.UpdateInfo.EffectiveDate)
	}
	if len(feed.Products) < 5 {
		return fmt.Errorf("chỉ có %d mặt hàng", len(feed.Products))
	}
	for _, p := range feed.Products {
		if p.ID == "" {
			return fmt.Errorf("có mặt hàng thiếu id")
		}
		for _, v := range []int{p.PriceZone1, p.PriceZone2} {
			if v < 10000 || v > 60000 {
				return fmt.Errorf("%s: giá %d ngoài khoảng hợp lệ", p.ID, v)
			}
		}
		if p.PriceZone2 < p.PriceZone1 {
			return fmt.Errorf("%s: giá Vùng 2 thấp hơn Vùng 1", p.ID)
		}
	}
	return nil
}

func sameData(a, b models.GasPriceData) bool {
	if a.UpdateInfo.EffectiveDate != b.UpdateInfo.EffectiveDate || len(a.Products) != len(b.Products) || len(a.History) != len(b.History) {
		return false
	}
	for i := range a.Products {
		pa, pb := a.Products[i], b.Products[i]
		if pa.ID != pb.ID || pa.Name != pb.Name || pa.PriceZone1 != pb.PriceZone1 || pa.PriceZone2 != pb.PriceZone2 || pa.Diff != pb.Diff {
			return false
		}
	}
	for i := range a.History {
		if a.History[i] != b.History[i] {
			return false
		}
	}
	return true
}

func parseVNDate(s string) (time.Time, error) {
	return time.Parse("02/01/2006", s)
}
