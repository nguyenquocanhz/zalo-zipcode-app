/**
 * Đối chiếu chéo với bảng HTML của LuatVietnam (3 mặt hàng chính, Vùng 1).
 * Nguồn độc lập với ảnh Petrolimex: cùng kỳ mà lệch số là OCR đọc sai, phải dừng.
 */
const { fetchText } = require("./http");

const URL = "https://luatvietnam.vn/bang-gia-xang-dau-hom-nay.html";
const NAME_TO_ID = [
  { re: /E10 RON 95-III/i, id: "ron95_3" },
  { re: /E5 RON 92/i, id: "e5_ron92" },
  { re: /DO 0,05S/i, id: "diesel_2" },
];

/** @returns {Promise<{ date: string, prices: Record<string, number> } | null>} */
async function fetchLuatVietnam() {
  const html = await fetchText(URL, { retries: 1 });
  // Bảng đầu tiên: "Giá điều chỉnh ngày 01/10/2026"
  const head = /Giá điều chỉnh ngày (\d{2}\/\d{2}\/\d{4})/.exec(html);
  if (!head) return null;
  const table = html.slice(head.index, html.indexOf("</table>", head.index));
  const prices = {};
  for (const m of table.matchAll(/<td>([^<]+)<td class=text-right>([\d.]+)/g)) {
    const hit = NAME_TO_ID.find((n) => n.re.test(m[1]));
    if (hit) prices[hit.id] = Number(m[2].replace(/\./g, ""));
  }
  return Object.keys(prices).length ? { date: head[1], prices } : null;
}

/** @returns {{ status: "ok"|"skipped"|"mismatch", detail: string }} */
async function crossCheck(date, prices) {
  let ref;
  try {
    ref = await fetchLuatVietnam();
  } catch (err) {
    return { status: "skipped", detail: `không tải được LuatVietnam: ${err.message}` };
  }
  if (!ref) return { status: "skipped", detail: "không đọc được bảng LuatVietnam" };
  if (ref.date !== date) return { status: "skipped", detail: `LuatVietnam đang ở kỳ ${ref.date}, chưa phải ${date}` };

  const diffs = Object.entries(ref.prices)
    .filter(([id, v]) => prices[id] && prices[id].z1 !== v)
    .map(([id, v]) => `${id}: OCR ${prices[id].z1} ≠ LuatVietnam ${v}`);
  return diffs.length
    ? { status: "mismatch", detail: diffs.join("; ") }
    : { status: "ok", detail: `khớp ${Object.keys(ref.prices).length} mặt hàng với LuatVietnam` };
}

module.exports = { crossCheck, fetchLuatVietnam };
