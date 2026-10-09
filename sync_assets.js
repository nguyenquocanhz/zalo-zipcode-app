const fs = require('fs');
const path = require('path');

const cwd = __dirname;
const wwwIndexPath = path.join(cwd, 'www', 'index.html');
const wwwConfigPath = path.join(cwd, 'www', 'app-config.json');
const rootConfigPath = path.join(cwd, 'app-config.json');
const rootAppJsonPath = path.join(cwd, 'app.json');

// Chỉ khai báo entry JS: các chunk (react, zmp-ui, GasPriceTab...) được entry tự import
function syncAssets() {
  if (!fs.existsSync(wwwIndexPath) || !fs.existsSync(rootConfigPath)) return null;
  const html = fs.readFileSync(wwwIndexPath, 'utf8');
  const pick = (re) => Array.from(html.matchAll(re), (m) => m[1].replace(/^\.?\//, ''));
  const activeJs = pick(/<script[^>]+type="module"[^>]+src="([^"]+\.js)"/g);
  const activeCss = pick(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+\.css)"/g);

  const rootConfig = JSON.parse(fs.readFileSync(rootConfigPath, 'utf8'));
  rootConfig.listCSS = activeCss;
  rootConfig.listAsyncJS = activeJs;
  rootConfig.listSyncJS = [];

  const json = JSON.stringify(rootConfig, null, 2);
  fs.writeFileSync(rootConfigPath, json, 'utf8');
  fs.writeFileSync(rootAppJsonPath, json, 'utf8');
  fs.writeFileSync(wwwConfigPath, json, 'utf8');
  console.log(`[sync_assets] Synced entry assets: CSS (${activeCss.join(', ')}), JS (${activeJs.join(', ')})`);
  return { activeCss, activeJs };
}

module.exports = { syncAssets };

if (require.main === module) syncAssets();
