/**
 * Dựng file gas-price-latest.json từ dữ liệu hiện có và giá kỳ mới.
 * Giữ nguyên tên, badge, mô tả của từng sản phẩm; chỉ thay giá, chênh lệch và thông tin kỳ.
 */
const HISTORY_LIMIT = 12;

const formatVnd = (n) => Math.abs(n).toLocaleString("vi-VN");
const round2 = (n) => Math.round(n * 100) / 100;

function dateKey(ddmmyyyy) {
  const [d, m, y] = ddmmyyyy.split("/").map(Number);
  return Date.UTC(y, m - 1, d);
}

function addDays(ddmmyyyy, days) {
  const t = new Date(dateKey(ddmmyyyy) + days * 86400000);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(t.getUTCDate())}/${pad(t.getUTCMonth() + 1)}/${t.getUTCFullYear()}`;
}

function changeText(label, diff) {
  if (diff === 0) return `${label} giữ nguyên`;
  return `${label} ${diff > 0 ? "tăng" : "giảm"} ${formatVnd(diff)}đ`;
}

/** Một dòng lịch sử: so giá kỳ này với kỳ liền trước */
function historyEntry(date, prices, prevPrices) {
  const d95 = prices.ron95_3.z1 - prevPrices.ron95_3.z1;
  const dDo = prices.diesel_2.z1 - prevPrices.diesel_2.z1;
  return {
    date,
    ron95: prices.ron95_3.z1,
    e5: prices.e5_ron92.z1,
    diesel: prices.diesel_2.z1,
    // Xu hướng theo xăng E10 RON 95-III, mặt hàng phổ biến nhất
    trend: d95 > 0 ? "up" : d95 < 0 ? "down" : "flat",
    note: `${changeText("Xăng E10", d95)}, ${changeText("Dầu DO", dDo)}`,
  };
}

function mergeHistory(existing, added) {
  const byDate = new Map((existing || []).map((h) => [h.date, h]));
  for (const h of added) byDate.set(h.date, h);
  return [...byDate.values()].sort((a, b) => dateKey(b.date) - dateKey(a.date)).slice(0, HISTORY_LIMIT);
}

/**
 * @param current    nội dung gas-price-latest.json hiện tại
 * @param release    { date, time, url }
 * @param prices     giá kỳ mới { id: { z1, z2 } }
 * @param prevPrices giá kỳ liền trước, để tính chênh lệch
 * @param history    các dòng lịch sử mới cần thêm
 * @param source     metadata nguồn (ảnh, phương thức)
 */
function buildFeed({ current, release, prices, prevPrices, history, source }) {
  const products = current.products.map((p) => {
    const next = prices[p.id];
    if (!next) return p; // mặt hàng không có trong thông cáo giữ nguyên
    const prev = prevPrices && prevPrices[p.id];
    const diff = prev ? next.z1 - prev.z1 : 0;
    return {
      ...p,
      priceZone1: next.z1,
      priceZone2: next.z2,
      diff,
      diffPercent: prev ? round2((diff / prev.z1) * 100) : 0,
    };
  });

  return {
    ...current,
    version: "1.1",
    updatedAt: new Date().toISOString(),
    updateInfo: {
      ...current.updateInfo,
      effectiveDate: release.date,
      effectiveTime: `${release.time}:00`,
      nextExpectedDate: addDays(release.date, 7),
      status: "Áp dụng kỳ mới nhất",
      sourceUrl: release.url,
    },
    products,
    history: mergeHistory(current.history, history),
    source,
  };
}

module.exports = { buildFeed, historyEntry, mergeHistory, addDays, dateKey };
