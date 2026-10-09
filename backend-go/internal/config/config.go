package config

import (
	"os"
	"strconv"
)

// Config chứa toàn bộ cấu hình hệ thống Go backend
type Config struct {
	Port                   string
	Domain                 string
	DataDir                string
	NodeID                 string
	CrawlerIntervalMinutes int
	DailyCronSchedule      string
	ThursdayCronSchedule   string
	Timezone               string
	CrawlOnStartup         bool
	AllowedOrigins         string
	GasFeedURL             string
}

// LoadConfig đọc cấu hình từ biến môi trường hoặc fallback mặc định
func LoadConfig() *Config {
	port := getEnv("PORT", "8088")
	domain := getEnv("DOMAIN", "zaloapp.vietcode.io.vn")
	dataDir := getEnv("DATA_DIR", "./data")
	nodeID := getEnv("NODE_ID", "homelab-node-01")
	allowedOrigins := getEnv("ALLOWED_ORIGINS", "*")
	dailyCron := getEnv("DAILY_CRON_SCHEDULE", "0 8 * * *")              // 08:00 mỗi ngày, sau lượt quét 07:30 của GitHub Action
	thursdayCron := getEnv("THURSDAY_CRON_SCHEDULE", "*/10 15-18 * * 4") // 10 phút một lần, 15:00–18:59 chiều Thứ Năm
	// Feed giá do GitHub Action (scripts/gas-updater) cập nhật từ thông cáo Petrolimex
	gasFeedURL := getEnv("GAS_FEED_URL", "https://raw.githubusercontent.com/nguyenquocanhz/zalo-zipcode-app/main/gas-price-latest.json")
	timezone := getEnv("TZ", "Asia/Ho_Chi_Minh")
	crawlOnStartup := getEnv("CRAWL_ON_STARTUP", "true") == "true"

	crawlerInterval, err := strconv.Atoi(getEnv("CRAWLER_INTERVAL_MINUTES", "60"))
	if err != nil || crawlerInterval <= 0 {
		crawlerInterval = 60
	}

	return &Config{
		Port:                   port,
		Domain:                 domain,
		DataDir:                dataDir,
		NodeID:                 nodeID,
		CrawlerIntervalMinutes: crawlerInterval,
		DailyCronSchedule:      dailyCron,
		ThursdayCronSchedule:   thursdayCron,
		Timezone:               timezone,
		CrawlOnStartup:         crawlOnStartup,
		AllowedOrigins:         allowedOrigins,
		GasFeedURL:             gasFeedURL,
	}
}

func getEnv(key, defaultVal string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return defaultVal
}
