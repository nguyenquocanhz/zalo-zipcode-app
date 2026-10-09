# BỘ QUY TẮC KIỂM DUYỆT ZALO MINI APP (ZMP-AUDIT)

> **Cập nhật:** Ngày 30/09/2026  
> **Nguồn chính thức:** [Chính sách kiểm duyệt Zalo Mini App](https://miniapp.zaloplatforms.com/documents/zalo-mini-app-censorship-policy/)  
> **Áp dụng cho:** Tất cả các Mini App gửi xét duyệt trên Zalo Platform.

---

## MỤC LỤC KIỂM TRA (9 NHÓM QUY TẮC)

1. [1. Logo Mini App](#1-logo-mini-app)
2. [2. Tên Mini App (Nguyên nhân phổ biến nhất gây từ chối)](#2-tên-mini-app)
3. [3. Mô tả Mini App](#3-mô-tả-mini-app)
4. [4. Nội dung Mini App](#4-nội-dung-mini-app)
5. [5. Hiệu suất & Độ ổn định](#5-hiệu-suất--độ-ổn-định)
6. [6. Xin quyền người dùng (Permissions & Consent)](#6-xin-quyền-người-dùng)
7. [7. Quyền riêng tư & Bảo mật](#7-quyền-riêng-tư--bảo-mật)
8. [8. Tích hợp Checkout SDK (Thanh toán)](#8-tích-hợp-checkout-sdk)
9. [9. Vận hành & Ngành nghề đặc thù](#9-vận-hành--ngành-nghề-đặc-thù)

---

### 1. Logo Mini App

| Mã quy tắc | Tiêu chí | Vi phạm (Bị từ chối) ❌ | Đạt chuẩn (Được duyệt) ✅ |
| :--- | :--- | :--- | :--- |
| **`LOGO_01`** | **Tính chính chủ** | Sử dụng logo thương hiệu/nhãn hàng khác; hoặc để trống không có logo. | Sử dụng logo chính chủ của doanh nghiệp/cá nhân sở hữu app. |
| **`LOGO_02`** | **Nội dung & Định dạng** | Logo chứa **Số điện thoại**, chứa **Mã QR Code**, hoặc có **Background trong suốt (Transparent)**. | Logo rõ ràng, phù hợp công năng, nền đặc (Solid background), kích thước chuẩn vuông/tròn theo quy định. |

---

### 2. Tên Mini App

> ⚠️ **LƯU Ý ĐẶC BIỆT:** Đây là lỗi chiếm >60% các trường hợp bị từ chối duyệt!

| Mã quy tắc | Tiêu chí | Vi phạm (Bị từ chối) ❌ | Đạt chuẩn (Được duyệt) ✅ |
| :--- | :--- | :--- | :--- |
| **`NAME_01`** | **Tính phù hợp** | Tên thể hiện sai lệch với chức năng thực tế của Mini App. | Tên phản ánh trung thực chức năng của ứng dụng. |
| **`NAME_02`** | **Không viết hoa toàn bộ** | Viết hoa TOÀN BỘ ký tự (VD: `TRA CUU MA BUU CHINH`). | Viết hoa chữ cái đầu hoặc viết hoa tiêu chuẩn (VD: `WrenApp - Tra cứu mã bưu chính`). |
| **`NAME_03`** | **Không dùng từ khóa chung** | Tên chỉ chứa từ khóa/danh từ chung chỉ ngành nghề hoặc địa danh (VD: `Tra cứu mã bưu chính`, `Mua sắm`, `Việt Nam`). | Phải có **tiền tố hoặc hậu tố** thể hiện rõ **Chủ thể sở hữu** (VD: `WrenApp - Tra cứu mã bưu chính`, `MinhPost - Tra cứu ZIP`). |
| **`NAME_04`** | **Từ cấm** | Tên chứa các từ: `"Zalo"`, `"Mini App"` (từ `"App"` đứng độc lập dễ gây nhầm lẫn). | Tên không chứa thương hiệu Zalo hoặc từ gây nhầm lẫn nền tảng. |
| **`NAME_05`** | **Ký tự đặc biệt & Emoji** | Chứa emoji (😍, 🚀), ký tự đặc biệt (`#`, `$`, `@`, `!`, `~`, `*`). | Chỉ sử dụng chữ cái, số, dấu gạch nối `-`, dấu chấm `.` hợp lệ. |
| **`NAME_06`** | **Sở hữu thương hiệu** | Đặt tên thương hiệu riêng mà không có giấy tờ sở hữu nộp tại trang *Quản lý xác thực*. | Cung cấp giấy đăng ký nhãn hiệu từ Cục SHTT hoặc gắn với tên cá nhân/tên dự án đã định danh. |

---

### 3. Mô tả Mini App

| Mã quy tắc | Tiêu chí | Vi phạm ❌ | Đạt chuẩn ✅ |
| :--- | :--- | :--- | :--- |
| **`DESC_01`** | **Bắt buộc có mô tả** | Để trống mô tả hoặc mô tả 1 vài chữ vô nghĩa (`abc`, `test`). | Mô tả rõ ràng mục đích, đối tượng phục vụ và tính năng chính. |
| **`DESC_02`** | **Không chèn Link (URL)** | Chứa URL trang web (VD: `https://...`, `www...`, `link tải...`). | Mô tả thuần văn bản tiếng Việt có dấu, không chèn link. |
| **`DESC_03`** | **Chuẩn mực nội dung** | Nội dung sai sự thật, mê tín, cờ bạc, vi phạm thuần phong mỹ tục. | Ngôn từ văn minh, đúng tôn chỉ pháp luật Việt Nam. |

---

### 4. Nội dung Mini App

| Mã quy tắc | Tiêu chí | Vi phạm ❌ | Đạt chuẩn ✅ |
| :--- | :--- | :--- | :--- |
| **`CONTENT_01`** | **Điều hướng liên kết ngoài** | Mở trình duyệt ngoài bằng link web khác; khuyến khích người dùng tải ứng dụng Android/iOS riêng. | Mọi tác vụ diễn ra trong Mini App. Nếu có *Điều khoản / Chính sách*, phải **nhúng popup trong app** hoặc ẩn nút dẫn ra ngoài. |
| **`CONTENT_02`** | **Đăng nhập bên thứ ba** | Điều hướng đăng nhập bằng Google, Facebook, Apple... | Sử dụng Zalo Authentication hoặc form đăng nhập tài khoản nội bộ. |
| **`CONTENT_03`** | **Quảng cáo & Kiếm tiền** | Tự ý nhúng banner Google AdSense, banner kiếm tiền của bên thứ ba. | Không chứa quảng cáo ngoài. Chỉ dùng Zalo Ads SDK khi được phê duyệt. |
| **`CONTENT_04`** | **Vật phẩm ảo & Nội dung số** | Bán coin/vàng game, vật phẩm ảo, tiền ảo/NFT, bán khóa học online/gói nhạc/phim chưa cấp phép. | Giao dịch mua sắm phải gắn với **sản phẩm/dịch vụ đời thực** (giặt sấy, trạm sạc, thuê tủ đồ, hàng hóa vật lý...). |
| **`CONTENT_05`** | **Rút tiền / Trả thưởng** | Có tính năng rút tiền mặt, đổi điểm ra tiền mặt, trả thưởng tiền mặt. | Tích điểm đổi quà tặng hiện vật hoặc voucher giảm giá nội bộ (không quy đổi ra tiền mặt). |
| **`CONTENT_06`** | **Mạng xã hội & Cạnh tranh** | Có newsfeed đăng bài, đăng video, like, bình luận cộng đồng; hoặc cạnh tranh trực tiếp Zing MP3, Zalo Chat. | Tập trung vào nghiệp vụ tiện ích/dịch vụ riêng của đơn vị. |
| **`CONTENT_07`** | **Chất lượng hiển thị (UI)** | Hình ảnh bị lỗi 404, bể hình, font chữ lỗi dấu `?` hoặc không đọc được. | Giao diện sắc nét, responsive trên mọi kích thước màn hình điện thoại. |
| **`CONTENT_08`** | **Chính sách & Điều khoản** | Điều khoản chung chung, không rõ của ai. | Ghi rõ: *"Chính sách & Điều khoản sử dụng của Mini App [Tên App] thuộc [Đơn vị/Cá nhân sở hữu]"*. |

---

### 5. Hiệu suất & Độ ổn định

| Mã quy tắc | Tiêu chí | Vi phạm ❌ | Đạt chuẩn ✅ |
| :--- | :--- | :--- | :--- |
| **`PERF_01`** | **Không để tính năng Demo** | Nút bấm không hoạt động; ghi chữ "Coming Soon", "Tính năng đang phát triển", "Bản Demo". | Mọi tính năng xuất hiện trên màn hình đều phải hoạt động trơn tru. Tính năng nào chưa xong phải ẩn đi. |
| **`PERF_02`** | **Độ ổn định (Crash/Blank)** | Mini App bị đơ, treo hoặc hiện màn hình trắng (White screen). | Có Error Boundary bắt lỗi, hiển thị thông báo thân thiện khi mất kết nối mạng. |
| **`PERF_03`** | **Thời gian tải (Load Time)** | Tải app > 10 giây; LCP quá chậm. | - **Thời gian tải trang (PageLoad):** < 1.5 giây.<br>- **LCP (Largest Contentful Paint):** < 2.5 giây.<br>- **Phản hồi tính năng:** Không quá 10 giây. |

---

### 6. Xin quyền người dùng (Permissions & Consent)

> ⚠️ **Áp dụng cho:** Số điện thoại, Vị trí, Tên & Avatar, Camera, Thông báo, Quan tâm OA, Tương tác OA.

| Mã quy tắc | Tiêu chí | Vi phạm ❌ | Đạt chuẩn ✅ |
| :--- | :--- | :--- | :--- |
| **`PERM_01`** | **Ngữ cảnh xin quyền** | Gọi popup xin quyền ngay khi người dùng vừa mở app (trong `useEffect` / `onLoad`). | **Tuyệt đối không bật popup xin quyền khi vừa vào app.** Chỉ xin quyền khi người dùng click vào một nút cụ thể cần quyền đó. |
| **`PERM_02`** | **Giải thích rõ ràng** | Xin quyền bất thình lình không có thông tin giải thích. | Hiển thị mô tả lý do cần quyền trước khi kích hoạt API nền tảng. |
| **`PERM_03`** | **Giao diện chuẩn** | Tự vẽ popup giả giao diện hệ thống Zalo để lừa người dùng bấm cho phép. | Sử dụng hộp thoại cấp quyền tiêu chuẩn của nền tảng Zalo. |
| **`PERM_04`** | **Lựa chọn "Từ chối"** | Chặn app, bắt buộc cấp quyền mới cho dùng; không cho dùng tiếp khi bấm Từ chối. | Khi người dùng bấm **Từ chối**, vẫn cho phép họ sử dụng các tính năng khác bình thường. |
| **`PERM_05`** | **Trải nghiệm không cần đăng nhập** | Chặn màn hình bắt đăng ký/đăng nhập ngay khi mở ứng dụng. | Khách vãng lai phải được xem và dùng thử dịch vụ trước khi quyết định đăng nhập (trừ app nội bộ trường học/công ty). |
| **`PERM_06`** | **Liên kết tài khoản** | Gắn số Zalo vào tài khoản sẵn có trước khi đăng nhập. | Đặt tên chức năng là **"Liên kết tài khoản"** và chỉ thực hiện sau khi người dùng đã đăng nhập thành công. |

---

### 7. Quyền riêng tư & Bảo mật

- **Dữ liệu minh bạch (`PRIV_01`):** Chỉ thu thập thông tin khi có sự đồng ý rõ ràng của người dùng; không âm thầm đẩy dữ liệu cá nhân về server.
- **Không mã độc (`PRIV_02`):** Mã nguồn sạch, không dùng `eval()` nguy hiểm, không gọi tài nguyên qua HTTP không an toàn (phải dùng 100% HTTPS).
- **Không rò rỉ dữ liệu (`PRIV_03`):** Tuyệt đối không chia sẻ dữ liệu người dùng cho bên thứ ba trái phép.

---

### 8. Tích hợp Checkout SDK (Thanh toán)

| Trường hợp | Yêu cầu bắt buộc |
| :--- | :--- |
| **Có phát sinh đơn hàng & hiển thị giá tiền** | **BẮT BUỘC TÍCH HỢP ZALO CHECKOUT SDK.** Không được tự dẫn sang trang ngân hàng ngoài hoặc số tài khoản chuyển khoản thủ công để thanh toán giỏ hàng. |
| **Chưa tích hợp Checkout SDK** | **BẮT BUỘC ẨN GIÁ TIỀN.** Chuyển nút *"Mua hàng / Thanh toán"* thành *"Liên hệ"* hoặc *"Tư vấn"*. |

---

### 9. Vận hành & Ngành nghề đặc thù

- **Thời gian kiểm duyệt:** Trong vòng **3 ngày làm việc** (không tính Thứ 7, Chủ Nhật và ngày Lễ).
- **Duy trì hoạt động:** Mini App phải duy trì tối thiểu **10 lượt truy cập/tháng**. Nếu dưới mức này trong 3 tháng liên tiếp, app có thể bị hạn chế hiển thị.
- **Nhóm ngành đặc thù:** Dược phẩm, mỹ phẩm, thực phẩm chức năng, tài chính, y tế... phải có **Giấy phép hành nghề/kinh doanh có điều kiện** và hoàn tất xác thực Zalo Official Account (OA).
- **Chiến dịch có thời hạn:** Phải ghi rõ ngày bắt đầu & kết thúc trong phần mô tả phiên bản hoặc hiển thị trên giao diện Mini App.

---

## 🛠️ CÔNG CỤ TỰ ĐỘNG: CHECKLIST TRƯỚC KHI SUBMIT

Chạy lệnh kiểm tra tự động mã nguồn dự án:
```bash
npm run audit
```
hoặc
```bash
node zmp-audit.js          # báo cáo chữ
node zmp-audit.js --json   # báo cáo JSON
```

`zmp-audit.js` là bản sinh tự động từ `zmp-mcp` (`src/policy/engine.ts`), cùng engine với tool MCP `zmp_policy_audit`. Đừng sửa tay: sửa luật trong `zmp-mcp`, build lại rồi chép `dist/zmp-audit.cjs` đè lên. Lệnh thoát mã 1 khi có vi phạm, nên dùng được trong CI.
