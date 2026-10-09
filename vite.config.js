import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// www giữ lại app-config.json nên không dùng emptyOutDir; chỉ dọn bundle cũ trong www/assets
const cleanOldAssets = () => ({
  name: 'clean-old-assets',
  apply: 'build',
  buildStart() {
    const dir = path.resolve(__dirname, 'www', 'assets');
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach((file) => {
      if (/\.(js|css|map)$/.test(file)) fs.unlinkSync(path.join(dir, file));
    });
  },
});

export default defineConfig({
  base: '',
  plugins: [react(), cleanOldAssets()],
  build: {
    outDir: 'www',
    emptyOutDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].module.js',
        chunkFileNames: 'assets/[name].[hash].module.js',
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom') || id.includes('node_modules/scheduler')) {
            return 'react';
          }
          if (id.includes('node_modules/zmp-ui')) {
            return 'zmp-ui';
          }
          return undefined;
        },
      },
    },
  },
  server: {
    port: 3001,
  },
});
