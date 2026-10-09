---
name: wren-ux-ui
description: Gu UI/UX thương hiệu Wren cho Zalo Mini App dựng bằng ZaUI (zmp-ui). Phối hợp với skill evon:ui-ux - evon lo quy trình thiết kế (brief, wireframe, phạm vi, trạng thái), skill này lo luật nền tảng ZaUI (token màu, chữ, khoảng cách, bo góc, 4 tầng layer, Header, BottomNavigation, Tabs, Sheet, Modal, Button), nhận diện Wren và cổng kiểm duyệt + LCP của Zalo. Dùng khi dựng, làm lại, soi hoặc sửa giao diện Mini App, thêm màn hay component zmp-ui, hoặc khi nhắc "wren", "ZaUI", "zmp-ui", "mini app UI", "làm màn", "dựng tab", "sửa giao diện", "cho đẹp", "chuẩn Zalo".
---

# Wren UX/UI — ZaUI cho Zalo Mini App

Skill này không thay `evon:ui-ux`, nó **đặt evon lên nền Zalo Mini App**. Evon viết cho
dashboard web; Mini App là một cột 375px chạy trong webview của Zalo, có thư viện component
riêng và có người kiểm duyệt. Chỗ nào hai bên lệch nhau thì file này nói bên nào thắng.

## 0. Thứ tự làm việc

1. **Gọi `evon:ui-ux` trước** (Skill tool) và đi đúng câu 1 của nó để chọn lối: designer
   (mặc định), soi UI, giữ brand, refactor, dựng luôn, việc nhỏ. Hai cổng chờ của evon
   (duyệt brief, chọn wireframe) giữ nguyên.
2. **Audit câu 2 của evon đã có sẵn kết quả cho dự án Wren**, chỉ chạy lại tầng 2 (component
   sắp dựng đã có chưa) rồi báo dòng `Audit:`:
   > Audit: React 18 + Vite + `zmp-ui` (ZaUI), không Tailwind, style ở `src/css/app.scss`
   > bằng biến CSS. Phong cách: Wren (header gradient xanh, card viền mảnh), có dark mode.
3. **Mở đúng reference của skill này** theo bảng mục 3, rồi mới dựng.
4. **Trước khi báo xong** chạy mục 4 (cổng nền tảng). Evon bắt probe ở 375px; ở đây 375px là
   bề rộng **chính**, không phải ca biên.

Dự án khác Wren nhưng cũng là Mini App ZaUI: vẫn dùng skill này, bỏ `references/wren-brand.md`
và chạy đủ audit ba tầng của evon.

## 1. Ai thắng khi lệch nhau

Thứ tự ưu tiên, trên đè dưới:

1. **Chính sách kiểm duyệt Zalo** và ngưỡng hiệu suất (`references/platform-gates.md`).
2. **Spec ZaUI** (`references/zaui-foundation.md`, `references/zaui-components.md`).
3. **Nhận diện Wren** (`references/wren-brand.md`).
4. **Gu và luật của `evon:ui-ux`**.

Những chỗ đè cụ thể lên evon:

| Evon nói | Trong Mini App Wren |
| --- | --- |
| Tailwind là mặc định, class Tailwind trong luật | Không Tailwind. Dịch sang biến CSS trong `app.scss` và token ZaUI. Đây là dòng "không có Tailwind" + "dùng component của họ" trong câu 2 của evon |
| Dựng component từ `references/components/` của evon | **Dùng `zmp-ui` trước.** Chỉ mượn khuôn evon khi ZaUI không có (chip, badge, empty state, timeline, biểu đồ), và tô bằng token ZaUI |
| Bố cục app: sidebar, bảng, nhiều cột | Một cột. Sidebar thành `BottomNavigation` hoặc thanh module; bảng thành `List`; panel trượt và dropdown thành `Sheet` |
| Thang chữ, nhịp khoảng cách trong `budgets.md` | Thang ZaUI: chữ 10–22px qua `Text` / `Text.Title`, khoảng cách bội số 4px, bo 4/8/12/16/9999 |
| Phong cách mặc định flat, không bóng | Phong cách dự án là Wren (evon `P1`: theo phong cách dự án). Header gradient và bóng nhẹ ở card là có chủ đích |
| Dark mode mặc định không làm (`M20`) | **Có làm.** Mọi màu mới phải có cặp sáng/tối trong `app.scss` |
| Font: chỉ ra chỗ đổi font | Không đặt `font-family`. ZaUI dùng font hệ thống, và chữ hệ thống cho LCP Load Time bằng 0 |
| Ảnh mẫu Unsplash cho mockup (`S16`) | Không nhúng ảnh ngoài vào bản build. Ảnh thật để trong dự án, WEBP, có kích thước cố định |
| Skill không tự viết logic | Giữ nguyên, **trừ** luật ngữ cảnh xin quyền ở `platform-gates.md`: nó là UI, phải dựng đúng |

Evon vẫn thắng ở mọi thứ không nằm trong bảng: luật phạm vi `S1`–`S15`, mười hai nguyên tắc
`N`, luật trạng thái `I` (rỗng, đang tải, lỗi, khoá), copy `T`, và việc báo các mặc định lúc
giao.

## 2. Năm luật luôn áp dụng

- **W1. Component ZaUI trước, HTML trần sau.** `Button`, `Input`, `Select`, `List`, `Sheet`,
  `Modal`, `Tabs`, `Text`, `Icon`, `Spinner`, `useSnackbar`. Nút `<button>` tự dựng chỉ cho
  thứ ZaUI không có (chip, nút chuyển module) và phải có trạng thái `:active`.
- **W2. Không mã màu cứng trong JSX.** Màu đi qua biến CSS của `app.scss`; biến mới thì khai
  cả `:root` lẫn khối dark. `style={{ color: "#0068ff" }}` là vi phạm, kể cả với icon.
- **W3. Mỗi màn một việc chính, một nút Primary.** Một `Button` primary cho mỗi màn hoặc mỗi
  nhóm nút; còn lại secondary / tertiary. Nhóm ngang thì primary bên phải, nhóm dọc thì
  primary trên cùng.
- **W4. Đúng tầng.** Nội dung (1) < header, điều hướng (2) < overlay (3) < action sheet (4).
  Không mở Sheet từ Sheet, không chồng quá 2 Modal.
- **W5. Vùng chạm tối thiểu 44px, không hover.** Mọi phản hồi là `:active` hoặc trạng thái
  `loading` của component. Chừa `env(safe-area-inset-bottom)` cho thứ dính đáy.

## 3. Mở reference nào khi nào

| Cần | Mở |
| --- | --- |
| Màu, chữ, khoảng cách, bo góc, bóng, tầng, icon, logo | `references/zaui-foundation.md` |
| Chọn và dùng component `zmp-ui`, quy tắc Header / BottomNavigation / Tabs / Sheet / Modal / Button / Input | `references/zaui-components.md` |
| Màu nhấn, header, card, chip, giọng copy, dark mode của Wren | `references/wren-brand.md` |
| Trước khi giao: kiểm duyệt, xin quyền, liên kết ngoài, LCP | `references/platform-gates.md` |
| Quy trình, phạm vi, trạng thái, copy | skill `evon:ui-ux` và references của nó |

## 4. Trước khi báo xong

- [ ] Đã đi đúng lối của evon (brief và wireframe nếu là lối mặc định), không dựng thẳng.
- [ ] Mọi control là `zmp-ui` hoặc có lý do ghi lúc giao (W1).
- [ ] Không còn mã màu cứng mới trong JSX; biến mới có cặp sáng/tối (W2).
- [ ] Xem ở 375px cả sáng lẫn tối, không cuộn ngang, nút đáy không bị che.
- [ ] Mỗi màn có trạng thái rỗng, đang tải, lỗi (evon nhóm `I`).
- [ ] Qua hết `references/platform-gates.md`: không link ngoài, không xin quyền lúc mở app,
      không nhãn "Demo", màn đầu không kéo thêm bundle.
- [ ] `npm run build` chạy được; `npm run audit` không có lỗi đỏ.
- [ ] Lúc giao nói các mặc định đã chọn (evon `S15`) và luật nào của evon đã bị đè.

## 5. Sửa skill này

Theo mục 4 của evon: mỗi luật một chỗ, tối đa 5 luật mới mỗi đợt, luật mới ghi rõ nó đè luật
nào. Số liệu ZaUI lấy từ <https://docs.zaloplatforms.com/docs/MA/zaui>; tài liệu đổi thì sửa
`references/zaui-*.md`, không chép số vào `SKILL.md`.
