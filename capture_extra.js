const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  const b = await chromium.launch({ channel: 'chrome', headless: true });
  const p = await b.newPage({ viewport: { width: 412, height: 892 }, deviceScaleFactor: 2 });
  await p.goto('http://localhost:3001');
  await p.waitForTimeout(600);
  await p.click('button.main-nav-btn:has-text("Giá Xăng Dầu")');
  await p.waitForTimeout(600);

  const local = path.join(__dirname, 'screenshots', '02_realtime_live.png');
  const art = path.join('C:\\Users\\ACER\\.gemini\\antigravity\\brain\\ec496c16-a941-4a4f-b2b5-f404d2094650', '02_realtime_live.png');
  await p.screenshot({ path: local });
  fs.copyFileSync(local, art);
  console.log('Saved 02_realtime_live.png');
  await b.close();
}
run();
