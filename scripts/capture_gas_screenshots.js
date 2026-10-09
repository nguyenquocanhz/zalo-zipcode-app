const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\ACER\\.gemini\\antigravity\\brain\\ec496c16-a941-4a4f-b2b5-f404d2094650';

async function main() {
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }
  const context = await browser.newContext({
    viewport: { width: 412, height: 915 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3001 ...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Switch to Tab Giá xăng
  const gasTab = await page.$('text=Giá Xăng');
  if (gasTab) {
    await gasTab.click();
    await page.waitForTimeout(1000);
  }

  // Screenshot 1: Bảng giá xăng niêm yết thương mại chính thức (E10 RON 95-V, E10 RON 95-III, E5 RON 92)
  const p1 = path.join(ARTIFACT_DIR, '12_official_petrolimex_prices.png');
  await page.screenshot({ path: p1, fullPage: false });
  console.log('Saved 12_official_petrolimex_prices.png');

  // Screenshot 1b: Scroll down Vùng 1 to view E5 RON 92, Diesel, Dầu hỏa
  await page.evaluate(() => {
    const el = document.querySelector('.zaui-page') || document.scrollingElement || document.documentElement;
    if (el) el.scrollTop = 700;
    window.scrollTo(0, 700);
  });
  await page.waitForTimeout(500);
  const p1c = path.join(ARTIFACT_DIR, '12c_vung1_diesel_e5.png');
  await page.screenshot({ path: p1c, fullPage: false });
  console.log('Saved 12c_vung1_diesel_e5.png');

  // Scroll back to top
  await page.evaluate(() => {
    const el = document.querySelector('.zaui-page') || document.scrollingElement || document.documentElement;
    if (el) el.scrollTop = 0;
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);

  // Click Vùng 2 to show Vùng 2 official prices
  const zone2Btn = await page.$('text=Vùng 2');
  if (zone2Btn) {
    await zone2Btn.click();
    await page.waitForTimeout(500);
    const p2 = path.join(ARTIFACT_DIR, '13_official_petrolimex_vung2.png');
    await page.screenshot({ path: p2, fullPage: false });
    console.log('Saved 13_official_petrolimex_vung2.png');

    // Scroll down Vùng 2
    await page.evaluate(() => {
      const el = document.querySelector('.zaui-page') || document.scrollingElement || document.documentElement;
      if (el) el.scrollTop = 700;
      window.scrollTo(0, 700);
    });
    await page.waitForTimeout(500);
    const p1b = path.join(ARTIFACT_DIR, '12b_official_diesel_e5.png');
    await page.screenshot({ path: p1b, fullPage: false });
    console.log('Saved 12b_official_diesel_e5.png');

    // Switch back to Vung 1
    const zone1Btn = await page.$('text=Vùng 1');
    if (zone1Btn) await zone1Btn.click();
    await page.waitForTimeout(300);
  }

  // Switch to Tab Cây xăng gần nhất using precise button selector
  const stationTab = await page.$('button.gas-subtab-btn:has-text("Cây Xăng")');
  if (stationTab) {
    await stationTab.click();
    await page.waitForTimeout(1000);

    // Click preset Binh Tan
    const binhTanPreset = await page.$('button:has-text("Q. Bình Tân")');
    if (binhTanPreset) {
      await binhTanPreset.click();
      await page.waitForTimeout(1200);
    }

    const p3 = path.join(ARTIFACT_DIR, '14_binhtan_cay_xang_updated.png');
    await page.screenshot({ path: p3, fullPage: false });
    console.log('Saved 14_binhtan_cay_xang_updated.png');
  }

  await browser.close();
  console.log('Done capturing screenshots!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
