# Bảng Tra Cứu 9 Tiêu Chí Kiểm Duyệt Zalo Mini App (Censorship Rubric)

> Nguồn chính thức: https://miniapp.zaloplatforms.com/documents/zalo-mini-app-censorship-policy/

| # | Hạng mục | Quy tắc vi phạm (TỪ CHỐI NGAY ❌) | Quy tắc đạt chuẩn (DUYỆT NGAY ✅) |
|---|---|---|---|
| **1** | **Logo** | Background trong suốt; có chứa SĐT; có chứa QR code; dùng logo thương hiệu khác; không có logo. | Nền màu đặc (solid background), rõ nét, phù hợp chức năng, kích thước vuông/tròn chuẩn. |
| **2** | **Tên Mini App** | Viết hoa TOÀN BỘ (ALL CAPS); từ khóa chung thuần túy; chứa từ cấm "Zalo", "Mini App"; chứa `#`, `$`, `@`, emoji; thiếu tên chủ thể. | Có tiền tố/hậu tố định danh chủ thể (`[TênChủThể] - [ChứcNăng]`); không emoji/ký tự đặc biệt. |
| **3** | **Mô tả** | Để trống mô tả; chứa URL/đường link web; nội dung sai sự thật, mê tín, cờ bạc. | Mô tả ngắn gọn, trung thực mục đích, không chứa link ngoài. |
| **4** | **Nội dung** | Điều hướng ra link ngoài; bắt đăng nhập Google/Facebook; tự treo banner quảng cáo kiếm tiền (AdSense); bán vật phẩm ảo/coin game; có tính năng rút tiền mặt/trả thưởng; làm mạng xã hội/cạnh tranh Zing MP3/Zalo. | Mọi thao tác gói gọn trong Mini App; điều khoản nhúng popup nội bộ; dịch vụ đời thực. |
| **5** | **Hiệu suất** | Nút bấm không chạy; có chữ "Demo" / "Coming Soon"; crash màn hình trắng; tải app > 10s. | Mọi tính năng hiển thị đều hoạt động thật; có Error Boundary; LCP < 2.5s, PageLoad < 1.5s. |
| **6** | **Xin quyền** | Bật popup xin quyền (SĐT, Vị trí...) ngay khi mở app; giả mạo popup nền tảng; chặn app nếu user bấm Từ chối; bắt đăng nhập trước khi xem. | Không popup lúc khởi chạy; chỉ xin quyền khi user click hành động cụ thể; cho phép bấm Từ chối vẫn dùng được tính năng khác; khách vãng lai dùng thử được. |
| **7** | **Bảo mật** | Âm thầm gửi dữ liệu cá nhân; dùng `eval()`; tải script HTTP không an toàn. | 100% kết nối HTTPS; xin phép người dùng minh bạch trước khi lưu thông tin. |
| **8** | **Thanh toán** | Có đơn hàng & hiện giá tiền nhưng không dùng Zalo Checkout SDK. | Bắt buộc dùng Checkout SDK. Nếu chưa tích hợp SDK: Ẩn giá tiền và đổi nút sang "Liên hệ" hoặc "Tư vấn". |
| **9** | **Vận hành** | Dưới 10 lượt truy cập/tháng; ngành đặc thù (dược, mỹ phẩm, tài chính) thiếu giấy phép kinh doanh; chiến dịch thời hạn không ghi ngày kết thúc. | Duy trì tương tác; nộp đủ giấy tờ xác thực OA ngành đặc thù; ghi rõ ngày bắt đầu - kết thúc chiến dịch. |
