# ZaUI Foundation

Nguồn: <https://docs.zaloplatforms.com/docs/MA/zaui> (mục Foundation). ZaUI là bản rút gọn
của ZDS, design system của Zalo.

## Màu

Mười họ màu, mỗi họ 15 bậc `10 15 20 25 30 40 50 55 60 70 80 85 90 95 100`. Bậc **55 là màu
chính** của họ, 60 là bậc nhấn giữ, 10–20 là nền nhạt, 70–85 là chữ trên nền nhạt.

| Họ | 10 (nền) | 20 | 55 (chính) | 60 (nhấn) | 70 |
| --- | --- | --- | --- | --- | --- |
| blue | `#F0F7FF` | `#C7E0FF` | `#0068FF` | `#005AE0` | `#0045AD` |
| green | `#ECF9F0` | `#D1F0DB` | `#3EBB6C` | `#32A458` | `#258344` |
| red | `#FFF0F0` | `#FFC7C7` | `#F50000` | `#DB0000` | `#AD0000` |
| orange | `#FFF6F0` | `#FFDDC7` | `#FF6905` | `#E05A00` | `#AD4500` |
| yellow | `#FFFBF0` | `#FFF2C7` | `#FAC000` | `#E0A000` | `#AD8500` |
| skyblue | `#F0FBFF` | `#C7F1FF` | `#00BCFA` | `#00A8E0` | `#0082AD` |
| teal | `#F1FEFD` | `#CAFCF9` | `#08E7DC` | `#07D5CA` | `#04A9A1` |
| steelblue | `#F1F4F8` | `#D9E2ED` | `#507FB4` | `#426D9E` | `#32547B` |
| purple | `#F6F3FC` | `#DDD2F4` | `#6937CD` | `#5A2DB4` | `#452388` |
| pink | `#FEF0FB` | `#FCCAF2` | `#E90CBC` | `#D50BAD` | `#A50986` |

Trung tính `gray`: 10 `#F7F7F8`, 15 `#EBEDEF`, 20 `#E0E3E5`, 25 `#D3D6DA`, 30 `#C2C7CB`,
40 `#A9ADB2`, 50 `#909498`, 55 `#808285`, 60 `#6F7071`, 70 `#575757`, 80 `#3D3D3D`,
85 `#2E2E2E`, 90 `#212121`, 95 `#171717`, 100 `#0D0D0D`.

Quy tắc dùng:

- **Vai, không phải sắc.** Xanh = hành động và đang chọn; đỏ = lỗi và phá huỷ; xanh lá =
  thành công, giá giảm; cam/vàng = cần chú ý, giá tăng. Không dùng họ màu để trang trí.
- **Cặp nền–chữ cùng họ**: nền bậc 10–20, chữ bậc 60–70 (badge, chip, banner). Chế độ tối
  đảo lại: nền bậc 90–95, chữ bậc 40–50.
- Cần đủ thang trong code thì `npm install zaui-tokens`, rồi
  `@import "zaui-tokens/variables.css"` (biến dạng `--colors-blue-primary`). Chưa cài thì
  khai biến trong `app.scss` bằng mã ở bảng trên, đừng tự chọn mã ngoài thang.

## Chữ

Không có font riêng: iOS dùng SF Pro, Android dùng Roboto. **Không đặt `font-family`.**

Tiêu đề (`<Text.Title size>`), weight 500, cho banner, popup, bottom sheet, tên màn:

| size | px / line-height (theo tài liệu) |
| --- | --- |
| `xLarge` | 22 / 26 |
| `normal` | 18 / 24 |
| `small` | 15 / 20 |

`Text.Title` còn nhận `size="large"`, tài liệu không ghi số. Bản `zmp-ui` 1.11.14 đang cài
vẽ `normal` ở 16/22 và `small` ở 15/22 (`.zaui-text-header-*` trong `zaui.css`), lệch với
bảng trên. Chọn `size` theo vai (tên màn, tên khối), đừng ghi đè cỡ chữ bằng CSS để ép cho
khớp tài liệu.

Thân bài (`<Text size>`), weight 400, thêm `bold` thành 500:

| size | px / line-height | Dùng cho |
| --- | --- | --- |
| `xLarge` | 18 / 24 | Số liệu lớn, giá |
| `large` | 16 / 22 | Nội dung nhấn |
| `normal` | 15 / 20 | **Mặc định** thân bài, tiêu đề dòng List |
| `small` | 14 / 18 | Mô tả phụ |
| `xSmall` | 13 / 18 | Ghi chú, subtitle |
| `xxSmall` | 12 / 16 | Nhãn chip, badge |
| `xxxSmall` | 11 / 16 | Chú thích nhỏ nhất còn đọc được |
| `xxxxSmall` | 10 / 14 | Chỉ cho số trong badge |

Luật: chữ người dùng phải đọc để ra quyết định không nhỏ hơn 13px. Không dùng cỡ lẻ
(10.5, 11.5, 13.5). Weight chỉ 400 và 500; 600–700 dành cho tên thương hiệu trên header.

## Khoảng cách

Bội số của 4: `U1` 4, `U2` 8, `U3` 12, `U4` 16, `U5` 20, `U6` 24, `U7` 28, `U8` 32, `U9` 36,
`U10` 40. Prop khoảng cách của `Box` (`p`, `m`, `px`, `mt`…) nhận đúng đơn vị này: `p={4}` là
16px.

- Lề trang trái phải: 16px (`U4`).
- Giữa hai khối: 12–16px. Trong một khối: 8–12px. Icon với chữ: 4–8px.
- Không dùng số ngoài thang (5, 6, 10, 14).

## Bo góc

| Token | px | Dùng cho |
| --- | --- | --- |
| `corner_04` | 4 | Badge nhỏ, tag |
| `corner_08` | 8 | Ô nhập, nút nhỏ, chip chữ nhật |
| `corner_12` | 12 | Card, khối nội dung |
| `corner_16` | 16 | Sheet, modal, banner lớn |
| `corner_100` | 9999 | Chip viên thuốc, avatar, nút tròn |

Bo lồng nhau: bo trong = bo ngoài − padding, không nhỏ hơn 4.

## Bóng

Hai loại, chỉ hai:

- **Bottom**: bóng dưới vật thể, dùng cho hầu hết trường hợp (card nổi, nút nổi).
- **Top**: bóng phía trên, để tách thứ dính đáy không dùng được bóng dưới (bottom sheet,
  thanh nút dính đáy, `BottomNavigation`).

Bóng nói "thứ này nằm tầng trên", không dùng để trang trí card phẳng.

## Tầng (Level Specification)

| Level | Chứa | Ghi chú |
| --- | --- | --- |
| 1 | Nội dung chính | Cuộn được |
| 2 | Header, điều hướng (BottomNavigation, Tabs dính) | Cố định, luôn trên nội dung |
| 3 | Overlay: Modal, Snackbar, lớp phủ mờ | Chặn tương tác bên dưới (trừ Snackbar) |
| 4 | Action Sheet, Sheet | Trên cùng |

Đặt `zIndex` theo tầng, không rải số tuỳ hứng. Thứ thuộc tầng thấp không bao giờ đè tầng cao.

## Icon

Dùng `<Icon icon="zi-..." />` của `zmp-ui`. Tên dạng `zi-<tên>` và `zi-<tên>-solid`.

- **Nét (outline) cho trạng thái thường, `-solid` cho đang chọn.** Ví dụ tab đang mở dùng
  `zi-location-solid`, tab khác dùng `zi-location`.
- Nhóm hay dùng: mũi tên (`zi-chevron-right`, `zi-arrow-left`, `zi-retry`), cơ bản
  (`zi-search`, `zi-close`, `zi-check`, `zi-copy`, `zi-filter`, `zi-setting`, `zi-home`,
  `zi-more-grid`, `zi-plus`), thời gian (`zi-calendar`, `zi-clock-1`), vị trí
  (`zi-location`), trạng thái (`zi-check-circle`, `zi-close-circle`, `zi-warning-circle`).
- Tra đủ bộ ở trang Icons của tài liệu trước khi dùng tên mới. Tên sai thì icon hiện ra
  thành chữ (`zi_poll`).
- Cỡ: 16 trong dòng chữ, 20–24 đứng riêng hoặc trong List. Không dùng emoji thay icon.
- Màu icon đi theo `currentColor` hoặc biến CSS, không ghi mã màu.

## Logo Mini App

Bo góc logo = 20% bề rộng (60px bo 12, 80px bo 16). Nền đặc, không trong suốt, không chứa số
điện thoại hay mã QR.
