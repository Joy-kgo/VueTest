import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // 測試超時設定
  timeout: 30000,

  // 全域設定
  use: {
    // 基礎 URL
    baseURL: 'http://localhost:5173',

    // 截圖設定
    screenshot: 'only-on-failure',

    // 影片錄製
    video: 'retain-on-failure',

    // 追蹤設定
    trace: 'on-first-retry',
  },

  // 測試專案配置
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Web Server 設定（開發伺服器）
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
