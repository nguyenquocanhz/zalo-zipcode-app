# ZaUI Components — chọn gì, dùng thế nào

Nguồn: <https://docs.zaloplatforms.com/docs/MA/zaui>. Tất cả import từ `"zmp-ui"`. Prop nào
không có ở đây thì mở trang component tương ứng (`/zaui/<nhóm>/<Tên>`), đừng đoán.

## Đổi mẫu của evon sang ZaUI

| Evon gọi là | Trong Mini App dùng |
| --- | --- |
| Sidebar, thanh điều hướng chính | `BottomNavigation` (4–6 mục) hoặc thanh chuyển module tự dựng (2–3 mục) |
| Thanh tab | `Tabs` + `Tabs.Tab` |
| Bảng, danh sách | `List` + `List.Item` (`title`, `subTitle`, `prefix`, `suffix`) |
| Dropdown, select, panel trượt, command palette | `Select` (mở dạng sheet) hoặc `Sheet` |
| Modal xác nhận | `Modal` với `actions` |
| Toast | `SnackbarProvider` + `useSnackbar().openSnackbar` |
| Ô nhập, ô tìm kiếm, mật khẩu, OTP, textarea | `Input`, `Input.Search`, `Input.Password`, `Input.OTP`, `Input.TextArea` |
| Công tắc, checkbox, radio, slider | `Switch`, `Checkbox`, `Radio`, `Slider` |
| Chọn ngày, chọn nhiều cột | `DatePicker`, `Picker` |
| Khung chờ, đang tải | `Spinner`, hoặc `loading` của `Button` / `List` |
| Thanh tiến độ | `Progress` |
| Avatar, xem ảnh, băng chuyền, lịch | `Avatar`, `ImageViewer`, `Swiper`, `Calendar` |
| Chip, badge, empty state, timeline, biểu đồ | **ZaUI không có.** Mượn khuôn evon, tô bằng token ZaUI |

## Khung ứng dụng

- `App` là gốc, nhận `theme="light" | "dark"`. Đổi theme lúc chạy bằng `useTheme()`.
- `Page` là một màn, dùng với `ZMPRouter` + `AnimationRoutes` + `Route`.
  - Trang thường: `restoreScrollOnBack` để quay lại đúng chỗ đang đọc.
  - Trang nằm trong Tabs: `restoreScroll`.
  - Trang có trạng thái riêng (menu thu gọn, phân trang, cuộn vô hạn): giữ ở state toàn cục
    để khôi phục đúng.

## Header

Hai loại: header native (cấu hình ở `app-config.json`, không tuỳ biến) và component `Header`
(prop `title`, `showBackIcon`, `onBackClick`, `backgroundColor`, `textColor`).

- Góc phải trên luôn có **Mini App Control** (menu, đóng) của Zalo. Không đặt gì vào vùng
  đó; header tự dựng phải chừa lề phải cho nó.
- Chữ và icon header chỉ **trắng hoặc đen**; nền thì tự do nhưng phải đủ tương phản.
- Nút trái là "back", **chỉ ở trang thứ cấp**. Hạn chế nút "home" ở đây.
- Tiêu đề ngắn, hiện đủ trên một dòng: tên màn, tên chức năng, hoặc tên Mini App.
- **Không đặt thêm một thanh điều hướng ngay dưới header mặc định.**
- Ẩn header mặc định để tự dựng thì nội dung phải chừa đúng chiều cao header.

## BottomNavigation

- Chỉ cho **nội dung chính cấp một**, 4–6 mục, mỗi mục có icon + nhãn. Dưới 4 mục thì không
  dùng; dùng `Tabs` hoặc thanh module.
- Mở app luôn vào mục đầu tiên. Mỗi lần chỉ một mục.
- Quay lại một mục thì giữ nguyên trạng thái trước đó (vị trí cuộn, tab con, sheet).
- Dùng `fixed`, kèm `activeKey` + `onChange`. Badge nằm góc trên phải icon.
- Icon đang chọn dùng bản `-solid`.

## Tabs

- Cho các nhóm nội dung **đồng cấp, cùng một chủ đề**, từ 2 tab.
- Số tab cố định lúc dùng, không đổi theo dữ liệu người dùng nhập.
- Nội dung mỗi tab ngắn. Nhiều tab quá bề ngang thì `scrollable`.
- Không lồng Tabs trong Tabs.

## Button

- Ba cấp: `variant="primary" | "secondary" | "tertiary"`. Ba cỡ: `large`, `medium`, `small`.
  Trạng thái: nhấn giữ, `loading`, `disabled`.
- **Large** cho nút đứng trên trang (thường `fullWidth`). **Small** cho nút trong một khối
  nhỏ hay một dòng List.
- Nút dính đáy màn hình thì thêm đường kẻ (divider) phía trên và chừa safe-area.
- Nút có chữ cho hành động xác nhận hoặc quan trọng; nút chỉ có icon (`icon`) cho hành động
  bổ trợ.
- Nhóm nút: **chỉ một primary**; ngang thì primary bên phải, dọc thì primary trên cùng.
- Hành động phá huỷ: `type="danger"`. Đang chạy: `loading`, không tự thay chữ bằng spinner.
- Icon trong nút dùng `prefixIcon` / `suffixIcon`, không tự bọc `Box flex`.

## Input

- Phần bắt buộc: nền, viền, chữ chính. Có `label`, `helperText`, `errorText`,
  `status="error"`, `clearable`.
- Đúng loại cho đúng việc: một dòng dùng `Input`; tìm kiếm dùng `Input.Search`; dài dùng
  `Input.TextArea`; mã OTP dùng `Input.OTP`.
- Ô bị khoá không hiện nút xoá, helper text, nhãn bắt buộc.
- Đặt `type` / `inputMode` đúng (`tel`, `numeric`) để bàn phím ra đúng loại.
- Ô nhập gần đáy phải không bị bàn phím che.

## Select và Picker

`Select` mở danh sách chọn dạng sheet; dùng `closeOnSelect` cho chọn một, `multiple` cho chọn
nhiều, có `label`, `placeholder`, `errorText`. Trên 30 lựa chọn thì thêm ô lọc trong sheet
hoặc dùng màn tìm kiếm riêng.

## List

- `List.Item`: `title` (bắt buộc), `subTitle`, `prefix` (icon, avatar), `suffix` (giá trị,
  mũi tên, nút nhỏ), `onClick`.
- Dòng bấm được để mở chi tiết thì `suffix` là `zi-chevron-right`.
- `suffix` không nhồi quá hai thứ; nhiều hơn thì đưa xuống dòng dưới hoặc vào Sheet.
- Danh sách dài hơn khoảng 50 dòng: lọc, chia nhóm hoặc tải dần, không dựng hết một lần.
- Có `loading`, `divider`, `noSpacing`.

## Sheet

- Dùng khi cần danh sách lựa chọn hoặc cài đặt mở rộng, hoặc nội dung bổ sung cho màn đang
  xem.
- Chiều cao mở đầu mặc định 50% màn hình; hoặc `autoHeight` ôm nội dung (khi đó không có
  mở rộng / thu gọn). Tối đa = chiều cao màn hình trừ status bar. Thu gọn mặc định 20%.
  Nhiều mức thì `snapPoints`.
- Chưa mở hết cỡ thì không cho cuộn bên trong.
- Padding: trên 10, trái phải dưới 16; tay nắm cách tiêu đề 8; tiêu đề cách nội dung 16
  (nội dung tự có padding thì 0). Bo góc trên 16.
- Sheet bổ sung (không phủ mờ) để người dùng vẫn chạm được nội dung chính; sheet modal có
  `mask`, chạm ngoài để đóng.
- **Không mở Sheet từ một Sheet khác.**

## Modal

- Dùng để xác nhận trước một hành động, hoặc báo thông tin người dùng buộc phải biết. Mức
  ngắt quãng cao, đừng dùng cho thông báo thường (dùng Snackbar).
- Tối đa **2 modal chồng nhau**. Cao tối đa 80% màn hình.
- Cấu tạo: tiêu đề, mô tả, đường kẻ, hành động. Mặc định 1 hành động chính (xanh, hoặc đỏ
  với `danger`), thêm tối đa 2 hành động phụ. Chữ dài không đủ ngang thì `verticalActions`.
- Chạm ngoài để đóng mặc định bật (`maskClosable`).
- Hành động phá huỷ (Xoá, Thoát, Thu hồi, Đăng xuất) dùng nút `danger`.
- Modal có ô nhập: bàn phím mở thì modal cách bàn phím 16px; không đủ chỗ thì phần nội dung
  thành vùng cuộn.
- Popup quảng bá tính năng: 1 nút chính, tối đa 1 nút phụ, mô tả tối đa 3 dòng. Chỉ hiện
  đúng ngữ cảnh, không bật lúc vừa mở app.

## Snackbar

Bọc app bằng `SnackbarProvider`, gọi `openSnackbar({ text, type, duration })`. Dùng cho phản
hồi ngắn sau hành động: đã sao chép, đã lưu, lỗi mạng, tiến độ tải. Không dùng cho thứ cần
người dùng quyết định.

## Spinner

`Spinner` cho vùng nội dung chưa sẵn sàng. Tải lại lần hai thì giữ nội dung cũ và báo nhẹ,
không xoá trắng màn hình. Màn hình trắng hoặc treo là lỗi kiểm duyệt (mục 5.2).
