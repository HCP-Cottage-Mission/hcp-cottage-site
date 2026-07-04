import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['__tests__/**/*.test.js'],
    testTimeout: 30000,
    hookTimeout: 30000,
    setupFiles: ['__tests__/setup.js'],
  },
});
