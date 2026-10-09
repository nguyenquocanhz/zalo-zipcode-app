/**
 * Ghép dòng OCR với mã sản phẩm của app, và kiểm tra số liệu trước khi xuất bản.
 * Thà dừng và giữ giá cũ còn hơn đăng một con số đọc sai.
 */

// Tên trong bảng Petrolimex đổi theo từng kỳ ("E10 RON 95-V" ↔ "E10 RON 95 Mức 5"), nên nhận theo từ khoá.
// OCR hay đọc "III" thành "lll" / "lIl", nên chuẩn hoá trước khi so; chữ "S" cuối hay bị đọc thành "5" ("0,05S" → "0,055").
const MATCHERS = [
  { id: "ron95_5", test: (s) => /RON ?95/.test(s) && (/95 ?- ?V\b/.test(s) || /MUC ?5/.test(s)) },
  { id: "ron95_3", test: (s) => /RON ?95/.test(s) && (/95 ?- ?III/.test(s) || /MUC ?3/.test(s)) },
  { id: "e5_ron92", test: (s) => /E5/.test(s) && /92/.test(s) },
  { id: "diesel_5", test: (s) => /0[,.]001/.test(s) },
  { id: "diesel_2", test: (s) => /0[,.]05 ?[S5]/.test(s) },
  { id: "kerosene", test: (s) => /DAU HOA/.test(s) },
  { id: "mazut", test: (s) => /MAZUT/.test(s) && /(2B|3[,.]5 ?[S5])/.test(s) && !/180/.test(s) },
];

const REQUIRED_IDS = MATCHERS.map((m) => m.id);
const PRICE_MIN = 10000;
const PRICE_MAX = 60000;

function normalizeLabel(label) {
  return label
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[đĐ]/g, "D")
    .toUpperCase()
    .replace(/[|]/g, "I")
    .replace(/\b([IL1]{3})\b/g, "III")
    .replace(/-([IL1]{3})/g, "-III")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Giá Vùng 2 của Petrolimex = giá Vùng 1 × 1,02, làm tròn xuống tới 10 đồng.
 * Đúng cho mọi mặt hàng ở các kỳ đã đối chiếu, nên dùng làm phép thử chéo cho OCR.
 */
function expectedZone2(z1) {
  return Math.floor((z1 * 1.02) / 10) * 10;
}

/**
 * @param rows kết quả readPriceTable
 * @returns {{ prices: Record<string,{z1:number,z2:number}>, errors: string[] }}
 */
function mapAndValidate(rows) {
  const prices = {};
  const errors = [];

  for (const row of rows) {
    const label = normalizeLabel(row.label);
    const hits = MATCHERS.filter((m) => m.test(label));
    if (hits.length === 0) continue;
    if (hits.length > 1) {
      errors.push(`Dòng "${row.label}" khớp nhiều mặt hàng: ${hits.map((h) => h.id).join(", ")}`);
      continue;
    }
    const { id } = hits[0];
    if (prices[id]) {
      errors.push(`Mặt hàng ${id} xuất hiện hai lần ("${row.label}")`);
      continue;
    }
    prices[id] = { z1: row.z1, z2: row.z2, label: row.label };
  }

  for (const id of REQUIRED_IDS) {
    const p = prices[id];
    if (!p) {
      errors.push(`Thiếu mặt hàng ${id} trong bảng giá`);
      continue;
    }
    if (p.z1 === null || p.z2 === null) {
      errors.push(`${id}: hai lượt OCR đọc ra hai số khác nhau ("${p.label}")`);
      continue;
    }
    for (const v of [p.z1, p.z2]) {
      if (v < PRICE_MIN || v > PRICE_MAX || v % 10 !== 0) errors.push(`${id}: giá ${v} ngoài khoảng hợp lệ`);
    }
    if (Math.abs(p.z2 - expectedZone2(p.z1)) > 10) {
      errors.push(`${id}: Vùng 2 = ${p.z2} không khớp Vùng 1 = ${p.z1} (mong đợi ~${expectedZone2(p.z1)})`);
    }
  }

  const clean = {};
  for (const [id, p] of Object.entries(prices)) clean[id] = { z1: p.z1, z2: p.z2 };
  return { prices: clean, errors };
}

/** "ron95_3=27180,e5_ron92=26560:27090" → giá nhập tay; thiếu Vùng 2 thì tính theo quy tắc ×1,02 */
function parseManualPrices(spec) {
  const prices = {};
  for (const part of spec.split(",").map((s) => s.trim()).filter(Boolean)) {
    const m = /^([a-z0-9_]+)=(\d{4,5})(?::(\d{4,5}))?$/.exec(part);
    if (!m) throw new Error(`Không hiểu giá nhập tay "${part}" (dạng đúng: ron95_3=27180 hoặc ron95_3=27180:27720)`);
    const z1 = Number(m[2]);
    prices[m[1]] = { z1, z2: m[3] ? Number(m[3]) : expectedZone2(z1) };
  }
  return prices;
}

module.exports = { mapAndValidate, normalizeLabel, expectedZone2, parseManualPrices, REQUIRED_IDS };
