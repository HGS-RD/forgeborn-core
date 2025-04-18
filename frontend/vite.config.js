// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@theme': path.resolve(__dirname, 'src/theme'),
    },
  },
});
