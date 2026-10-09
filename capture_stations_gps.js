const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function capture() {
  const outputDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const artifactDir = 'C:\\Users\\ACER\\.gemini\\antigravity\\brain\\ec496c16-a941-4a4f-b2b5-f404d2094650';

  console.log('[Playwright] Khởi chạy trình duyệt Chrome/Edge...');
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e1) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  const context = await browser.newContext({
    viewport: { width: 412, height: 892 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    geolocation: { latitude: 10.7769, longitude: 106.7009 }, // Trung tâm TP.HCM
    permissions: ['geolocation'],
  });

  const page = await context.newPage();
  console.log('[Playwright] Điều hướng tới http://localhost:3001 ...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  async function take(filename, label) {
    console.log(`[Screenshot] ${label}...`);
    const localPath = path.join(outputDir, filename);
    const artPath = path.join(artifactDir, filename);
    await page.screenshot({ path: localPath });
    fs.copyFileSync(localPath, artPath);
    console.log(`✓ Đã lưu: ${filename}`);
  }

  // 1. Chuyển sang Tab Giá Xăng Dầu
  await page.click('button.main-nav-btn:has-text("Giá Xăng Dầu")');
  await page.waitForTimeout(500);

  // 2. Chuyển sang Sub-tab Cây Xăng
  await page.click('button.gas-subtab-btn:has-text("Cây Xăng")');
  await page.waitForTimeout(600);

  // 3. Bấm nút định vị GPS "📍 Tìm cây xăng gần tôi nhất (GPS)"
  const gpsBtn = await page.$('button.gps-btn');
  if (gpsBtn) {
    await gpsBtn.click();
    await page.waitForTimeout(800);
  }

  // 4. Chụp toàn cảnh Cây Xăng sau khi đã kích hoạt GPS khoảng cách
  await take('07_tra_cuu_cay_xang_gps.png', 'Màn hình Cây Xăng - Định vị GPS cự ly km & Thanh toán VietQR');

  // 5. Bấm chọn Bộ lọc chip "🔥 Có bán RON 97 (Comeco)"
  const ron97Btn = await page.$('button.feat-btn:has-text("RON 97")');
  if (ron97Btn) {
    await ron97Btn.click();
    await page.waitForTimeout(600);
    await take('09_cay_xang_ron97_comeco.png', 'Cây Xăng bán RON 97 Comeco TP.HCM');
  }

  console.log('✓ Đã chụp thành công các màn hình trạm xăng GPS!');
  await browser.close();
}

capture().catch((err) => {
  console.error('Lỗi khi chụp màn hình:', err);
  process.exit(1);
});
