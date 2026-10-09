/**
 * Test hồi quy cho updater: OCR ảnh bảng giá thật của Petrolimex (thư mục fixtures)
 * và các hàm thuần. Chạy: npm test (trong scripts/gas-updater)
 */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { readPriceTable } = require("./lib/ocr-table");
const { mapAndValidate, normalizeLabel, expectedZone2, parseManualPrices } = require("./lib/products");
const { historyEntry, mergeHistory, addDays, buildFeed } = require("./lib/feed");

// Số liệu chép tay từ ảnh thông cáo Petrolimex
const FIXTURES = {
  "2026-10-01.jpg": {
    ron95_5: [28180, 28740], ron95_3: [27180, 27720], e5_ron92: [26560, 27090],
    diesel_5: [31110, 31730], diesel_2: [29710, 30300], kerosene: [29770, 30360], mazut: [20390, 20790],
  },
  "2026-09-17.jpg": {
    ron95_5: [26830, 27360], ron95_3: [25630, 26140], e5_ron92: [25130, 25630],
    diesel_5: [31740, 32370], diesel_2: [29940, 30530], kerosene: [31470, 32090], mazut: [19190, 19570],
  },
  "2026-08-27.jpg": {
    ron95_5: [24000, 24480], ron95_3: [22600, 23050], e5_ron92: [21760, 22190],
    diesel_5: [29880, 30470], diesel_2: [28080, 28640], kerosene: [26630, 27160], mazut: [18140, 18500],
  },
};

for (const [file, expected] of Object.entries(FIXTURES)) {
  test(`OCR đọc đúng bảng giá ${file}`, { timeout: 180000 }, async () => {
    const rows = await readPriceTable(fs.readFileSync(path.join(__dirname, "fixtures", file)));
    const { prices, errors } = mapAndValidate(rows);
    assert.deepEqual(errors, []);
    for (const [id, [z1, z2]] of Object.entries(expected)) {
      assert.deepEqual(prices[id], { z1, z2 }, id);
    }
  });
}

test("chuẩn hoá tên mặt hàng OCR", () => {
  assert.equal(normalizeLabel("Xăng E10 RON 95-lll Mức 3"), "XANG E10 RON 95-III MUC 3");
  assert.equal(normalizeLabel("Dâu hỏa 2- K"), "DAU HOA 2- K");
});

test("nhận mặt hàng khi OCR đọc chữ S thành số 5", () => {
  // Dòng OCR thật của kỳ 08/10/2026
  const rows = [
    { label: "Xăng E10 RON 95 Mức 5", z1: 29050, z2: 29630 },
    { label: "Xăng E10 RON 95 Mức 3", z1: 28250, z2: 28810 },
    { label: "Xăng E5 RON 92 Mức 2", z1: 27700, z2: 28250 },
    { label: "Điêzen 0,001S Mức 5", z1: 30520, z2: 31130 },
    { label: "Điêzen 0,055 Mức 2", z1: 29120, z2: 29700 },
    { label: "Dâu hỏa 2- K", z1: 30630, z2: 31240 },
    { label: "Dầu Mazut 3,5S", z1: 21090, z2: 21510 },
    { label: "Dầu Mazut 180 0,5S", z1: 27490, z2: 28030 },
  ];
  const { prices, errors } = mapAndValidate(rows);
  assert.deepEqual(errors, []);
  assert.deepEqual(prices.diesel_2, { z1: 29120, z2: 29700 });
  assert.deepEqual(prices.diesel_5, { z1: 30520, z2: 31130 });
  assert.deepEqual(prices.mazut, { z1: 21090, z2: 21510 });
});

test("quy tắc Vùng 2 = Vùng 1 × 1,02 làm tròn xuống 10đ", () => {
  assert.equal(expectedZone2(28180), 28740);
  assert.equal(expectedZone2(29770), 30360);
  assert.equal(expectedZone2(20390), 20790);
});

test("kiểm tra chặn số đọc sai", () => {
  const rows = [
    { label: "Xăng E10 RON 95 Mức 5", z1: 28180, z2: 28740 },
    { label: "Xăng E10 RON 95-III Mức 3", z1: 27130, z2: 27720 }, // đọc nhầm 8 → 3
    { label: "Xăng E5 RON 92-II", z1: null, z2: 27090 },
  ];
  const { errors } = mapAndValidate(rows);
  assert.ok(errors.some((e) => e.startsWith("ron95_3: Vùng 2")));
  assert.ok(errors.some((e) => e.startsWith("e5_ron92: hai lượt OCR")));
  assert.ok(errors.some((e) => e.includes("Thiếu mặt hàng kerosene")));
});

test("giá nhập tay", () => {
  assert.deepEqual(parseManualPrices("ron95_3=27180, diesel_2=29710:30300"), {
    ron95_3: { z1: 27180, z2: 27720 },
    diesel_2: { z1: 29710, z2: 30300 },
  });
  assert.throws(() => parseManualPrices("ron95_3=abc"));
});

test("dòng lịch sử và gộp lịch sử", () => {
  const p = (r, e, d) => ({ ron95_3: { z1: r }, e5_ron92: { z1: e }, diesel_2: { z1: d } });
  const h = historyEntry("01/10/2026", p(27180, 26560, 29710), p(27080, 26390, 30490));
  assert.deepEqual(h, {
    date: "01/10/2026", ron95: 27180, e5: 26560, diesel: 29710, trend: "up",
    note: "Xăng E10 tăng 100đ, Dầu DO giảm 780đ",
  });
  assert.equal(historyEntry("x", p(1, 1, 1), p(1, 1, 1)).trend, "flat");
  const merged = mergeHistory([{ date: "24/09/2026" }, { date: "17/09/2026" }], [h]);
  assert.deepEqual(merged.map((x) => x.date), ["01/10/2026", "24/09/2026", "17/09/2026"]);
  assert.equal(addDays("29/09/2026", 7), "06/10/2026");
});

test("dựng feed giữ metadata, tính chênh lệch", () => {
  const current = {
    updateInfo: { effectiveDate: "24/09/2026", announcedBy: "Petrolimex" },
    products: [
      { id: "ron97", name: "RON 97", priceZone1: 29500, priceZone2: 30090, diff: 0, diffPercent: 0 },
      { id: "ron95_3", name: "E10", badge: "Phổ biến nhất", priceZone1: 27080, priceZone2: 27620, diff: -110, diffPercent: -0.4 },
    ],
    history: [],
  };
  const feed = buildFeed({
    current,
    release: { date: "01/10/2026", time: "15:00", url: "https://x" },
    prices: { ron95_3: { z1: 27180, z2: 27720 } },
    prevPrices: { ron95_3: { z1: 27080, z2: 27620 } },
    history: [],
    source: {},
  });
  const e10 = feed.products.find((p) => p.id === "ron95_3");
  assert.equal(e10.badge, "Phổ biến nhất");
  assert.equal(e10.diff, 100);
  assert.equal(e10.diffPercent, 0.37);
  assert.equal(feed.products[0].priceZone1, 29500);
  assert.equal(feed.updateInfo.nextExpectedDate, "08/10/2026");
  assert.equal(feed.updateInfo.announcedBy, "Petrolimex");
});
