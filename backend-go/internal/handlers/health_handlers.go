package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"zaloapp-backend/internal/config"
)

var startTime = time.Now()

// HealthHandler xử lý /health và /api/health
type HealthHandler struct {
	cfg *config.Config
}

// NewHealthHandler khởi tạo HealthHandler
func NewHealthHandler(cfg *config.Config) *HealthHandler {
	return &HealthHandler{cfg: cfg}
}

// Check xử lý kiểm tra tình trạng server
func (h *HealthHandler) Check(w http.ResponseWriter, r *http.Request) {
	uptime := time.Since(startTime).Round(time.Second)

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"status":    "healthy",
		"service":   "zaloapp-backend",
		"nodeId":    h.cfg.NodeID,
		"domain":    h.cfg.Domain,
		"uptime":    uptime.String(),
		"timestamp": time.Now().Format(time.RFC3339),
		"homelab":   true,
	})
}
