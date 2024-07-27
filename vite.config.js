import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/, // Incluir archivos .jsx
    exclude: [],
  },
  server: {
    open: true,
    hmr: {
      overlay: false,
    },
  },
});
