# Nhận diện Wren

Rút từ giao diện đang chạy (`src/css/app.scss`, `src/pages/`). Đây là hiện trạng được ghi
lại thành luật; chủ dự án đổi nhận diện thì sửa file này trước, rồi sửa `app.scss`.

## Wren là gì

Một bộ tiện ích tra cứu nhỏ trong Zalo: mã bưu chính, giá xăng dầu. Người dùng mở ra, lấy
một con số, rồi đi. Ba tính từ dẫn mọi quyết định: **nhanh, rõ, đáng tin**.

- **Nhanh**: màn đầu là kết quả hoặc ô tìm, không có màn chào. Chạm một lần để sao chép.
- **Rõ**: con số người dùng cần là thứ to và đậm nhất khối. Một màn một việc.
- **Đáng tin**: số liệu luôn kèm nguồn và thời điểm cập nhật. Không số giả, không nhãn
  "Demo".

## Tên và cách gọi

- Tên hiển thị Mini App: `Tra cứu bưu chính và giá xăng By Wren`. Định dạng chuẩn:
  `<Chức năng> By Wren` (hoặc `Wren - <chức năng>`). Không viết "WrenApp", "Mini App", "Zalo"
  trong tên hay tiêu đề (tuân thủ chính sách mục 2.2).
- Mỗi tiện ích mới là một **module** cùng cấp, đặt tên bằng danh từ ngắn: "Mã Bưu Chính",
  "Giá Xăng Dầu".

## Màu

Màu nhấn là **blue-55 `#0068FF`** của ZaUI. Mọi màu đi qua biến trong `app.scss`:

| Biến | Sáng | Tối | Vai |
| --- | --- | --- | --- |
| `--bg-page` | `#f5f6fa` | `#121214` | Nền trang |
| `--bg-card` | `#ffffff` | `#1c1d22` | Nền card, khối |
| `--bg-subtle` | `#f0f4ff` | `#242731` | Nền khối phụ, vùng nhấn nhẹ |
| `--text-primary` | `#141415` | `#f4f5f6` | Chữ chính |
| `--text-secondary` | `#555555` | `#a0a5b0` | Chữ phụ |
| `--text-muted` | `#888888` | `#727680` | Ghi chú |
| `--border-color` | `#e9ebed` | `#2e3036` | Viền, đường kẻ |
| `--chip-blue-bg` / `--chip-blue-color` | `#e6f0ff` / `#0068ff` | `#102a54` / `#52a0ff` | Chip mã chính, hành động |
| `--chip-gray-bg` / `--chip-gray-color` | `#f0f0f0` / `#555555` | `#2a2c32` / `#d1d5db` | Chip mã phụ |
| `--header-grad` | `135deg, #0068ff → #0a4fd6` | `135deg, #132a52 → #0d1a33` | Nền header |

Màu ý nghĩa (dùng cặp nền nhạt + chữ đậm, có bản tối):

- Thành công, giá giảm: nền `#e6f9ed`, chữ `#027a48`; tối nền `#0c331e`, chữ `#34d399`.
- Lỗi, giá tăng: nền `#fee4e2`, chữ `#b42318`; tối nền `#3d1413`, chữ `#f87171`.
- Cần chú ý: nền `#fff4ed`, chữ `#d9480f`; tối nền `#3b190c`, chữ `#ff922b`.

Luật:

- **Xanh Wren chỉ cho hành động và thứ đang chọn.** Không tô xanh cho chữ thường hay viền
  trang trí.
- Màu mới phải thành biến có đủ hai chế độ. Trong JSX không viết mã màu, kể cả cho `Icon`
  (dùng class hoặc `currentColor`).
- Trên gradient header chỉ dùng chữ trắng; chữ phụ trắng 88%.

## Hình khối

- **Header**: gradient xanh, bo hai góc dưới 16px, chứa icon module + tên + nút đổi giao
  diện. Đây là dấu nhận diện duy nhất được phép dùng gradient.
- **Card và khối**: nền `--bg-card`, viền 1px `--border-color`, bo 12px, bóng rất nhẹ
  (`0 1px 4px rgba(0,0,0,.04)`) hoặc không bóng. Không gradient, không bóng đậm.
- **Chip sao chép** (`.copy-chip`): viên nhỏ, icon + chữ, chạm là chép và đổi thành "Đã
  chép" trong 1,5 giây. Xanh cho mã chính, xám cho mã phụ. Đây là tương tác đặc trưng của
  Wren: mọi con số người dùng có thể cần mang đi đều chép được bằng một chạm.
- **Thanh chuyển module**: hai nút ngang ngay dưới header, nút đang chọn nền xanh chữ trắng.
  Khi lên 4 module trở lên thì chuyển sang `BottomNavigation` (xem `zaui-components.md`).
- Bo góc theo thang ZaUI: 4, 8, 12, 16, 9999. Giá trị 6, 10, 14 trong code cũ là nợ, không
  dùng thêm.

## Chữ

- Thang ZaUI qua `Text` và `Text.Title`. Tên Wren trên header là chỗ duy nhất dùng weight
  700.
- **Con số là nhân vật chính**: mã bưu chính, giá, số lít dùng cỡ lớn hơn nhãn của nó ít
  nhất hai bậc, và dùng `font-variant-numeric: tabular-nums` khi xếp cột.
- Cỡ 10–11px trong code cũ chỉ được giữ cho nhãn chip. Nội dung mới không dưới 13px.

## Giọng viết

- Tiếng Việt, câu ngắn, không dấu chấm than, không emoji trong nhãn và nút.
- Nút là động từ: "Tra cứu", "Đổi", "Chép", "Định vị". Không "OK", "Submit".
- Lỗi nói chuyện gì xảy ra và làm gì tiếp, không đổ lỗi: "Không tìm thấy mã bưu chính này.
  Kiểm tra lại quốc gia và mã."
- Bị từ chối quyền thì luôn đưa lối khác: "Bạn vẫn có thể tìm cây xăng theo tên đường hoặc
  tỉnh."
- Số tiền: `25.570 đ`, dấu chấm ngăn nghìn. Số lít: dấu phẩy thập phân. Ngày: `dd/mm/yyyy`.
- Số liệu luôn kèm nguồn và thời điểm: "Cập nhật 15:00 02/10/2026 · Petrolimex".

## Dark mode

Có, người dùng tự bật bằng nút trên header; lựa chọn lưu ở `localStorage`
(`zma_zipcode_theme`) và áp trước khi vẽ (script trong `index.html`) để không nháy. Mọi màn
mới xem ở cả hai chế độ trước khi giao.

## Những thứ Wren không làm

- Màn chào, onboarding nhiều bước, popup lúc mở app.
- Banner quảng cáo, nút dẫn tải ứng dụng khác, link ra ngoài.
- Bắt đăng nhập hay xin quyền để xem nội dung.
- Hoạt ảnh trang trí. Chuyển động chỉ để phản hồi (nhấn, mở sheet, đã chép).
