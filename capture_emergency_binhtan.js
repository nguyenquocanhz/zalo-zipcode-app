const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function capture() {
  const outputDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const artifactDir = 'C:\\Users\\ACER\\.gemini\\antigravity\\brain\\ec496c16-a941-4a4f-b2b5-f404d2094650';

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
    geolocation: { latitude: 10.7600, longitude: 106.6120 }, // Đường Tên Lửa, Q. Bình Tân
    permissions: ['geolocation'],
  });

  const page = await context.newPage();
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

  // Cuộn thẳng tới mục E10
  const e10El = await page.$('text=Xăng sinh học E10');
  if (e10El) {
    await e10El.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  }
  await take('10_e10_unpriced_clean.png', 'Bảng Giá Xăng Dầu - E10 Chưa niêm yết giá');

  // 2. Chuyển sang Sub-tab Cây Xăng
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.click('button.gas-subtab-btn:has-text("Cây Xăng")');
  await page.waitForTimeout(600);

  // 3. Bấm nút chọn vị trí mẫu: Q. Bình Tân
  const binhTanBtn = await page.$('button.preset-loc-btn');
  if (binhTanBtn) {
    await binhTanBtn.click();
    await page.waitForTimeout(800);
  }

  await take('11_binhtan_emergency_mode.png', 'Cứu hộ hết xăng Q. Bình Tân - Bán kính tăng dần');

  console.log('✓ Hoàn tất chụp ảnh minh chứng!');
  await browser.close();
}

capture().catch((err) => {
  console.error('Lỗi khi chụp màn hình:', err);
  process.exit(1);
});
