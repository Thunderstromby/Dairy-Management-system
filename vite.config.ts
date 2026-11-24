import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'apps/api/src'),
      '@web': path.resolve(__dirname, 'apps/web/src'),
      '@db': path.resolve(__dirname, 'packages/database'),
      '@ui': path.resolve(__dirname, 'packages/ui'),
      '@domain': path.resolve(__dirname, 'packages/domain'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4173,
  },
});