import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/training-log-spa/',
  test: {
    globals: true,
    environment: 'jsdom'
  }
})