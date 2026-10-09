package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"zaloapp-backend/internal/config"
	"zaloapp-backend/internal/crawler"
	"zaloapp-backend/internal/handlers"
	"zaloapp-backend/internal/middleware"
	"zaloapp-backend/internal/service"
)

func main() {
	crawlNowFlag := flag.Bool("crawl-now", false, "Chạy cào dữ liệu ngay lập tức rồi thoát (One-off cron job)")
	flag.Parse()

	log.Println("==================================================")
	log.Println("  WRENAPP GOLANG BACKEND - HOMELAB MICROSERVICE   ")
	log.Println("  Domain: zaloapp.vietcode.io.vn                  ")
	log.Println("==================================================")

	// 1. Tải cấu hình
	cfg := config.LoadConfig()
	log.Printf("[Config] Port: %s | Domain: %s | Node: %s | Data: %s", cfg.Port, cfg.Domain, cfg.NodeID, cfg.DataDir)
	log.Printf("[Config] Cron hàng ngày: '%s' | Cron Thứ Năm: '%s' | Múi giờ: %s", cfg.DailyCronSchedule, cfg.ThursdayCronSchedule, cfg.Timezone)

	// 2. Khởi tạo Service
	gasService, err := service.NewGasService(cfg)
	if err != nil {
		log.Fatalf("[Fatal] Không thể khởi động GasService: %v", err)
	}

	zipService := service.NewZipCodeService()

	// 3. Khởi tạo Crawler
	gasCrawler := crawler.NewGasCrawler(cfg, gasService)

	// Nếu chạy flag -crawl-now: Cào xong thoát ngay (phục vụ cron thủ công hoặc docker run --rm)
	if *crawlNowFlag {
		log.Println("[CLI] Đang thực thi cào dữ liệu ngay theo lệnh...")
		if err := gasCrawler.CrawlAndUpdate(); err != nil {
			log.Fatalf("[CLI] Lỗi cào dữ liệu: %v", err)
		}
		log.Println("[CLI] ✓ Hoàn tất cào dữ liệu thành công!")
		return
	}

	// Chạy background cron worker
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	go gasCrawler.StartBackgroundWorker(ctx)

	// 4. Khởi tạo Handlers
	gasH := handlers.NewGasHandlers(gasService, gasCrawler)
	zipH := handlers.NewZipCodeHandlers(zipService)
	healthH := handlers.NewHealthHandler(cfg)

	// 5. Cấu hình Mux & Routes
	mux := http.NewServeMux()

	// Health Check
	mux.HandleFunc("/health", healthH.Check)
	mux.HandleFunc("/api/health", healthH.Check)

	// Gas APIs
	mux.HandleFunc("/api/gas/prices", gasH.GetPrices)
	mux.HandleFunc("/api/gas/refresh", gasH.RefreshPrices)
	mux.HandleFunc("/api/gas/history", gasH.GetHistory)
	mux.HandleFunc("/api/gas/stations", gasH.SearchStations)

	// ZIP Code APIs
	mux.HandleFunc("/api/zipcode/provinces", zipH.GetProvinces)
	mux.HandleFunc("/api/zipcode/search", zipH.Search)

	// Welcome index
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		fmt.Fprintf(w, `{"service":"zaloapp-backend","domain":"%s","status":"running","docs":{"prices":"/api/gas/prices","stations":"/api/gas/stations","health":"/api/health"}}`, cfg.Domain)
	})

	// Áp dụng Middleware chuỗi: CORS -> Logger -> Mux
	handler := middleware.Logger(middleware.CORS(mux))

	server := &http.Server{
		Addr:         ":" + cfg.Port,
		Handler:      handler,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Chạy HTTP Server trong goroutine
	go func() {
		log.Printf("[Server] Đang lắng nghe tại http://0.0.0.0:%s ...", cfg.Port)
		log.Printf("[Server] Điểm cuối công khai: https://%s/api/gas/prices", cfg.Domain)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("[Server] Lỗi khi chạy: %v", err)
		}
	}()

	// Chờ tín hiệu dừng từ hệ điều hành (Graceful Shutdown)
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit

	log.Println("[Server] Đang tiến hành dừng server an toàn (Graceful Shutdown)...")
	cancel()

	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer shutdownCancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Printf("[Server] Lỗi khi dừng: %v", err)
	}

	log.Println("[Server] Đã dừng server thành công!")
}
