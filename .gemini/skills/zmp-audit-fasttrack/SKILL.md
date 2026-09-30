---
name: zmp-audit-fasttrack
description: Audit Zalo Mini App codebase and configuration against official censorship guidelines for fast-track MVP release. Integrates zmp-mcp validation, auto-remediation, and pre-flight gate checks. Use when preparing to submit, audit, or release a Zalo Mini App.
---

# ZMP Audit Fast-Track: Quy Trình Kiểm Duyệt & Tốc Hành Phát Hành MVP

Bộ kỹ năng kiểm định và chuẩn bị phát hành Zalo Mini App theo triết lý **Chia để trị (Divide & Conquer)**: Phân tách rạch ròi giữa Kiểm tra chặn lỗi (Gate Check) $\rightarrow$ Vá lỗi cấu hình (Auto-Remediation) $\rightarrow$ Đóng gói & Phát hành (Build & Deploy).

---

## 🧭 CÁC TỪ KHÓA DẪN DẮT (LEADING WORDS)
* **`Fail-Fast Gate`**: Chặn đứng tuyệt đối mọi hành vi build/deploy nếu phát hiện vi phạm chính sách kiểm duyệt. Không bao giờ nộp bản có lỗi lên Zalo.
* **`Vertical Slice MVP`**: Chỉ đưa vào bản xét duyệt những tính năng cốt lõi đã chạy mượt mà 100%. Ẩn toàn bộ nút bấm dở dang, cấm gắn nhãn "Demo" hay "Coming Soon".
* **`Zero-Surprise Deployment`**: Đảm bảo đồng bộ 3 bên: `app-config.json`, bundles trong `www/`, và thông tin đăng ký trên Mini App Center.

---

## 📋 QUY TRÌNH 3 BƯỚC THỰC THI (PROCEDURAL STEPS)

### BƯỚC 1: QUÉT TIỀN KIỂM DUYỆT (PRE-FLIGHT GATE CHECK)
> ⚠️ **Quy tắc bất di bất dịch:** Nếu có bất kỳ lỗi ĐỎ nào xuất hiện, DỪNG LẠI NGAY LẬP TỨC và chuyển sang Bước 2. Tuyệt đối không nhảy cóc sang Bước 3!

1. **Kiểm tra Cấu hình Tên & Logo:**
   - Kiểm tra `app.title` trong `app-config.json`: Không ALL CAPS, không từ cấm ("Zalo", "Mini App"), không emoji/ký tự lạ, phải có tên chủ thể.
   - Kiểm tra Logo: Đảm bảo có nền màu đặc (solid background), không chứa số điện thoại hoặc mã QR code.
2. **Quét Mã Nguồn Bằng Công Cụ Tự Động:**
   - Chạy lệnh kiểm tra tĩnh: `node zmp-audit.js` (hoặc `npm run audit`).
   - Nếu MCP Server `zmp-mcp` khả dụng, gọi tool: `zmp_validate_project` và `zmp_owasp_audit`.
3. **Đối chiếu 9 Nhóm Tiêu Chí:**
   - Tra cứu chi tiết tại context pointer: [censorship-rubric.md](references/censorship-rubric.md).

---

### BƯỚC 2: TỰ ĐỘNG KHẮC PHỤC LỖI MVP (AUTO-REMEDIATE)
Nếu phát hiện vi phạm, áp dụng các đường tắt chuẩn của MVP để vượt qua kiểm duyệt nhanh nhất:

1. **Lỗi Tên App:** Đổi theo công thức: `[Tên Chủ Thể/Biệt Danh] + [Chức Năng Tiện Ích]`.
2. **Lỗi Thanh Toán (Chưa có Checkout SDK):**
   - Áp dụng hướng dẫn tại context pointer: [mvp-release-shortcuts.md](references/mvp-release-shortcuts.md#1-đường-tắt-thanh-toán-bỏ-qua-checkout-sdk-phức-tạp).
   - Ẩn toàn bộ giá tiền (`₫`, `VND`) và chuyển nút "Thanh toán/Mua" thành "Liên hệ" hoặc "Tư vấn".
3. **Lỗi Tính Năng Chưa Hoàn Thiện:**
   - Ẩn/comment out các nút bấm hoặc màn hình chưa code xong; xóa sạch các từ "Demo", "Coming Soon".
4. **Lỗi Điều Khoản / Chính Sách:**
   - Nhúng nội dung điều khoản vào Popup/Sheet nội bộ (`zaui Sheet`), không mở link trình duyệt ngoài (`window.open`).

---

### BƯỚC 3: ĐÓNG GÓI & PHÁT HÀNH TỐC HÀNH (BUILD & DEPLOY)
Chỉ kích hoạt bước này sau khi Bước 1 & Bước 2 đã đạt **100% ĐẠT CHUẨN**.

1. **Đóng Gói Ứng Dụng (Vite / ZMP Build):**
   - Chạy lệnh: `cmd /c "npm run build"` (hoặc gọi tool `zmp_build` trong `zmp-mcp`).
2. **Đồng Bộ Tài Nguyên Assets:**
   - Đảm bảo danh sách file `.css` và `.js` thực tế trong `www/assets/` khớp 1:1 với `listCSS` và `listAsyncJS` trong `app-config.json`.
3. **Triển Khai Lên Zalo Cloud (Deploy Testing):**
   - Đọc hướng dẫn chi tiết tại context pointer: [zmp-mcp-playbook.md](references/zmp-mcp-playbook.md).
   - Gọi `zmp_deploy` hoặc chạy `node run_deploy.js` để tải bản cập nhật lên phiên bản Testing.
4. **Hướng Dẫn Người Dùng Nộp Duyệt:**
   - Báo cáo kết quả kiểm định đạt 100%, cung cấp checklist cuối cùng để người dùng vào Mini App Center bấm **Nộp bản xét duyệt (Submit Review)**.
