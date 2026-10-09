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
  });

  const page = await context.newPage();
  console.log('[Playwright] Điều hướng tới http://localhost:3001 ...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Helper chụp ảnh
  async function take(filename, label) {
    console.log(`[Screenshot] ${label}...`);
    const localPath = path.join(outputDir, filename);
    const artPath = path.join(artifactDir, filename);
    await page.screenshot({ path: localPath });
    fs.copyFileSync(localPath, artPath);
    console.log(`✓ Đã lưu: ${filename}`);
  }

  // 1. Màn hình Mã Bưu Chính
  await take('01_ma_buu_chinh.png', '1/8: Mã Bưu Chính');

  // 2. Chuyển sang Tab Giá Xăng Dầu (Bảng Giá Vùng 1)
  await page.click('button.main-nav-btn:has-text("Giá Xăng Dầu")');
  await page.waitForTimeout(600);
  await take('02_gia_xang_bang_gia_vung1.png', '2/8: Giá Xăng Dầu - Bảng Giá Vùng 1');

  // 3. Chọn Vùng 2 (Vùng sâu / Hải đảo)
  await page.click('button.zone-btn:has-text("Vùng 2")');
  await page.waitForTimeout(500);
  await take('03_gia_xang_bang_gia_vung2.png', '3/8: Giá Xăng Dầu - Bảng Giá Vùng 2');

  // Trở lại Vùng 1
  await page.click('button.zone-btn:has-text("Vùng 1")');
  await page.waitForTimeout(300);

  // 4. Chuyển sang Sub-tab Tính Tiền Xăng (Đổ theo dòng xe)
  await page.click('button.gas-subtab-btn:has-text("Tính Tiền Xăng")');
  await page.waitForTimeout(600);
  await take('04_tinh_tien_theo_xe.png', '4/8: Tính Tiền Xăng - Đổ Theo Dòng Xe');

  // 5. Chuyển sang Đổi tiền ⇄ Lít
  await page.click('button.calc-mode-btn:has-text("Đổi tiền ⇄ Lít")');
  await page.waitForTimeout(500);
  await take('05_tinh_tien_doi_lit.png', '5/8: Tính Tiền Xăng - Đổi Tiền ⇄ Lít');

  // 6. Chuyển sang Sub-tab Lịch Sử Điều Hành
  await page.click('button.gas-subtab-btn:has-text("Lịch Sử")');
  await page.waitForTimeout(600);
  await take('06_lich_su_dieu_hanh.png', '6/8: Lịch Sử Biến Động Giá Xăng');

  // 7. Chuyển sang Sub-tab Cây Xăng
  await page.click('button.gas-subtab-btn:has-text("Cây Xăng")');
  await page.waitForTimeout(600);
  await take('07_tra_cuu_cay_xang.png', '7/8: Tra Cứu Cây Xăng Petrolimex & PVOIL');

  // 8. Bật Dark Mode và chụp Bảng Giá trong giao diện tối
  await page.click('button.gas-subtab-btn:has-text("Bảng Giá")');
  await page.waitForTimeout(300);
  await page.click('button.theme-toggle-btn');
  await page.waitForTimeout(600);
  await take('08_dark_mode_gia_xang.png', '8/8: Giao Diện Tối (Dark Mode) Bảng Giá');

  console.log('\n=============================================');
  console.log('🎉 ĐÃ CHỤP THÀNH CÔNG TẤT CẢ 8 MÀN HÌNH PREVIEW!');
  console.log('=============================================');
  await browser.close();
}

capture().catch((err) => {
  console.error('Lỗi khi chụp màn hình:', err);
  process.exit(1);
});
