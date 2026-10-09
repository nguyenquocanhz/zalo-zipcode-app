#!/usr/bin/env bash
# ==============================================================================
# Script Triển Khai Nhanh GoLang Backend Lên Homelab (Docker Compose)
# Domain: đặt qua biến DOMAIN trong backend-go/.env
# ==============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}  WRENAPP GOLANG BACKEND - HOMELAB DEPLOYMENT SCRIPT  ${NC}"
echo -e "${BLUE}  Domain: theo biến DOMAIN (Port 8088)                ${NC}"
echo -e "${BLUE}======================================================${NC}\n"

# 1. Kiểm tra Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}[Lỗi] Docker chưa được cài đặt trên hệ thống này!${NC}"
    exit 1
fi

# 2. Tạo thư mục data lưu trữ lâu dài
mkdir -p data
echo -e "${GREEN}[1/3] Đã khởi tạo thư mục lưu trữ persistent: ./data${NC}"

# 3. Build & Khởi động Docker Compose
echo -e "${YELLOW}[2/3] Đang build Docker Image và khởi động dịch vụ...${NC}"
docker compose up -d --build

# 4. Kiểm tra sức khỏe dịch vụ (Health Check)
echo -e "${YELLOW}[3/3] Đang kiểm tra trạng thái hoạt động...${NC}"
sleep 3

HEALTH_STATUS=$(docker inspect --format='{{.State.Health.Status}}' zaloapp-backend 2>/dev/null || echo "running")

echo -e "\n${GREEN}======================================================${NC}"
echo -e "${GREEN}  ✓ TRIỂN KHAI THÀNH CÔNG LÊN HOMELAB!                 ${NC}"
echo -e "${GREEN}======================================================${NC}"
echo -e "• Container: ${BLUE}zaloapp-backend${NC} (Status: ${GREEN}${HEALTH_STATUS}${NC})"
echo -e "• Local URL: ${BLUE}http://localhost:8088/health${NC}"
echo -e "• Public API: ${BLUE}https://<DOMAIN>/api/gas/prices${NC}"
echo -e "• Lịch Cronjob cào tự động: ${YELLOW}Mỗi ngày lúc 06:00 sáng${NC} + ${YELLOW}Thứ Năm 15:05${NC}"
echo -e "\n${BLUE}Các lệnh quản trị hữu ích:${NC}"
echo -e "  Xem logs trực tiếp:       ${YELLOW}docker compose logs -f${NC}"
echo -e "  Kích hoạt cào ngay lập tức: ${YELLOW}docker compose exec zaloapp-backend /app/zaloapp-server -crawl-now${NC}"
echo -e "  Hoặc cào qua API:         ${YELLOW}curl -X POST http://localhost:8088/api/gas/refresh${NC}"
echo -e "  Dừng dịch vụ:             ${YELLOW}docker compose down${NC}"
echo -e "======================================================\n"
