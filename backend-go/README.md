# WrenApp GoLang Backend - Microservice for Homelab & Zalo Mini App

Go microservice phục vụ API động cho Zalo Mini App **WrenApp** (Tra cứu mã bưu chính & Giá xăng dầu Việt Nam).

- **Domain sản xuất:** `https://zaloapp.vietcode.io.vn`
- **Cổng nội bộ:** `8088`
- **Công nghệ:** Go 1.23+, `robfig/cron/v3` (Daily Cron & Thursday Flash Cron), Docker multi-stage build (< 15MB)

---

## 1. Tự Động Cập Nhật Giá Xăng Dầu

Luồng dữ liệu dùng chung cho cả backend và Mini App:

```
Thông cáo báo chí Petrolimex (ảnh bảng giá)
  └─ GitHub Action "Auto Update Petroleum Prices" (scripts/gas-updater: OCR + kiểm tra chéo)
       └─ gas-price-latest.json trong repo
            ├─ Backend Go đồng bộ theo lịch dưới đây (GAS_FEED_URL)
            └─ Mini App đọc qua jsDelivr / GitHub khi backend không phản hồi
```

Backend chỉ nhận feed khi hợp lệ (đủ mặt hàng, giá trong khoảng, Vùng 2 ≥ Vùng 1) và không cũ hơn dữ liệu đang có. Lịch đồng bộ (`robfig/cron/v3`, múi giờ `Asia/Ho_Chi_Minh`):

| Tên | Biểu thức | Lịch | Mục đích |
| :--- | :--- | :--- | :--- |
| **Thursday Flash** | `*/10 15-18 * * 4` | 10 phút một lần, 15:00–18:59 Thứ Năm | Nhận giá kỳ mới ngay sau khi Action cập nhật feed |
| **Daily Cron** | `0 8 * * *` | 08:00 mỗi ngày | Sau lượt quét dự phòng 07:30 của Action |
| **Interval** | `@every 60m` | Mỗi `CRAWLER_INTERVAL_MINUTES` phút | Bắt kỳ điều chỉnh bất thường |
| **Startup Sync** | Khởi động container | Sau 2s khi boot | Server vừa bật là có dữ liệu mới nhất |

> Lịch và `GAS_FEED_URL` tùy biến qua biến môi trường trong `docker-compose.yml`. Domain `zaloapp.vietcode.io.vn` hiện trỏ về Cloudflare Worker (`cloudflare/zaloapp-worker`), không phải backend Go.

---

## 2. Triển Khai Nhanh Trên Homelab (1 Click duy nhất)

### Cách 1: Dùng script tiện ích (Khuyên dùng)
* **Trên Linux / macOS / Homelab Bash:**
  ```bash
  cd backend-go
  chmod +x deploy.sh
  ./deploy.sh
  ```
* **Trên Windows PowerShell:**
  ```powershell
  cd backend-go
  .\deploy.ps1
  ```
* **Hoặc dùng Make:**
  ```bash
  make up
  ```

### Cách 2: Dùng lệnh Docker Compose trực tiếp
```bash
cd backend-go
docker compose up -d --build
```

Kiểm tra trạng thái container và logs:
```bash
docker compose logs -f
```

---

## 3. Các Lệnh Quản Trị Hữu Ích

### Đồng bộ giá ngay lập tức:
* **Cách A - Qua Docker Exec (Chế độ One-off):**
  ```bash
  docker compose exec zaloapp-backend /app/zaloapp-server -crawl-now
  ```
* **Cách B - Qua HTTP API Endpoint:**
  ```bash
  curl -X POST http://localhost:8088/api/gas/refresh
  ```

### Xem logs cronjob:
```bash
docker compose logs -f zaloapp-backend | grep -E "CronJob|Crawler"
```

---

## 4. Danh Sách API Endpoints

| Method | Đường dẫn API | Mô tả nghiệp vụ |
| :--- | :--- | :--- |
| `GET` | `/health` hoặc `/api/health` | Kiểm tra tình trạng server, Uptime, Node ID |
| `GET` | `/api/gas/prices` | Bảng giá xăng dầu chính thức (E10 RON 95-V, E10 RON 95-III, E5, DO...) |
| `POST` / `GET` | `/api/gas/refresh` | Kích hoạt cào mới và làm mới bộ nhớ đệm |
| `GET` | `/api/gas/stations` | Tìm kiếm cây xăng theo tọa độ GPS, bán kính, thương hiệu |
| `GET` | `/api/gas/history` | Lịch sử điều hành giá các kỳ |
| `GET` | `/api/zipcode/search?q=...` | Tra cứu mã bưu chính 63 tỉnh thành |

---

## 5. Cấu Hình Tên Miền `zaloapp.vietcode.io.vn`

### Phương án A: Tự động cấp SSL với Caddy Profile
```bash
docker compose --profile with-ssl up -d
```
File `Caddyfile` đã cấu hình sẵn tự động xin chứng chỉ Let's Encrypt SSL cho `zaloapp.vietcode.io.vn`.

### Phương án B: Cloudflare Tunnel (Khuyên dùng cho Homelab không mở port)
```bash
cloudflared tunnel route dns <tunnel-name> zaloapp.vietcode.io.vn
```
Trỏ service trong config tunnel về: `http://localhost:8088`.
