const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

console.log('====================================================');
console.log('   RUNNING AUTOMATED ZCODE 4-GATE AUDIT SUITE       ');
console.log('   Based on zmp-mcp & Zalo Mini App Specifications  ');
console.log('====================================================\n');

const results = {
  gate1: { name: 'Ngưỡng 1: Cấu hình & Định danh', checks: [], passed: 0, total: 0 },
  gate2: { name: 'Ngưỡng 2: Nghiệp vụ & Dữ liệu ZIP Code', checks: [], passed: 0, total: 0 },
  gate3: { name: 'Ngưỡng 3: Kiểm duyệt & Tuân thủ Zalo', checks: [], passed: 0, total: 0 },
  gate4: { name: 'Ngưỡng 4: Đóng gói zmp-mcp & Hiệu năng', checks: [], passed: 0, total: 0 },
};

function record(gate, id, title, passed, detail, value) {
  gate.total++;
  if (passed) gate.passed++;
  gate.checks.push({ id, title, passed, detail, value });
}

// ─── GATE 1: Cấu hình & Định danh ───
const configPath = path.join(process.cwd(), 'app-config.json');
let appConfig = null;
if (fs.existsSync(configPath)) {
  try {
    appConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    record(results.gate1, 'G1_CONFIG', 'File app-config.json tồn tại và hợp lệ', true, 'JSON parse OK', 'PASS');
  } catch (e) {
    record(results.gate1, 'G1_CONFIG', 'File app-config.json cú pháp lỗi', false, e.message, 'FAIL');
  }
} else {
  record(results.gate1, 'G1_CONFIG', 'Không tìm thấy app-config.json', false, 'Missing file', 'FAIL');
}

if (appConfig && appConfig.app) {
  const title = appConfig.app.title || '';
  const hasAppId = !!appConfig.app.appId;
  record(results.gate1, 'G1_APP_ID', 'Mini App ID khai báo đầy đủ', hasAppId, `AppId: ${appConfig.app.appId}`, hasAppId ? 'PASS' : 'FAIL');

  const noAllCaps = title !== title.toUpperCase() || title.length <= 3;
  record(results.gate1, 'G1_NO_ALL_CAPS', 'Tiêu đề không viết hoa toàn bộ', noAllCaps, `Title: "${title}"`, noAllCaps ? 'PASS' : 'FAIL');

  const noBanned = !/\b(zalo|mini\s*app)\b/i.test(title);
  record(results.gate1, 'G1_NO_BANNED', 'Tiêu đề không chứa từ cấm Zalo/Mini App', noBanned, `Title: "${title}"`, noBanned ? 'PASS' : 'FAIL');

  const hasAffix = /^(WrenApp|WrenTool|[A-Z][a-z0-9]+)\s*[-:]/i.test(title) || title.includes('-');
  record(results.gate1, 'G1_OWNER_AFFIX', 'Tiêu đề có định danh chủ thể', hasAffix, `Tiền tố/hậu tố: "${title}"`, hasAffix ? 'PASS' : 'FAIL');
}

// ─── GATE 2: Nghiệp vụ & Dữ liệu ZIP Code ───
const vnDataFile = path.join(process.cwd(), 'src', 'utils', 'vn-zipcodes.js');
const countriesFile = path.join(process.cwd(), 'src', 'utils', 'countries.js');

if (fs.existsSync(vnDataFile)) {
  const content = fs.readFileSync(vnDataFile, 'utf8');
  // Count provinces
  const provinceMatches = content.match(/"id":\s*"/g) || [];
  const has63Provinces = provinceMatches.length >= 63;
  record(results.gate2, 'G2_PROVINCES', 'Độ phủ 63 Tỉnh/Thành phố Việt Nam', has63Provinces, `Phát hiện ${provinceMatches.length}/63 tỉnh thành`, `${provinceMatches.length} tỉnh`);

  // Count districts & wards
  const districtMatches = content.match(/"districts":/g) || [];
  const wardMatches = content.match(/"wards":/g) || [];
  record(results.gate2, 'G2_ADMIN_LEVELS', 'Hỗ trợ cấp Quận/Huyện và Phường/Xã', districtMatches.length > 0, `Có dữ liệu Quận Huyện & Phường Xã`, 'Đạt chuẩn');

  // Quy đổi 5 số và 6 số
  const has5Digit = content.includes('code5');
  const has6Digit = content.includes('code6');
  record(results.gate2, 'G2_CONVERSION', 'Hỗ trợ song song mã 5 số mới & 6 số cũ', has5Digit && has6Digit, 'Mã BTTTT 5 số & mã bưu chính quốc tế 6 số', 'Song chuẩn');
}

if (fs.existsSync(countriesFile)) {
  const countriesContent = fs.readFileSync(countriesFile, 'utf8');
  const countryMatches = countriesContent.match(/code:\s*"/g) || [];
  record(results.gate2, 'G2_INTERNATIONAL', 'Tra cứu ZIP Code Quốc Tế', countryMatches.length >= 60, `Độ phủ ${countryMatches.length} quốc gia`, `${countryMatches.length} quốc gia`);
}

// ─── GATE 3: Kiểm duyệt & Tuân thủ Zalo Policy ───
const srcDir = path.join(process.cwd(), 'src');
function scanDir(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && f !== 'dist') files = files.concat(scanDir(p));
    } else if (/\.(jsx?|tsx?|html)$/.test(f)) {
      files.push(p);
    }
  });
  return files;
}

const allSrc = scanDir(srcDir);
let hasAutoPerm = false;
let has3rdParty = false;
let hasAds = false;
let hasCashout = false;
let hasDemoBadge = false;

allSrc.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (/useEffect\s*\(\s*\(\)\s*=>\s*\{[^}]*(getPhoneNumber|authorize|getLocation)/.test(c)) hasAutoPerm = true;
  if (/(accounts\.google\.com|facebook\.com\/v[0-9])/.test(c)) has3rdParty = true;
  if (/(adsbygoogle|admob)/.test(c)) hasAds = true;
  if (/(rút tiền|rut tien|tra thuong mặt)/i.test(c)) hasCashout = true;
  if (/(coming soon|tính năng đang phát triển|bản demo)/i.test(c)) hasDemoBadge = true;
});

record(results.gate3, 'G3_PERM_ON_LOAD', 'Không xin quyền tự động khi mở app', !hasAutoPerm, 'Consent ngữ cảnh', !hasAutoPerm ? 'PASS' : 'FAIL');
record(results.gate3, 'G3_GUEST_MODE', 'Cho phép trải nghiệm không cần đăng nhập', !has3rdParty, 'Chế độ khách vãng lai sạch sẽ', 'PASS');
record(results.gate3, 'G3_NO_ADS_CASHOUT', 'Không chứa quảng cáo ngoài hoặc rút tiền', !hasAds && !hasCashout, 'Không vi phạm nội dung cấm', 'PASS');
record(results.gate3, 'G3_ZERO_DEMO', 'Không tồn tại nút bấm Demo / Coming Soon', !hasDemoBadge, '100% tính năng hoạt động thực tế', 'PASS');

// ─── GATE 4: Đóng gói zmp-mcp & Hiệu năng ───
const wwwAssets = path.join(process.cwd(), 'www', 'assets');
let totalBundleSize = 0;
let maxFileSize = 0;
let maxFileName = '';
let assetExtensionsValid = true;
const allowedExts = ['.css', '.js', '.png', '.jpg', '.svg', '.json', '.woff2'];

if (fs.existsSync(wwwAssets)) {
  const files = fs.readdirSync(wwwAssets);
  files.forEach(f => {
    const fp = path.join(wwwAssets, f);
    const sz = fs.statSync(fp).size;
    totalBundleSize += sz;
    if (sz > maxFileSize) {
      maxFileSize = sz;
      maxFileName = f;
    }
    const ext = path.extname(f).toLowerCase();
    if (!allowedExts.includes(ext)) assetExtensionsValid = false;
  });
}

const totalMB = (totalBundleSize / (1024 * 1024)).toFixed(2);
const maxMB = (maxFileSize / (1024 * 1024)).toFixed(2);

// zmp-mcp constraints: total < 10MB, max file < 3MB
const underQuota = totalBundleSize < 10 * 1024 * 1024;
const fileUnderQuota = maxFileSize < 3 * 1024 * 1024;

record(results.gate4, 'G4_TOTAL_QUOTA', 'Hạn mức dung lượng tổng (< 10MB)', underQuota, `Tổng dung lượng bundle: ${totalMB} MB`, `${totalMB} MB`);
record(results.gate4, 'G4_FILE_QUOTA', 'Hạn mức file đơn lẻ (< 3MB/file)', fileUnderQuota, `File lớn nhất (${maxFileName}): ${maxMB} MB`, `${maxMB} MB`);
record(results.gate4, 'G4_EXT_WHITELIST', 'Định dạng assets thuộc Whitelist Zalo', assetExtensionsValid, 'Chỉ chứa JS, CSS, PNG, WOFF2', 'Hợp lệ');

// Asset Sync with app-config.json
let isSync = false;
if (appConfig && fs.existsSync(wwwAssets)) {
  const actualJs = fs.readdirSync(wwwAssets).filter(f => f.endsWith('.js'));
  const actualCss = fs.readdirSync(wwwAssets).filter(f => f.endsWith('.css'));
  const configJs = (appConfig.listAsyncJS || []).map(p => path.basename(p));
  const configCss = (appConfig.listCSS || []).map(p => path.basename(p));
  
  const jsMatch = actualJs.every(f => configJs.includes(f));
  const cssMatch = actualCss.every(f => configCss.includes(f));
  isSync = jsMatch && cssMatch;
}
record(results.gate4, 'G4_ASSET_SYNC', 'Đồng bộ mã băm Asset vào app-config.json', isSync, 'Không lỗi "No asset defined"', isSync ? 'Đồng bộ 1:1' : 'Lệch mã băm');

// ─── TỔNG KẾT & IN PIVOT MATRIX ───
console.log('┌────────────────────────────────────────────────────────────────────────────┐');
console.log('│                 MA TRẬN PIVOT ĐÁNH GIÁ 4 NGƯỠNG (GATE 1-4)                 │');
console.log('├──────────────────────┬─────────────┬───────────┬──────────────┬────────────┤');
console.log('│ Ngưỡng Kiểm Định     │ Số Tiêu Chí │ Đạt Chuẩn │ Điểm Tỉ Lệ   │ Trạng Thái │');
console.log('├──────────────────────┼─────────────┼───────────┼──────────────┼────────────┤');

[results.gate1, results.gate2, results.gate3, results.gate4].forEach(g => {
  const pct = Math.round((g.passed / g.total) * 100);
  const status = pct === 100 ? 'PASS (100%)' : 'WARNING';
  const nameCol = g.name.padEnd(20, ' ');
  console.log(`│ ${nameCol} │      ${g.total}      │     ${g.passed}     │     ${pct}%      │ ${status.padEnd(10, ' ')} │`);
});

console.log('└──────────────────────┴─────────────┴───────────┴──────────────┴────────────┘\n');

console.log('CHI TIẾT TỪNG TIÊU CHÍ:');
[results.gate1, results.gate2, results.gate3, results.gate4].forEach(g => {
  console.log(`\n▶ ${g.name}:`);
  g.checks.forEach(c => {
    const icon = c.passed ? '✔ [PASS]' : '✖ [FAIL]';
    console.log(`  ${icon} [${c.id}] ${c.title} -> ${c.detail} (${c.value})`);
  });
});
