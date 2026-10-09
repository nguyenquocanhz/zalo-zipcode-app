package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"zaloapp-backend/internal/crawler"
	"zaloapp-backend/internal/service"
)

// GasHandlers chứa các HTTP handler cho nghiệp vụ xăng dầu
type GasHandlers struct {
	gasService *service.GasService
	crawler    *crawler.GasCrawler
}

// NewGasHandlers khởi tạo GasHandlers
func NewGasHandlers(gasService *service.GasService, crawler *crawler.GasCrawler) *GasHandlers {
	return &GasHandlers{
		gasService: gasService,
		crawler:    crawler,
	}
}

// GetPrices xử lý GET /api/gas/prices
func (h *GasHandlers) GetPrices(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	data := h.gasService.GetPrices()

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	_ = json.NewEncoder(w).Encode(data)
}

// RefreshPrices xử lý POST /api/gas/refresh hoặc GET /api/gas/refresh
func (h *GasHandlers) RefreshPrices(w http.ResponseWriter, r *http.Request) {
	// Đồng bộ ngay từ feed giá (gas-price-latest.json)
	_ = h.crawler.CrawlAndUpdate()

	data := h.gasService.GetPrices()

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Đã làm mới dữ liệu giá xăng dầu thành công",
		"data":    data,
	})
}

// GetHistory xử lý GET /api/gas/history
func (h *GasHandlers) GetHistory(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	history := h.gasService.GetHistory()

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"total":   len(history),
		"history": history,
	})
}

// SearchStations xử lý GET /api/gas/stations
func (h *GasHandlers) SearchStations(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	q := r.URL.Query()
	lat, _ := strconv.ParseFloat(q.Get("lat"), 64)
	lng, _ := strconv.ParseFloat(q.Get("lng"), 64)
	radius, _ := strconv.ParseFloat(q.Get("radius"), 64)
	brand := q.Get("brand")
	ron97Only := q.Get("ron97") == "true" || q.Get("ron97") == "1"
	emergency := q.Get("emergency") == "true" || q.Get("emergency") == "1"

	// Mặc định bán kính 5000m nếu có GPS mà không chỉ định bán kính
	if lat != 0 && lng != 0 && radius <= 0 {
		radius = 5000
	}

	res := h.gasService.SearchStations(lat, lng, radius, brand, ron97Only, emergency)

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	_ = json.NewEncoder(w).Encode(res)
}
