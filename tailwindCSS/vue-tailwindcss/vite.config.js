import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom', // 可以选择 happy-dom 作为测试环境
    setupFiles: './vitest.setup.ts',
  },
})
