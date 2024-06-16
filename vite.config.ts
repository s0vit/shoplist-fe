import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/material', '@emotion/react', '@emotion/styled', '@mui/x-date-pickers', 'date-fns'],
  },
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
