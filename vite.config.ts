import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const rootDir = __dirname;

export default defineConfig({
  root: path.resolve(rootDir, 'apps/web'),
  plugins: [react()],
  build: {
    outDir: path.resolve(rootDir, 'dist/web'),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 4173,
  },
});
