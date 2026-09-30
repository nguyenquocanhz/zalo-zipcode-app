const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Tự động load .env nếu có mà không phụ thuộc package ngoài
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        process.env[key] = val;
      }
    }
  });
}

async function main() {
  console.log('====================================================');
  console.log('  ZALO MINI APP - AUTOMATED BUILD & DEPLOY TO TESTING');
  console.log('====================================================\n');

  const cwd = __dirname;

  try {
    // 1. Dọn dẹp thư mục assets cũ trong www để tránh lẫn file
    const wwwAssetsPath = path.join(cwd, 'www', 'assets');
    if (fs.existsSync(wwwAssetsPath)) {
      fs.readdirSync(wwwAssetsPath).forEach((file) => {
        if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.map')) {
          fs.unlinkSync(path.join(wwwAssetsPath, file));
        }
      });
    }

    // 2. Build Vite vào www
    console.log('[1/3] Đang đóng gói ứng dụng (Vite Build -> www)...');
    execSync('node node_modules/vite/bin/vite.js build', { stdio: 'inherit', cwd });
    console.log('✓ Build Vite thành công!\n');

    // 3. Đồng bộ danh sách tài nguyên thực tế từ www/assets vào app-config.json
    console.log('[2/3] Đồng bộ danh sách tài nguyên vào app-config.json...');
    const wwwConfigPath = path.join(cwd, 'www', 'app-config.json');
    const rootConfigPath = path.join(cwd, 'app-config.json');
    const rootAppJsonPath = path.join(cwd, 'app.json');

    const assets = fs.existsSync(wwwAssetsPath) ? fs.readdirSync(wwwAssetsPath) : [];
    const cssFiles = assets.filter(f => f.endsWith('.css')).map(f => `assets/${f}`);
    const jsFiles = assets.filter(f => f.endsWith('.js')).map(f => `assets/${f}`);

    const rootConfig = JSON.parse(fs.readFileSync(rootConfigPath, 'utf8'));
    rootConfig.listCSS = cssFiles;
    rootConfig.listAsyncJS = jsFiles;
    rootConfig.listSyncJS = [];

    fs.writeFileSync(rootConfigPath, JSON.stringify(rootConfig, null, 2), 'utf8');
    fs.writeFileSync(rootAppJsonPath, JSON.stringify(rootConfig, null, 2), 'utf8');
    fs.writeFileSync(wwwConfigPath, JSON.stringify(rootConfig, null, 2), 'utf8');
    console.log(`✓ Đã cập nhật assets: CSS (${cssFiles.join(', ')}), JS (${jsFiles.join(', ')})!\n`);

    // 4. Deploy
    console.log('[3/3] Đang tải lên Zalo Mini App Cloud (Phiên bản Testing)...');
    execSync('node node_modules/zmp-cli/index.js deploy -e -p -t -m "Revert tab Ve Chung Toi - Giu nguyen 2 tab Viet Nam va Quoc te sach se"', {
      stdio: 'inherit',
      cwd,
      env: process.env,
    });

    console.log('\n====================================================');
    console.log('>>> DEPLOY THÀNH CÔNG PHIÊN BẢN TESTING LÊN ZALO! <<<');
    console.log('====================================================');
  } catch (error) {
    console.error('\n❌ Lỗi trong quá trình build/deploy:', error.message);
    process.exit(1);
  }
}

main();
