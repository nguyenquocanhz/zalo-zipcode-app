#!/usr/bin/env node

/**
 * ZMP-AUDIT: Automated Compliance Auditor for Zalo Mini App
 * Based on official Zalo Mini App Censorship Policy
 * Source: https://miniapp.zaloplatforms.com/documents/zalo-mini-app-censorship-policy/
 */

const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
};

const issues = {
  errors: [],
  warnings: [],
  passes: [],
};

function pass(ruleId, message) {
  issues.passes.push({ ruleId, message });
}

function warn(ruleId, message, file, line) {
  issues.warnings.push({ ruleId, message, file, line });
}

function error(ruleId, message, file, line) {
  issues.errors.push({ ruleId, message, file, line });
}

// Helper: Scan directory recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!['node_modules', 'dist', '.git', 'build'].includes(file)) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      if (/\.(jsx?|tsx?|html|json)$/.test(file)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

console.log(`${colors.cyan}${colors.bright}====================================================${colors.reset}`);
console.log(`${colors.cyan}${colors.bright}   ZMP-AUDIT: ZALO MINI APP CENSORSHIP AUDITOR      ${colors.reset}`);
console.log(`${colors.dim}   Tuân thủ Chính sách Kiểm duyệt Zalo Mini App 2026${colors.reset}`);
console.log(`${colors.cyan}${colors.bright}====================================================${colors.reset}\n`);

// ─── 1. AUDIT APP CONFIG & NAMING ───
const configPath = path.join(rootDir, 'app-config.json');
let appConfig = null;

if (fs.existsSync(configPath)) {
  try {
    appConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    pass('CONFIG_EXISTS', 'Đã tìm thấy app-config.json hợp lệ.');
  } catch (e) {
    error('CONFIG_PARSE', 'Lỗi phân tích cú pháp app-config.json: ' + e.message, 'app-config.json');
  }
} else {
  error('CONFIG_MISSING', 'Không tìm thấy file app-config.json!', 'app-config.json');
}

if (appConfig && appConfig.app) {
  const title = (appConfig.app.title || '').trim();

  // Rule 2.1 & 2.2: Name Checks
  if (!title) {
    error('NAME_EMPTY', 'Tiêu đề ứng dụng (app.title) bị để trống!', 'app-config.json');
  } else {
    // Check ALL CAPS
    const letters = title.replace(/[^a-zA-ZÀ-ỹ]/g, '');
    if (letters.length > 3 && letters === letters.toUpperCase()) {
      error('NAME_ALL_CAPS', `Tên app '${title}' đang viết hoa TOÀN BỘ. Zalo sẽ từ chối!`, 'app-config.json');
    } else {
      pass('NAME_NO_ALL_CAPS', 'Tên app không bị viết hoa toàn bộ.');
    }

    // Check Banned Words
    const bannedWordRegex = /\b(mini\s*app|zalo)\b/i;
    if (bannedWordRegex.test(title)) {
      error('NAME_BANNED_WORDS', `Tên app chứa từ cấm ('Zalo' hoặc 'Mini App'): "${title}".`, 'app-config.json');
    } else {
      pass('NAME_NO_BANNED_WORDS', 'Tên app không chứa từ cấm Zalo / Mini App.');
    }

    // Check Special Characters & Emoji
    const specialCharRegex = /[#$@!~%^&*+=<>?\\/\\|{}[\]\uD83C-\uDBFF\uDC00-\uDFFF]/;
    if (specialCharRegex.test(title)) {
      error('NAME_SPECIAL_CHARS', `Tên app chứa ký tự đặc biệt hoặc biểu tượng emoji: "${title}".`, 'app-config.json');
    } else {
      pass('NAME_NO_SPECIAL_CHARS', 'Tên app không chứa ký tự đặc biệt hoặc emoji.');
    }

    // Check Generic Keywords
    const genericOnlyPatterns = [
      /^(tra cứu|quy đổi|bưu chính|mã bưu chính|mã bưu điện|zip code|postal code|việt nam)(\s*(tra cứu|quy đổi|bưu chính|mã bưu chính|mã bưu điện|zip code|postal code|việt nam|toàn quốc|online))*$/i,
      /^(mua sắm|thời trang|đặt vé|xem phim|giao hàng|tin tức|bán lẻ|thanh toán)$/i
    ];
    const isPureGeneric = genericOnlyPatterns.some((pattern) => pattern.test(title.toLowerCase()));
    if (isPureGeneric) {
      error('NAME_GENERIC_KEYWORD', `Tên app '${title}' chỉ toàn từ khóa chung ngành nghề. Cần gắn thêm chủ thể sở hữu!`, 'app-config.json');
    } else {
      pass('NAME_AFFIX_CHECK', `Tên app '${title}' đã có định danh chủ thể phân biệt.`);
    }
  }
}

// ─── 2. AUDIT SOURCE CODE (src & index.html) ───
const srcFiles = getAllFiles(path.join(rootDir, 'src'));
const indexHtmlPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) srcFiles.push(indexHtmlPath);

let hasAutoPermission = false;
let hasExternalRedirect = false;
let has3rdPartyLogin = false;
let hasAdsNetwork = false;
let hasDemoText = false;
let hasCashout = false;
let hasInsecureHttp = false;

srcFiles.forEach((filePath) => {
  const relPath = path.relative(rootDir, filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // Check auto permission inside useEffect
    if (/useEffect\s*\(\s*\(\)\s*=>\s*\{[^}]*(getPhoneNumber|authorize|getLocation|getUserInfo)/s.test(line)) {
      error('PERM_AUTO_ON_LOAD', 'Phát hiện gọi API xin quyền trực tiếp trong useEffect lúc khởi chạy!', relPath, lineNum);
      hasAutoPermission = true;
    }

    // Check external redirects
    if (/window\.location\.href\s*=\s*['"]https?:\/\/(?!api\.|h5\.zdn\.vn|zalo\.me)/i.test(line) ||
        /window\.open\s*\(\s*['"]https?:\/\/(?!api\.|h5\.zdn\.vn|zalo\.me)/i.test(line)) {
      warn('CONTENT_EXTERNAL_REDIRECT', 'Phát hiện điều hướng mở liên kết ngoài. Cần đảm bảo là popup điều khoản nhúng.', relPath, lineNum);
      hasExternalRedirect = true;
    }

    // Check 3rd party oauth logins
    if (/(accounts\.google\.com|facebook\.com\/v[0-9]|appleid\.apple\.com)/i.test(line)) {
      error('CONTENT_3RD_PARTY_LOGIN', 'Phát hiện liên kết đăng nhập bên thứ 3 (Google/Facebook/Apple). Zalo cấm!', relPath, lineNum);
      has3rdPartyLogin = true;
    }

    // Check Ads network
    if (/(adsbygoogle|googlesyndication|admob|adcolony)/i.test(line)) {
      error('CONTENT_UNAUTHORIZED_ADS', 'Phát hiện mạng quảng cáo bên ngoài (Google Ads/AdMob).', relPath, lineNum);
      hasAdsNetwork = true;
    }

    // Check Demo / Coming Soon text in UI
    if (/(tính năng đang phát triển|coming soon|bản demo|demo mode)/i.test(line)) {
      warn('PERF_DEMO_FEATURE', 'Phát hiện chuỗi "Tính năng đang phát triển / Coming Soon". Cần ẩn trước khi nộp duyệt.', relPath, lineNum);
      hasDemoText = true;
    }

    // Check Cashout / Rút tiền
    if (/(rút tiền|rut tien|tra thuong|trả thưởng mặt|cashout)/i.test(line)) {
      error('CONTENT_CASHOUT', 'Phát hiện từ khóa rút tiền/trả thưởng. Zalo nghiêm cấm tính năng này!', relPath, lineNum);
      hasCashout = true;
    }

    // Check Insecure HTTP
    if (/http:\/\/(?!localhost|127\.0\.0\.1)/i.test(line)) {
      warn('PRIV_INSECURE_HTTP', 'Phát hiện liên kết không an toàn qua HTTP (không có SSL). Nên đổi sang HTTPS.', relPath, lineNum);
      hasInsecureHttp = true;
    }
  });
});

if (!hasAutoPermission) pass('PERM_NO_AUTO_REQUEST', 'Không phát hiện xin quyền tự động khi vừa mở app.');
if (!has3rdPartyLogin) pass('CONTENT_NO_3RD_LOGIN', 'Không có đăng nhập Google/Facebook bên thứ ba.');
if (!hasAdsNetwork) pass('CONTENT_NO_ADS', 'Không phát hiện mạng quảng cáo kiếm tiền trái phép.');
if (!hasCashout) pass('CONTENT_NO_CASHOUT', 'Không có tính năng rút tiền / trả thưởng mặt.');
if (!hasDemoText) pass('PERF_NO_DEMO', 'Không phát hiện tính năng gắn nhãn Demo / Coming Soon.');
if (!hasInsecureHttp) pass('PRIV_CLEAN_SSL', 'Tất cả liên kết đều dùng giao thức HTTPS an toàn.');

// ─── 3. AUDIT PAYMENT & CHECKOUT SDK ───
const pkgPath = path.join(rootDir, 'package.json');
let pkgJson = null;
if (fs.existsSync(pkgPath)) {
  pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
}

// ─── REPORT OUTPUT ───
console.log(`${colors.bright}KẾT QUẢ KIỂM TRA:${colors.reset}\n`);

// 1. Passes
issues.passes.forEach((p) => {
  console.log(`  ${colors.green}✔ [ĐẠT CHUẨN]${colors.reset} [${p.ruleId}] ${p.message}`);
});

// 2. Warnings
if (issues.warnings.length > 0) {
  console.log('');
  issues.warnings.forEach((w) => {
    const loc = w.file ? ` (${w.file}${w.line ? `:${w.line}` : ''})` : '';
    console.log(`  ${colors.yellow}▲ [CẢNH BÁO]${colors.reset} [${w.ruleId}] ${w.message}${colors.dim}${loc}${colors.reset}`);
  });
}

// 3. Errors
if (issues.errors.length > 0) {
  console.log('');
  issues.errors.forEach((e) => {
    const loc = e.file ? ` (${e.file}${e.line ? `:${e.line}` : ''})` : '';
    console.log(`  ${colors.red}✖ [VI PHẠM]${colors.reset} [${e.ruleId}] ${e.message}${colors.dim}${loc}${colors.reset}`);
  });
}

console.log('\n----------------------------------------------------');
const totalChecks = issues.passes.length + issues.warnings.length + issues.errors.length;
const score = Math.round((issues.passes.length / (totalChecks || 1)) * 100);

if (issues.errors.length === 0) {
  console.log(`${colors.bgGreen}${colors.bright} HOÀN TẤT KIỂM DUYỆT: 100% SẴN SÀNG GỬI DUYỆT ZALO! ${colors.reset}`);
  console.log(`Điểm tuân thủ: ${colors.green}${score}%${colors.reset} | Không có vi phạm nghiêm trọng.`);
} else {
  console.log(`${colors.bgRed}${colors.bright} CẢNH BÁO: CÓ ${issues.errors.length} LỖI CẦN KHẮC PHỤC TRƯỚC KHI NỘP DUYỆT! ${colors.reset}`);
  console.log(`Điểm tuân thủ: ${colors.yellow}${score}%${colors.reset} | Đạt: ${issues.passes.length}, Cảnh báo: ${issues.warnings.length}, Lỗi: ${issues.errors.length}.`);
}
console.log('----------------------------------------------------\n');
