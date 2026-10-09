.PHONY: up down build logs crawl test clean

# Khởi động dịch vụ trên Homelab
up:
	docker compose up -d --build

# Dừng dịch vụ
down:
	docker compose down

# Xem logs trực tiếp
logs:
	docker compose logs -f zaloapp-backend

# Chạy cào dữ liệu ngay lập tức (Trigger manual crawl)
crawl:
	docker compose exec zaloapp-backend /app/zaloapp-server -crawl-now

# Chạy test Go nội bộ
test:
	go test -v ./...

# Chạy với profile Caddy tự động cấp SSL HTTPS
up-ssl:
	docker compose --profile with-ssl up -d --build
