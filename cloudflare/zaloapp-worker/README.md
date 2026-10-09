# zaloapp-worker

Cloudflare Worker `wrenapp-zaloapp`, chạy trên một Custom Domain riêng.

Domain thật không nằm trong repo: `wrangler.toml` là bản mẫu, cấu hình thật ở `wrangler.local.toml` (đã có trong `.gitignore`). Máy mới thì chép `wrangler.toml` thành `wrangler.local.toml` rồi sửa `pattern`.

Trả giá xăng dầu cho Mini App từ `gas-price-latest.json` trên GitHub, cache ở edge 5 phút. Không tải được feed (hoặc feed sai) thì trả bản feed đóng gói lúc deploy; khi đó `serverInfo.status` là `fallback`.

| Endpoint | |
| --- | --- |
| `GET /api/gas/prices` | Giá hiện hành, cùng định dạng backend Go |
| `GET /api/gas/history` | Lịch sử các kỳ |
| `POST /api/gas/refresh` | Bỏ cache, tải lại feed ngay. Cần header `Authorization: Bearer <REFRESH_SECRET>` |
| `GET /health` | |

Deploy lại (cập nhật code hoặc bản feed đóng gói):

```bash
cd cloudflare/zaloapp-worker
npx wrangler deploy -c wrangler.local.toml
```

`/api/gas/refresh` được khoá bằng Worker secret `REFRESH_SECRET` (đặt bằng `npx wrangler secret put REFRESH_SECRET -c wrangler.local.toml`). Chưa đặt khoá thì endpoint từ chối mọi request.

Để Worker nhận giá ngay khi GitHub Action cập nhật feed, đặt biến repo `BACKEND_REFRESH_URL` = `https://<domain>/api/gas/refresh` và secret repo `BACKEND_REFRESH_SECRET` = giá trị của `REFRESH_SECRET`.
