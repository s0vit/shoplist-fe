import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import version from 'vite-plugin-package-version';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    version(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, 'locales/') + '/[!.]*', // 1️⃣
          dest: './locales/', // 2️⃣
        },
      ],
    }),
  ],
  optimizeDeps: {
    include: ['@mui/material', '@emotion/react', '@emotion/styled', '@mui/x-date-pickers', 'date-fns'],
  },
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
