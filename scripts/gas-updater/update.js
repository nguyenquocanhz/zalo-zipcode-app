#!/usr/bin/env node
/**
 * WrenApp - Tự động cập nhật giá xăng dầu
 *
 * Nguồn: thông cáo báo chí điều chỉnh giá của Petrolimex (petrolimex.com.vn).
 * Bảng giá trong thông cáo là ảnh, nên script OCR từng ô của bảng, kiểm tra chéo
 * (2 lượt OCR, quy tắc Vùng 2 = Vùng 1 × 1,02, bảng HTML của LuatVietnam), rồi mới ghi
 * gas-price-latest.json. Kiểm tra không qua thì dừng với mã lỗi 1 và giữ nguyên giá cũ.
 *
 *   node update.js                 cập nhật nếu có kỳ mới
 *   node update.js --dry-run       chạy thử, in kết quả, không ghi file
 *   node update.js --force         chạy lại kể cả khi đã là kỳ mới nhất
 *   node update.js --manual "ron95_3=27180,e5_ron92=26560" --date 01/10/2026
 *                                  nhập tay khi OCR hỏng (thiếu Vùng 2 thì tính ×1,02)
 *   --file <đường dẫn>             file feed (mặc định: gas-price-latest.json ở gốc dự án)
 *   --history <n>                  bảo đảm lịch sử có đủ n kỳ gần nhất (mặc định 6)
 */
const fs = require("fs");
const path = require("path");
const { listReleases, getPriceImageUrl } = require("./lib/petrolimex");
const { fetchBuffer } = require("./lib/http");
const { readPriceTable } = require("./lib/ocr-table");
const { mapAndValidate, parseManualPrices } = require("./lib/products");
const { crossCheck } = require("./lib/crosscheck");
const { buildFeed, historyEntry, dateKey } = require("./lib/feed");

const ROOT = path.resolve(__dirname, "..", "..");

function parseArgs(argv) {
  const args = { dryRun: false, force: false, file: path.join(ROOT, "gas-price-latest.json"), history: 6 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--force") args.force = true;
    else if (a === "--file") args.file = path.resolve(next());
    else if (a === "--history") args.history = Number(next());
    else if (a === "--manual") args.manual = next();
    else if (a === "--date") args.date = next();
    else if (a === "--time") args.time = next();
    else if (a === "--url") args.url = next();
    else throw new Error(`Tham số lạ: ${a}`);
  }
  return args;
}

const log = (...m) => console.log("[gas-updater]", ...m);

function pricesFromFeed(feed, { previous = false } = {}) {
  const out = {};
  for (const p of feed.products) {
    // previous: suy ra giá kỳ trước từ giá hiện tại trừ chênh lệch
    out[p.id] = previous ? { z1: p.priceZone1 - p.diff, z2: p.priceZone2 - p.diff } : { z1: p.priceZone1, z2: p.priceZone2 };
  }
  return out;
}

async function ocrRelease(release) {
  const imageUrl = await getPriceImageUrl(release);
  log(`OCR kỳ ${release.date}: ${imageUrl}`);
  const rows = await readPriceTable(await fetchBuffer(imageUrl));
  const { prices, errors } = mapAndValidate(rows);
  if (errors.length) {
    const err = new Error(`Bảng giá kỳ ${release.date} không qua kiểm tra:\n  - ${errors.join("\n  - ")}`);
    err.rows = rows;
    throw err;
  }
  return { prices, imageUrl };
}

function writeOutputs(file, feed) {
  const json = JSON.stringify(feed, null, 2) + "\n";
  fs.writeFileSync(file, json, "utf8");
  log(`✓ Đã ghi ${path.relative(ROOT, file)}`);
  const www = path.join(ROOT, "www");
  if (path.dirname(file) === ROOT && fs.existsSync(www)) {
    fs.writeFileSync(path.join(www, "gas-price-latest.json"), json, "utf8");
    log("✓ Đã đồng bộ www/gas-price-latest.json");
  }
}

function report(feed, status, extra = []) {
  const changed = status === "updated";
  const label = { updated: "đã cập nhật", unchanged: "không đổi", dry: "chạy thử, chưa ghi" }[status];
  const lines = [
    `### Giá xăng dầu kỳ ${feed.updateInfo.effectiveDate} (${label})`,
    "",
    "| Mặt hàng | Vùng 1 | Vùng 2 | Chênh lệch |",
    "| --- | ---: | ---: | ---: |",
    ...feed.products.map(
      (p) => `| ${p.name} | ${p.priceZone1.toLocaleString("vi-VN")} | ${p.priceZone2.toLocaleString("vi-VN")} | ${p.diff > 0 ? "+" : ""}${p.diff.toLocaleString("vi-VN")} |`
    ),
    "",
    ...extra.map((e) => `- ${e}`),
  ].join("\n");
  console.log("\n" + lines + "\n");
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines + "\n");
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\neffective_date=${feed.updateInfo.effectiveDate}\n`);
}

async function runManual(args, current) {
  if (!args.date || !/^\d{2}\/\d{2}\/\d{4}$/.test(args.date)) throw new Error("--manual cần kèm --date DD/MM/YYYY");
  const given = parseManualPrices(args.manual);
  const unknown = Object.keys(given).filter((id) => !current.products.some((p) => p.id === id));
  if (unknown.length) throw new Error(`Mã sản phẩm không có trong feed: ${unknown.join(", ")}`);

  const sameDate = current.updateInfo.effectiveDate === args.date;
  const prevPrices = pricesFromFeed(current, { previous: sameDate });
  const merged = { ...pricesFromFeed(current), ...given };
  const release = { date: args.date, time: args.time || "15:00", url: args.url || current.updateInfo.sourceUrl };
  const feed = buildFeed({
    current,
    release,
    prices: given,
    prevPrices,
    history: [historyEntry(args.date, merged, prevPrices)],
    source: { method: "manual", checkedAt: new Date().toISOString() },
  });
  return { feed, notes: [`Nhập tay ${Object.keys(given).length} mặt hàng`] };
}

async function runAuto(args, current) {
  const releases = await listReleases();
  if (!releases.length) throw new Error("Không tìm thấy thông cáo điều chỉnh giá nào trên Petrolimex");
  const [latest, prev] = releases;
  log(`Kỳ mới nhất trên Petrolimex: ${latest.date} ${latest.time} (${latest.url})`);

  const currentDate = current.updateInfo.effectiveDate;
  if (dateKey(latest.date) < dateKey(currentDate)) {
    log(`Feed đang ở kỳ ${currentDate}, mới hơn kỳ ${latest.date} trên trang. Không ghi đè.`);
    return null;
  }
  if (latest.date === currentDate && !args.force) {
    log(`Feed đã ở kỳ ${currentDate}. Không có gì để cập nhật.`);
    return null;
  }

  const cache = new Map();
  const pricesOf = async (release) => {
    if (!cache.has(release.url)) cache.set(release.url, await ocrRelease(release));
    return cache.get(release.url);
  };

  const { prices, imageUrl } = await pricesOf(latest);

  const check = await crossCheck(latest.date, prices);
  log(`Đối chiếu LuatVietnam: ${check.status} (${check.detail})`);
  if (check.status === "mismatch") throw new Error(`OCR lệch với nguồn đối chiếu: ${check.detail}`);

  // Giá kỳ trước để tính chênh lệch: dùng feed hiện tại nếu nó đúng là kỳ liền trước, không thì OCR
  let prevPrices = null;
  if (prev) prevPrices = currentDate === prev.date ? pricesFromFeed(current) : (await pricesOf(prev)).prices;
  if (prev && currentDate === prev.date) cache.set(prev.url, { prices: prevPrices });

  // Lịch sử: thêm các kỳ gần nhất còn thiếu (kỳ cũ OCR lỗi thì bỏ qua, không chặn cập nhật)
  const knownDates = new Set((current.history || []).map((h) => h.date));
  const history = [];
  const notes = [`Nguồn: ${latest.url}`, `Đối chiếu LuatVietnam: ${check.detail}`];
  for (let i = 0; i < Math.min(args.history, releases.length - 1); i++) {
    const r = releases[i];
    if (knownDates.has(r.date) && !(args.force && i === 0)) continue;
    try {
      const cur = (await pricesOf(r)).prices;
      const before = (await pricesOf(releases[i + 1])).prices;
      history.push(historyEntry(r.date, cur, before));
    } catch (err) {
      if (i === 0) throw err;
      log(`⚠ Bỏ qua lịch sử kỳ ${r.date}: ${err.message.split("\n")[0]}`);
      notes.push(`Thiếu lịch sử kỳ ${r.date} (OCR lỗi)`);
    }
  }

  const feed = buildFeed({
    current,
    release: latest,
    prices,
    prevPrices,
    history,
    source: { method: "petrolimex-ocr", releaseUrl: latest.url, imageUrl, crossCheck: check.status, checkedAt: new Date().toISOString() },
  });
  return { feed, notes };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const current = JSON.parse(fs.readFileSync(args.file, "utf8"));

  const result = args.manual ? await runManual(args, current) : await runAuto(args, current);
  if (!result) {
    report(current, "unchanged");
    return;
  }
  if (args.dryRun) log("Chạy thử (--dry-run): không ghi file.");
  else writeOutputs(args.file, result.feed);
  report(result.feed, args.dryRun ? "dry" : "updated", result.notes);
}

main().catch((err) => {
  console.error("[gas-updater] ✗", err.message);
  if (err.rows) console.error("Dòng OCR đọc được:\n" + err.rows.map((r) => `  ${r.label} | ${r.z1} | ${r.z2} | raw ${r.raw.join(" / ")}`).join("\n"));
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, "changed=false\n");
  process.exit(1);
});
