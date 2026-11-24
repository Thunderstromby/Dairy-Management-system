import { defineConfig } from 'vitest/config';
import path from 'node:path';

const rootDir = __dirname;
const requested = process.env.VITE_DATA_SOURCE;
const dataSourceMode = requested === 'fixture' ? 'fixture' : 'api';

export default defineConfig({
  resolve: {
    alias: {
      '@smartfarm/data-source': path.resolve(
        rootDir,
        `apps/web/src/data/data-source.${dataSourceMode}.ts`,
      ),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    environmentMatchGlobs: [
      ['**/apps/web/**', 'jsdom'],
      ['**/tests/unit/**/*.dom.test.*', 'jsdom'],
    ],
    include: ['tests/**/*.test.{ts,tsx}', 'apps/**/*.test.{ts,tsx}'],
    passWithNoTests: true,
  },
});
