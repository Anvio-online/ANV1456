import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    // No test files exist yet in the scaffold — don't fail CI on that.
    // Remove once the first *.test.ts lands.
    passWithNoTests: true,
  },
})
