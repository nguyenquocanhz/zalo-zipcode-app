# Sổ Tay Công Cụ ZMP & zmp-mcp (Playbook)

## 1. Các tool MCP trong zmp-mcp
Khi cần tương tác với Zalo Mini App Platform, ưu tiên sử dụng `call_mcp_tool` với server `zmp-mcp`:

1. **`zmp_validate_project`**:
   - Tham số: `{"projectDir": "<đường-dẫn-tuyệt-đối>"}`
   - Công dụng: Kiểm tra tính hợp lệ của cấu trúc thư mục, `app-config.json`, các file assets và dependencies.
2. **`zmp_owasp_audit`**:
   - Tham số: `{"projectDir": "<đường-dẫn-tuyệt-đối>"}`
   - Công dụng: Quét tĩnh mã nguồn tìm lỗ hổng bảo mật OWASP Top 10 (hardcoded secrets, XSS, insecure transport).
3. **`zmp_sync_config`**:
   - Tham số: `{"projectDir": "<đường-dẫn-tuyệt-đối>"}`
   - Công dụng: Đồng bộ cấu hình giữa `app-config.json`, `app.json` và `www/app-config.json`.
4. **`zmp_build`**:
   - Tham số: `{"projectDir": "<đường-dẫn-tuyệt-đối>"}`
   - Công dụng: Đóng gói Mini App bằng ZMP CLI sang thư mục phát hành.
5. **`zmp_deploy`**:
   - Tham số: `{"projectDir": "<đường-dẫn-tuyệt-đối>", "env": "testing", "message": "<ghi chú phiên bản>"}`
   - Công dụng: Tải bản đóng gói lên Zalo Mini App Cloud (chế độ Testing hoặc Production).

## 2. Fallback CLI khi Token MCP hết hạn hoặc offline
Nếu `zmp-mcp` báo `Permission denied` hoặc `ZMP_TOKEN expired`:
- Chạy kiểm tra tĩnh nội bộ: `node zmp-audit.js`
- Đóng gói chuẩn Vite & sync assets: `node run_deploy.js` hoặc `npm run build`
- Hướng dẫn người dùng đăng nhập CLI nếu cần deploy: `npx zmp-cli login`
