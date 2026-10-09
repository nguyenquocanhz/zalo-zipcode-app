# zaloapp-worker

Cloudflare Worker `wrenapp-zaloapp`, chạy trên domain `https://zaloapp.vietcode.io.vn` (Custom Domain, zone `vietcode.io.vn`).

Trả giá xăng dầu cho Mini App từ `gas-price-latest.json` trên GitHub, cache ở edge 5 phút. Không tải được feed (hoặc feed sai) thì trả bản feed đóng gói lúc deploy; khi đó `serverInfo.status` là `fallback`.

| Endpoint | |
| --- | --- |
| `GET /api/gas/prices` | Giá hiện hành, cùng định dạng backend Go |
| `GET /api/gas/history` | Lịch sử các kỳ |
| `POST /api/gas/refresh` | Bỏ cache, tải lại feed ngay |
| `GET /health` | |

Deploy lại (cập nhật code hoặc bản feed đóng gói):

```bash
cd cloudflare/zaloapp-worker
npx wrangler deploy
```

Để Worker nhận giá ngay khi GitHub Action cập nhật feed, đặt biến repo `BACKEND_REFRESH_URL` = `https://zaloapp.vietcode.io.vn/api/gas/refresh`.
