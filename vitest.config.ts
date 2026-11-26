import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
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
    passWithNoTests: true,
    projects: [
      {
        test: {
          name: 'web',
          environment: 'jsdom',
          include: ['apps/**/*.test.{ts,tsx}'],
        },
      },
      {
        test: {
          name: 'node',
          environment: 'node',
          include: ['tests/**/*.test.{ts,tsx}', '!tests/**/*.dom.test.{ts,tsx}'],
        },
      },
      {
        test: {
          name: 'dom',
          environment: 'jsdom',
          include: ['tests/**/*.dom.test.{ts,tsx}'],
        },
      },
    ],
  },
});
