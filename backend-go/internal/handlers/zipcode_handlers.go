package handlers

import (
	"encoding/json"
	"net/http"

	"zaloapp-backend/internal/service"
)

// ZipCodeHandlers xử lý HTTP tra cứu mã bưu chính
type ZipCodeHandlers struct {
	zipService *service.ZipCodeService
}

// NewZipCodeHandlers khởi tạo ZipCodeHandlers
func NewZipCodeHandlers(zipService *service.ZipCodeService) *ZipCodeHandlers {
	return &ZipCodeHandlers{
		zipService: zipService,
	}
}

// GetProvinces xử lý GET /api/zipcode/provinces
func (h *ZipCodeHandlers) GetProvinces(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	provinces := h.zipService.GetProvinces()

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"total":     len(provinces),
		"provinces": provinces,
	})
}

// Search xử lý GET /api/zipcode/search?q=...
func (h *ZipCodeHandlers) Search(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	query := r.URL.Query().Get("q")
	results := h.zipService.Search(query)

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"query":   query,
		"total":   len(results),
		"results": results,
	})
}
