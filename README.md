# WrenApp - Tra cứu Mã Bưu Chính (Zalo Mini App)

[![Zalo Mini App](https://img.shields.io/badge/Platform-Zalo%20Mini%20App-0068FF?logo=zalo)](https://miniapp.zalo.me)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Bundler-Vite%204.5-646C99?logo=vite)](https://vitejs.dev/)
[![ZMP SDK](https://img.shields.io/badge/ZMP%20SDK-2.41.0-blue)](https://mini.zalo.me/docs/sdk)
[![Audit Status](https://img.shields.io/badge/ZMP%20Audit-100%25%20PASS-brightgreen)](zmp-audit.md)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **WrenApp - Tra cứu mã bưu chính** là ứng dụng Zalo Mini App chuyên dụng tra cứu mã bưu chính (ZIP/Postal Code) chính xác, nhanh chóng cho toàn bộ **63 Tỉnh/Thành phố Việt Nam** và hơn **60 Quốc gia trên thế giới**. 
> 
> Dự án được tích hợp sẵn bộ kiểm thử kiểm duyệt tự động **`zmp-audit`**, ma trận đánh giá **4-Gate Pivot Test** chuẩn theo thông số kỹ thuật **`zmp-mcp`**, và bộ tài liệu hướng dẫn phát hành thần tốc (Fast-track MVP Release) theo triết lý *Divide & Conquer*.

---

## 📑 Mục Lục
1. [Tính Năng Nổi Bật](#-tính-năng-nổi-bật)
2. [Nguồn Dữ Liệu (Data Sources)](#-nguồn-dữ-liệu-data-sources)
3. [Kiến Trúc & Cấu Trúc Dự Án](#-kiến-trúc--cấu-trúc-dự-án)
4. [Bộ Công Cụ Kiểm Duyệt zmp-audit & 4-Gate Pivot Test](#-bộ-công-cụ-kiểm-duyệt-zmp-audit--4-gate-pivot-test)
5. [Quy Chuẩn Đóng Gói zmp-mcp & Webhook Server](#-quy-chuẩn-đóng-gói-zmp-mcp--webhook-server)
6. [Tài Liệu Nghiên Cứu & Transcript Matt Pocock](#-tài-liệu-nghiên-cứu--transcript-matt-pocock)
7. [Cài Đặt & Chạy Thử](#-cài-đặt--chạy-thử)
8. [Quy Trình Triển Khai (Deploy)](#-quy-trình-triển-khai-deploy)
9. [Biến Môi Trường (.env)](#-biến-môi-trường-env)

---

## 🚀 Tính Năng Nổi Bật

### 🇻🇳 1. Tra cứu Việt Nam (Nội địa)
- **Độ phủ toàn diện**: Hỗ trợ đầy đủ **63 Tỉnh/Thành phố** trên toàn lãnh thổ Việt Nam.
- **Phân cấp chi tiết**: Tra cứu theo 3 cấp hành chính: **Tỉnh/Thành phố ➔ Quận/Huyện/Thị xã ➔ Phường/Xã/Thị trấn**.
- **Song chuẩn mã bưu chính**:
  - **Mã mới (5 chữ số)**: Theo quy chuẩn phân bổ mã bưu chính quốc gia của Bộ Thông tin & Truyền thông.
  - **Mã cũ (6 chữ số)**: Chuẩn bưu chính quốc tế thường dùng khi mua sắm, nhận bưu phẩm quốc tế (Amazon, eBay, AliExpress, Google AdSense...).
- **Cập nhật sáp nhập**: Ghi chú rõ ràng lịch sử sắp xếp, sáp nhập địa giới hành chính (theo Quyết định 2334/QĐ-BKHCN).
- **Bộ lọc tức thì**: Tìm kiếm gõ đâu ra đó theo tên tiếng Việt có dấu, không dấu hoặc theo đầu mã số.

### 🌐 2. Tra cứu Quốc Tế (60 Quốc gia)
- **Hỗ trợ 60 quốc gia tiêu biểu**: Phủ khắp Bắc Mỹ, Châu Âu, Châu Á - Thái Bình Dương (Mỹ, Nhật Bản, Hàn Quốc, Đài Loan, Đức, Pháp, Anh, Canada, Úc, Singapore, Thái Lan...).
- **Tra cứu thời gian thực**: Kết nối cơ sở dữ liệu địa lý toàn cầu Zippopotam / Geonames.
- **Thông tin chi tiết**: Trả về Tên địa danh (Place Name), Bang/Tiểu bang (State/Province), Mã viết tắt (State Abbreviation), Kinh độ (Longitude) và Vĩ độ (Latitude).

### 🎨 3. Giao Diện & Trải Nghiệm (UI/UX)
- Giao diện chuẩn **Zalo UI Components (ZAUI)** tối ưu hiển thị mượt mà trên di động (Android & iOS).
- Hỗ trợ chế độ nền tối (**Dark Mode**) với quy tắc CSS tùy biến chuyên sâu cho dropdown và form control.
- Chế độ **Khách vãng lai (Guest Mode)**: Người dùng tra cứu ngay lập tức, không bắt buộc đăng nhập hay cấp quyền số điện thoại.

---

## 📊 Nguồn Dữ Liệu (Data Sources)

| Phạm vi | Tập tin mã nguồn | Số lượng thực thể | Mô tả chuẩn dữ liệu |
| :--- | :--- | :--- | :--- |
| **Việt Nam** | [`src/utils/vn-zipcodes.js`](src/utils/vn-zipcodes.js) | 63 Tỉnh/Thành, 700+ Quận/Huyện | Chuẩn hóa theo QĐ 2334/QĐ-BKHCN & Cổng thông tin Bưu chính Quốc gia Việt Nam. Cung cấp cả mã 5 số và 6 số. |
| **Quốc Tế** | [`src/utils/countries.js`](src/utils/countries.js) | 60 Quốc gia | Danh mục quốc gia ISO-3166-1 alpha-2, regex định dạng ZIP code từng nước, placeholder mẫu. |
| **API Lookup** | `https://api.zippopotam.us/{country}/{zip}` | Toàn cầu | REST API phân giải mã bưu chính quốc tế sang tọa độ & địa danh chi tiết. |

---

## 📂 Kiến Trúc & Cấu Trúc Dự Án

```bash
zalo-zipcode-app/
├── .gemini/                           # Cấu hình AI Assistant & Fast-track Skill
│   └── skills/zmp-audit-fasttrack/    # Skill Antigravity kiểm duyệt & đóng gói tự động
│       ├── SKILL.md
│       └── references/
│           ├── censorship-rubric.md   # Ma trận 9 trụ cột kiểm duyệt Zalo
│           ├── mvp-release-shortcuts.md # Lối tắt phát hành MVP thần tốc
│           └── zmp-mcp-playbook.md    # Cẩm nang tích hợp zmp-mcp
├── src/
│   ├── css/
│   │   └── app.scss                   # Stylesheet SCSS + Dark Mode override
│   ├── pages/
│   │   └── index/
│   │       └── index.jsx              # Giao diện chính (2 Tab VN & Quốc Tế)
│   ├── utils/
│   │   ├── countries.js               # Data 60 quốc gia quốc tế
│   │   └── vn-zipcodes.js             # Data 63 tỉnh thành Việt Nam
│   └── app.jsx                        # Entry point & App Provider
├── app-config.json                    # Cấu hình Zalo Mini App (Header, Pages, Assets)
├── app.json                           # Alias đồng bộ cho app-config
├── index.html                         # HTML template chuẩn ZMP
├── package.json                       # Scripts và dependencies
├── run_deploy.js                      # Script tự động Vite build -> Sync hash -> Deploy
├── test_zcode_pivot.js                # Bộ test ma trận 4-Gate Pivot Matrix
├── transcript_UNzCG3lw6O0.md          # Transcript tiếng Anh (Talk Matt Pocock)
├── transcript_UNzCG3lw6O0_vi.md       # Bản dịch tiếng Việt (Talk Matt Pocock)
├── vite.config.js                     # Cấu hình đóng gói Vite (outDir: www)
├── webhook-server.js                  # Webhook Server chuẩn Nghị định 13 & SHA-256
├── zmp-audit-rules.json               # Bộ quy tắc kiểm duyệt máy đọc (JSON Schema)
├── zmp-audit.js                       # CLI kiểm toán tĩnh kiểm duyệt Zalo
├── zmp-audit.md                       # Cẩm nang quy tắc kiểm duyệt chi tiết
└── zmp.json                           # Metadata dự án ZMP
```

---

## 🛡️ Bộ Công Cụ Kiểm Duyệt zmp-audit & 4-Gate Pivot Test

Nhằm giải quyết triệt để vấn đề từ chối kiểm duyệt (rejection) từ Zalo Review Team (như vi phạm đặt tên, xin quyền tràn lan, thiếu định danh chủ thể), dự án tích hợp 2 công cụ kiểm toán độc lập:

### 1. `zmp-audit.js` — Kiểm Toán 9 Trụ Cột Kiểm Duyệt
Chạy lệnh:
```bash
npm run audit
```
Kiểm tra tĩnh cấu hình và mã nguồn:
- **Tên ứng dụng**: Không viết hoa toàn bộ (`ALL_CAPS`), không chứa từ cấm (`Zalo`, `Mini App`), không icon/emoji, bắt buộc có định danh chủ thể (`WrenApp - ...`).
- **Quyền hạn (Permissions)**: Không xin quyền tự động (`getLocation`, `getPhoneNumber`) khi vừa mở app (`onLoad`). Phải áp dụng consent theo ngữ cảnh.
- **Nội dung & Tính năng**: Không chứa cơ chế rút tiền mặt, không mạng quảng cáo kiếm tiền trái phép, không nút bấm gắn nhãn Demo / Coming Soon.
- **Bảo mật**: 100% URL dùng giao thức HTTPS.

### 2. `test_zcode_pivot.js` — Ma Trận Đánh Giá 4 Ngưỡng (Pivot Matrix)
Chạy lệnh:
```bash
npm run test:pivot
```
Kết quả kiểm tra thực tế:
```
┌────────────────────────────────────────────────────────────────────────────┐
│                 MA TRẬN PIVOT ĐÁNH GIÁ 4 NGƯỠNG (GATE 1-4)                 │
├──────────────────────┬─────────────┬───────────┬──────────────┬────────────┤
│ Ngưỡng Kiểm Định     │ Số Tiêu Chí │ Đạt Chuẩn │ Điểm Tỉ Lệ   │ Trạng Thái │
├──────────────────────┼─────────────┼───────────┼──────────────┼────────────┤
│ Ngưỡng 1: Cấu hình & Định danh │      5      │     5     │     100%      │ PASS (100%) │
│ Ngưỡng 2: Nghiệp vụ & Dữ liệu ZIP Code │      4      │     4     │     100%      │ PASS (100%) │
│ Ngưỡng 3: Kiểm duyệt & Tuân thủ Zalo │      4      │     4     │     100%      │ PASS (100%) │
│ Ngưỡng 4: Đóng gói zmp-mcp & Hiệu năng │      4      │     4     │     100%      │ PASS (100%) │
└──────────────────────┴─────────────┴───────────┴──────────────┴────────────┘
```

---

## 📦 Quy Chuẩn Đóng Gói zmp-mcp & Webhook Server

Dự án tương thích hoàn toàn với thông số kỹ thuật từ [nguyenquocanhz/zmp-mcp](https://github.com/nguyenquocanhz/zmp-mcp):

### 1. Giới Hạn Dung Lượng (Resource Quotas)
- **Tổng dung lượng gói nén**: < 10 MB (Thực tế của dự án: **0.51 MB**).
- **Dung lượng file đơn lẻ**: < 3 MB/file (File lớn nhất: `index-*.js` đạt **0.40 MB**).
- **Whitelist định dạng**: Chỉ chứa `.js`, `.css`, `.png`, `.json`, `.woff2`.

### 2. Đồng Bộ Hóa Asset Tránh Lỗi "No asset defined"
Script `run_deploy.js` tự động đọc file băm (`hash`) sinh ra từ Vite và ghi trực tiếp vào `app-config.json`, `app.json` và `www/app-config.json` trước khi upload, triệt tiêu hoàn toàn lỗi không tải được tài nguyên trên môi trường production.

### 3. Webhook Server Tuân Thủ Nghị Định 13/2023/NĐ-CP
- File [`webhook-server.js`](webhook-server.js) triển khai bằng Node.js thuần (Zero dependencies).
- Xác thực chữ ký `x-zevent-signature` bằng thuật toán SHA-256 (sắp xếp key alphabet + Secret API Key).
- Phản hồi HTTP 200 trong vòng < 2000ms.
- Xử lý các sự kiện `user.revoke.consent` và `user_delete_data` theo Nghị định 13 về bảo vệ dữ liệu cá nhân.

---

## 🧠 Tài Liệu Nghiên Cứu & Transcript Matt Pocock

Trong thư mục dự án có đính kèm đầy đủ tài liệu giải mã phương pháp tiếp cận **Chia Để Trị (Divide & Conquer)** của Matt Pocock (`UNzCG3lw6O0`):
- 🇬🇧 [transcript_UNzCG3lw6O0.md](transcript_UNzCG3lw6O0.md): 103 phân đoạn có timestamp đầy đủ.
- 🇻🇳 [transcript_UNzCG3lw6O0_vi.md](transcript_UNzCG3lw6O0_vi.md): Bản dịch tiếng Việt trau chuốt, giải thích kỹ thuật:
  - *Context Rot* (Thối rữa ngữ cảnh).
  - *Context Poisoning* (Nhiễm độc ngữ cảnh).
  - Kiến trúc phân rã công việc cho AI Coding Assistant: Khởi tạo quy tắc kiểm duyệt tĩnh ➔ Chia nhỏ thành các Gate độc lập ➔ Tự động hóa kiểm thử để phản hồi tức thì.

---

## 🛠️ Cài Đặt & Chạy Thử

### Yêu Cầu Môi Trường
- **Node.js**: v18.0.0 trở lên.
- **npm** hoặc **yarn**.
- Đã cài đặt **`zmp-cli`**:
  ```bash
  npm install -g zmp-cli
  ```

### Các Bước Cài Đặt
1. **Clone repository**:
   ```bash
   git clone https://github.com/nguyenquocanhz/zalo-zipcode-app.git
   cd zalo-zipcode-app
   ```
2. **Cài đặt thư viện phụ thuộc**:
   ```bash
   npm install
   ```
3. **Cấu hình file môi trường**:
   ```bash
   cp .env.example .env
   ```
   *(Điền `APP_ID` và `ZMP_TOKEN` của bạn vào file `.env`)*.
4. **Chạy ứng dụng ở môi trường Development**:
   ```bash
   npm start
   ```
   Sau đó mở Zalo Mini App Studio hoặc quét mã QR bằng ứng dụng Zalo trên điện thoại.

---

## 🚀 Quy Trình Triển Khai (Deploy)

Dự án cung cấp bộ lệnh rút gọn trong `package.json`:

```bash
# 1. Chạy kiểm toán kiểm duyệt Zalo
npm run audit

# 2. Chạy ma trận đánh giá 4 ngưỡng
npm run test:pivot

# 3. Đóng gói ứng dụng (Vite Build)
npm run build

# 4. Tự động đóng gói và đẩy lên Zalo Cloud (Testing Version)
npm run deploy
```

---

## 🔐 Biến Môi Trường (.env)

| Biến | Ý nghĩa | Bắt buộc | Mặc định |
| :--- | :--- | :--- | :--- |
| `APP_ID` | Mã định danh Zalo Mini App trên Developer Portal | Có | `2522725584854781271` |
| `ZMP_TOKEN` | Mã JWT Token xác thực tài khoản Zalo Developer | Có | - |
| `WEBHOOK_PORT`| Cổng mạng cho Webhook Server | Không | `8086` |
| `ZALO_API_KEY`| Khóa bí mật API để xác thực chữ ký SHA-256 | Không | - |

> ⚠️ **Lưu ý bảo mật**: File `.env` chứa token bí mật của lập trình viên và đã được khai báo trong `.gitignore`. Tuyệt đối không commit file `.env` lên kho mã nguồn công khai.

---

## 📄 Bản Quyền & Giấy Phép
Dự án được phân phối dưới giấy phép **MIT License**. Mọi cá nhân, tổ chức đều có thể sử dụng, phân phối và đóng góp phát triển.
