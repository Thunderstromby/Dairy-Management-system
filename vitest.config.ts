import { defineConfig } from 'vitest/config';

export default defineConfig({
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
