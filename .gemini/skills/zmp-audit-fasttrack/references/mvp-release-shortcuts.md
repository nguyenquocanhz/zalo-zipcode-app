# MVP Fast-Track Shortcuts: Vượt Kiểm Duyệt Zalo Trong 24 Giờ

Đây là các "đường tắt" kỹ thuật giúp bản MVP được duyệt ngay lần đầu tiên mà không bị kiểm duyệt viên bắt bẻ:

### 1. Đường tắt Thanh toán (Bỏ qua Checkout SDK phức tạp)
* **Vấn đề:** Tích hợp Zalo Checkout SDK cần hợp đồng Merchant, định danh doanh nghiệp và kiểm thử cổng thanh toán mất từ 1 - 2 tuần.
* **Đường tắt MVP:** 
  - Ẩn toàn bộ nhãn giá tiền (`₫`, `VND`, `Giá: ...`) trên giao diện sản phẩm/dịch vụ.
  - Đổi các nút bấm `[Mua ngay]`, `[Thanh toán]` thành `[Liên hệ tư vấn]`, `[Gửi yêu cầu]` hoặc `[Chat Zalo OA]`.
  - *Kết quả:* Zalo xếp ứng dụng vào nhóm "Ứng dụng giới thiệu dịch vụ", **không bị bắt buộc tích hợp Checkout SDK**.

### 2. Đường tắt Tên ứng dụng (Tránh bị đòi giấy tờ SHTT)
* **Vấn đề:** Dùng tên thương hiệu riêng bị đòi Giấy chứng nhận nhãn hiệu của Cục SHTT. Dùng tên chung bị phạt từ khóa ngành nghề.
* **Đường tắt MVP:** Áp dụng công thức:
  `[Tên Cá Nhân/Tên Dự Án] + [Từ chỉ tiện ích ngắn gọn]`
  Ví dụ: `NamTool - Tra cứu bưu điện`, `WrenApp - Tra cứu mã bưu chính`.

### 3. Đường tắt Đăng nhập (Guest-First)
* **Vấn đề:** Màn hình chặn bắt đăng nhập tài khoản / xin số điện thoại ngay khi vào app sẽ bị từ chối 100%.
* **Đường tắt MVP:**
  - Cho phép người dùng trải nghiệm toàn bộ tính năng chính mà không cần đăng nhập.
  - Chỉ hỏi xin thông tin khi người dùng thực hiện một tác vụ cá nhân hóa (ví dụ: lưu mục yêu thích, gửi biểu mẫu).

### 4. Xử lý tính năng chưa hoàn thiện
* **Vấn đề:** Để nút bấm không hoạt động hoặc ghi `Coming Soon`, `Bản thử nghiệm`, `Demo` sẽ bị từ chối vì lỗi trải nghiệm người dùng chưa sẵn sàng.
* **Đường tắt MVP:**
  - **Ẩn hoàn toàn** (comment out) các nút bấm và tab chưa xong.
  - Chỉ giữ lại đúng 1 hoặc 2 tính năng cốt lõi (Vertical Slice) hoạt động trơn tru.

### 5. Điều khoản sử dụng & Chính sách bảo mật
* **Vấn đề:** Dẫn link ra website ngoài (`window.open('https://mycompany.com/terms')`) bị tính là điều hướng trang thứ 3.
* **Đường tắt MVP:**
  - Nhúng trực tiếp văn bản điều khoản vào một component Popup / Modal / Sheet (`zaui-sheet`).
  - Ghi rõ tiêu đề: *"Chính sách & Điều khoản của Mini App [Tên App] thuộc [Chủ thể sở hữu]"*.

### 6. Định dạng Logo
* **Vấn đề:** File PNG có nền trong suốt (transparent) hoặc chứa text số điện thoại / QR code.
* **Đường tắt MVP:** Xuất file ảnh vuông (512x512) với nền đặc màu đơn sắc (solid white `#FFFFFF` hoặc brand color), không chữ số điện thoại, không QR code.
