import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(({ command }) => {
  const rootDir = __dirname;
  const requested = process.env.VITE_DATA_SOURCE;
  const dataSourceMode =
    requested === 'fixture' || (requested === undefined && command === 'serve') ? 'fixture' : 'api';

  return {
    root: path.resolve(rootDir, 'apps/web'),
    plugins: [react()],
    resolve: {
      alias: {
        '@smartfarm/data-source': path.resolve(
          rootDir,
          `apps/web/src/data/data-source.${dataSourceMode}.ts`,
        ),
      },
    },
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
  };
});
