# ==============================================================================
# Script Triển Khai Nhanh GoLang Backend Lên Homelab (PowerShell)
# Domain: đặt qua biến DOMAIN trong backend-go/.env
# ==============================================================================

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  WRENAPP GOLANG BACKEND - HOMELAB DEPLOYMENT SCRIPT  " -ForegroundColor Cyan
Write-Host "  Domain: theo biến DOMAIN (Port 8088)                " -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Kiểm tra Docker
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "[Lỗi] Docker chưa được cài đặt hoặc chưa bật Docker Desktop!" -ForegroundColor Red
    exit 1
}

# 2. Tạo thư mục persistent data
if (-not (Test-Path "data")) {
    New-Item -ItemType Directory -Path "data" | Out-Null
}
Write-Host "[1/3] Đã khởi tạo thư mục lưu trữ persistent: ./data" -ForegroundColor Green

# 3. Build & Khởi động Docker Compose
Write-Host "[2/3] Đang build Docker Image và khởi động dịch vụ..." -ForegroundColor Yellow
docker compose up -d --build

# 4. Kiểm tra sức khỏe dịch vụ
Write-Host "[3/3] Đang kiểm tra trạng thái hoạt động..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "======================================================" -ForegroundColor Green
Write-Host "  ✓ TRIỂN KHAI THÀNH CÔNG LÊN HOMELAB!                 " -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Green
Write-Host "• Container:  zaloapp-backend" -ForegroundColor Cyan
Write-Host "• Local URL:  http://localhost:8088/health" -ForegroundColor Cyan
Write-Host "• Public API: https://<DOMAIN>/api/gas/prices" -ForegroundColor Cyan
Write-Host "• Cronjob:    Mỗi ngày lúc 06:00 sáng & Thứ Năm 15:05" -ForegroundColor Yellow
Write-Host ""
Write-Host "Các lệnh quản trị hữu ích:" -ForegroundColor Cyan
Write-Host "  Xem logs trực tiếp:         docker compose logs -f" -ForegroundColor Yellow
Write-Host "  Kích hoạt cào ngay lập tức:   docker compose exec zaloapp-backend /app/zaloapp-server -crawl-now" -ForegroundColor Yellow
Write-Host "  Hoặc cào qua API:           curl -X POST http://localhost:8088/api/gas/refresh" -ForegroundColor Yellow
Write-Host "  Dừng dịch vụ:               docker compose down" -ForegroundColor Yellow
Write-Host "======================================================" -ForegroundColor Green
