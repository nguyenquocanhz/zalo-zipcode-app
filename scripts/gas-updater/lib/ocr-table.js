/**
 * OCR ảnh bảng giá Petrolimex.
 *
 * Ảnh là bảng kẻ ô (Mặt hàng | Đơn vị | Vùng 1 | Vùng 2). OCR cả ảnh một lượt đọc sai nhiều
 * vì đường kẻ và chữ đậm, nên ở đây dò lưới bảng theo pixel, cắt từng ô rồi mới OCR:
 * cột tên đọc bằng mô hình tiếng Việt, hai cột giá chỉ nhận chữ số.
 * Mỗi ô giá đọc hai lượt với hai ngưỡng khác nhau, hai lượt phải ra cùng một số.
 */
const os = require("os");
const path = require("path");
const sharp = require("sharp");
const { createWorker, PSM } = require("tesseract.js");

const CACHE_PATH = path.join(os.tmpdir(), "wrenapp-tessdata");
const DARK = 140; // pixel tối hơn mức này tính là nét mực
const MIN_ROW_HEIGHT = 15;
const PRICE_THRESHOLDS = [150, 110];

/** Gom các vị trí liên tiếp vượt ngưỡng thành một đường kẻ, trả về toạ độ giữa đường */
function findLines(fractions, minFraction) {
  const lines = [];
  let start = -1;
  fractions.forEach((v, i) => {
    const on = v >= minFraction;
    if (on && start < 0) start = i;
    if (start >= 0 && (!on || i === fractions.length - 1)) {
      const end = on ? i : i - 1;
      lines.push(Math.round((start + end) / 2));
      start = -1;
    }
  });
  return lines;
}

async function detectGrid(image) {
  const { data, info } = await sharp(image).greyscale().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const col = new Array(W).fill(0);
  const row = new Array(H).fill(0);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (data[y * W + x] < DARK) {
        col[x]++;
        row[y]++;
      }
    }
  }
  const vLines = findLines(col.map((c) => c / H), 0.5);
  const hLines = findLines(row.map((c) => c / W), 0.6);
  if (vLines.length < 4) throw new Error(`Không dò được cột bảng giá (thấy ${vLines.length} đường dọc)`);
  if (hLines.length < 4) throw new Error(`Không dò được hàng bảng giá (thấy ${hLines.length} đường ngang)`);
  return { width: W, height: H, vLines, hLines };
}

async function cellImage(image, box, threshold, scale = 3) {
  const inset = 3;
  const left = box.x0 + inset;
  const top = box.y0 + inset;
  const width = box.x1 - box.x0 - inset * 2;
  const height = box.y1 - box.y0 - inset * 2;
  return sharp(image)
    .extract({ left, top, width, height })
    .greyscale()
    .resize({ width: width * scale })
    .threshold(threshold)
    .extend({ top: 20, bottom: 20, left: 20, right: 20, background: "#ffffff" })
    .png()
    .toBuffer();
}

const toPrice = (text) => {
  const digits = text.replace(/\D/g, "");
  return /^\d{4,5}$/.test(digits) ? Number(digits) : null;
};

/**
 * @returns {Promise<Array<{ label: string, z1: number|null, z2: number|null, raw: string[] }>>}
 */
async function readPriceTable(image) {
  const grid = await detectGrid(image);
  const labelWorker = await createWorker("vie", 1, { cachePath: CACHE_PATH });
  await labelWorker.setParameters({ tessedit_pageseg_mode: PSM.SINGLE_LINE });
  const numberWorker = await createWorker("eng", 1, { cachePath: CACHE_PATH });
  await numberWorker.setParameters({
    tessedit_pageseg_mode: PSM.SINGLE_LINE,
    tessedit_char_whitelist: "0123456789.,",
  });

  const { vLines, hLines } = grid;
  const labelCol = { x0: vLines[0], x1: vLines[1] };
  const priceCols = [
    { x0: vLines[vLines.length - 3], x1: vLines[vLines.length - 2] },
    { x0: vLines[vLines.length - 2], x1: vLines[vLines.length - 1] },
  ];

  const rows = [];
  try {
    for (let r = 0; r + 1 < hLines.length; r++) {
      const y0 = hLines[r];
      const y1 = hLines[r + 1];
      if (y1 - y0 < MIN_ROW_HEIGHT + 6) continue;

      const label = (await labelWorker.recognize(await cellImage(image, { ...labelCol, y0, y1 }, 150))).data.text
        .replace(/\s+/g, " ")
        .trim();

      const prices = [];
      const raw = [];
      for (const colBox of priceCols) {
        const reads = [];
        for (const t of PRICE_THRESHOLDS) {
          const text = (await numberWorker.recognize(await cellImage(image, { ...colBox, y0, y1 }, t))).data.text.trim();
          raw.push(text);
          reads.push(toPrice(text));
        }
        // Hai lượt OCR phải khớp nhau, lệch là coi như không đọc được
        prices.push(reads.every((v) => v !== null && v === reads[0]) ? reads[0] : null);
      }
      rows.push({ label, z1: prices[0], z2: prices[1], raw });
    }
  } finally {
    await labelWorker.terminate();
    await numberWorker.terminate();
  }
  return rows;
}

module.exports = { readPriceTable, detectGrid };
