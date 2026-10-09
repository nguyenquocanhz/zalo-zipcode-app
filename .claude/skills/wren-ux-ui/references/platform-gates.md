# Cổng nền tảng — kiểm duyệt và hiệu suất

Chỉ gồm những luật mà **quyết định giao diện** có thể vi phạm. Kiểm toàn bộ trước khi nộp
thì dùng skill `zmp-audit-fasttrack` và `npm run audit`.

Nguồn: <https://miniapp.zaloplatforms.com/documents/zalo-mini-app-censorship-policy/> và bài
hướng dẫn cải thiện LCP trên blog Zalo Mini App.

## G1. Không dẫn người dùng ra ngoài (4.1)

- Không nút, link mở trang ngoài, không mời tải ứng dụng riêng, không đăng nhập Google /
  Facebook.
- Ngoại lệ duy nhất: tài liệu Chính sách bảo mật, Điều khoản sử dụng; tốt nhất là nhúng thẳng
  vào Mini App dạng `Sheet` hoặc `Modal`.
- Thiết kế cần "mở bản đồ", "xem thêm ở web": thay bằng sao chép địa chỉ, hoặc hiển thị nội
  dung ngay trong app.

## G2. Xin quyền đúng ngữ cảnh (6.1–6.3)

Quyền: tên và ảnh đại diện, số điện thoại, vị trí, camera, thông báo, quan tâm OA.

- **Không xin quyền lúc vừa mở app.** Chỉ xin khi người dùng chạm vào đúng tính năng cần nó.
- Trước hộp thoại xin quyền phải có **một câu giải thích để làm gì** ngay tại nút hoặc khối
  đó ("Định vị để xếp cây xăng theo khoảng cách").
- Dùng **giao diện xin quyền chuẩn của nền tảng** (API `zmp-sdk`). Không tự vẽ hộp thoại
  giống hộp thoại hệ thống.
- **Từ chối vẫn dùng được.** Mỗi tính năng cần quyền phải có một lối không cần quyền, và
  trạng thái "đã từ chối" phải được thiết kế: câu giải thích + lối thay thế, không phải màn
  trống.
- Không tự hiện dữ liệu cá nhân khi chưa có hành động của người dùng.

## G3. Không bắt đăng nhập (6.4)

Người dùng xem và dùng được nội dung mà không cần tạo tài khoản hay đăng nhập. Không thiết kế
màn đăng nhập làm cửa vào.

## G4. Không có thứ dở dang (5.1, 5.2)

- Không nút, tab, mục "Sắp ra mắt", "Demo", "Coming soon". Chưa xong thì không hiện.
- Mọi control trên màn đều chạy thật.
- Mỗi màn có trạng thái đang tải, rỗng, lỗi; không bao giờ để màn trắng hoặc treo.
  Mất mạng thì hiện dữ liệu đệm kèm thời điểm, hoặc lỗi có nút thử lại.

## G5. Không quảng cáo, không tiền ảo, không mạng xã hội (4.3–4.6)

Không banner quảng cáo, vật phẩm ảo, rút tiền / trả thưởng, đăng bài / like / bình luận.

## G6. Hiện giá bán thì phải có Checkout SDK (8)

Màn có đơn hàng, thanh toán và giá bán thì bắt buộc tích hợp Checkout SDK. Chưa tích hợp:
không hiện giá sản phẩm, đổi nút mua thành "Liên hệ" / "Tư vấn". Giá tham khảo công khai
(giá xăng niêm yết) không phải giá bán, nhưng **không đặt nút mua hay thanh toán cạnh nó**.

## G7. Chữ và ảnh hiển thị rõ (4.7)

Không ảnh vỡ, không font lỗi, không chữ khó đọc. Ảnh có kích thước cố định và có hình thay
thế khi tải hỏng. Chữ đạt tương phản ở cả sáng và tối.

## G8. Chính sách – điều khoản (4.8)

Có thu thập dữ liệu (vị trí, số điện thoại) thì có trang chính sách: tiêu đề ghi rõ "Chính
sách … của Mini App <tên>", nêu đơn vị sở hữu, nội dung cụ thể, mở trong app.

## G9. Màn đầu phải nhẹ (5.3)

Ngưỡng: **LCP dưới 2,5 giây, PageLoad dưới 1,5 giây**. Quyết định UI ảnh hưởng trực tiếp:

- **Phần tử lớn nhất của màn đầu nên là chữ**, bằng font hệ thống (Load Time = 0). Nếu là
  ảnh: WEBP, đúng kích thước hiển thị, `fetchpriority="high"`, không `loading="lazy"`; ảnh
  khác thì `loading="lazy"`.
- **Màn đầu không chuyển hướng.** Không vẽ một màn rồi nhảy sang màn khác (kiểm quyền, đăng
  nhập); phần tử LCP phải ở ngay màn đầu tiên được vẽ.
- **Thứ không ở màn đầu thì tách chunk**: tab, module, sheet nặng dùng `React.lazy` +
  `Suspense` với fallback là `Spinner` (xem `GasPriceTab` trong `src/pages/index/index.jsx`).
  Module mới mặc định là lazy.
- **Không thêm thư viện cho một hiệu ứng.** Biểu đồ, hoạt ảnh, ngày giờ: dựng bằng CSS / SVG
  trước; cần thư viện thì đề xuất một dòng kèm dung lượng, người dùng quyết.
- Danh sách dài không dựng hết ở lần vẽ đầu.
- Đo bằng `npm run build` (xem kích thước chunk `index`) và trang Thống kê > Hiệu suất.

## Câu hỏi nhanh trước khi giao

1. Có nút nào mở ra ngoài app không?
2. Mở app lên có hộp thoại nào tự bật không?
3. Bấm "từ chối" ở mọi chỗ xin quyền thì màn trông ra sao?
4. Có control nào bấm vào không làm gì không?
5. Tắt mạng thì mỗi màn hiện gì?
6. Thay đổi này có làm chunk `index` to lên không?
