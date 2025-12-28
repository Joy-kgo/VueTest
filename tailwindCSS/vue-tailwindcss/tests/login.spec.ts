import { test, expect } from '@playwright/test';

test.describe('登入頁面測試', () => {
  test('應該顯示登入表單', async ({ page }) => {
    await page.goto('/');

    // 檢查登入標題
    await expect(page.getByRole('heading', { name: '登入' })).toBeVisible();

    // 檢查帳號輸入框
    await expect(page.getByLabel('帳號')).toBeVisible();

    // 檢查密碼輸入框
    await expect(page.getByLabel('密碼')).toBeVisible();

    // 檢查登入按鈕
    await expect(page.getByRole('button', { name: '登入' })).toBeVisible();
  });

  test('應該顯示下雪動畫', async ({ page }) => {
    await page.goto('/');

    // 檢查雪花元素是否存在
    const snowflakes = page.locator('.snowflake');
    await expect(snowflakes.first()).toBeVisible();

    // 確認有多個雪花
    const count = await snowflakes.count();
    expect(count).toBeGreaterThan(0);
  });

  test('空值驗證測試', async ({ page }) => {
    await page.goto('/');

    // 直接點擊登入按鈕（不填寫任何欄位）
    await page.getByRole('button', { name: '登入' }).click();

    // 應該顯示錯誤訊息
    await expect(page.getByText('請輸入帳號')).toBeVisible();
  });

  test('錯誤帳密驗證測試', async ({ page }) => {
    await page.goto('/');

    // 填寫錯誤的帳號密碼
    await page.getByLabel('帳號').fill('wronguser');
    await page.getByLabel('密碼').fill('wrongpass');
    await page.getByRole('button', { name: '登入' }).click();

    // 應該顯示錯誤訊息
    await expect(page.getByText('帳號或密碼錯誤')).toBeVisible();
  });

  test('成功登入測試', async ({ page }) => {
    await page.goto('/');

    // 填寫正確的帳號密碼
    await page.getByLabel('帳號').fill('admin');
    await page.getByLabel('密碼').fill('password');
    await page.getByRole('button', { name: '登入' }).click();

    // 應該切換到歡迎頁面
    await expect(page.getByText('歡迎登入！')).toBeVisible();
  });

  test('顯示/隱藏密碼功能測試', async ({ page }) => {
    await page.goto('/');

    const passwordInput = page.getByLabel('密碼');

    // 初始狀態應該是 password type
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // 點擊眼睛圖示切換顯示
    await page.locator('button[type="button"]').first().click();

    // 應該切換為 text type
    await expect(passwordInput).toHaveAttribute('type', 'text');
  });
});

test.describe('登出功能測試', () => {
  test('應該顯示登出按鈕', async ({ page }) => {
    // 登入
    await page.goto('/');
    await page.getByLabel('帳號').fill('admin');
    await page.getByLabel('密碼').fill('password');
    await page.getByRole('button', { name: '登入' }).click();

    // 等待歡迎畫面消失（3秒）
    await page.waitForTimeout(3500);

    // 檢查登出按鈕
    await expect(page.getByRole('button', { name: '登出' })).toBeVisible();
  });

  test('點擊登出應該回到登入頁面', async ({ page }) => {
    // 登入
    await page.goto('/');
    await page.getByLabel('帳號').fill('admin');
    await page.getByLabel('密碼').fill('password');
    await page.getByRole('button', { name: '登入' }).click();

    // 等待歡迎畫面消失
    await page.waitForTimeout(3500);

    // 點擊登出
    await page.getByRole('button', { name: '登出' }).click();

    // 檢查回到登入頁面
    await expect(page.getByRole('heading', { name: '登入' })).toBeVisible();
    await expect(page.getByLabel('帳號')).toBeVisible();
    await expect(page.getByLabel('密碼')).toBeVisible();
  });

  test('登出後可以重新登入', async ({ page }) => {
    // 第一次登入
    await page.goto('/');
    await page.getByLabel('帳號').fill('admin');
    await page.getByLabel('密碼').fill('password');
    await page.getByRole('button', { name: '登入' }).click();
    await page.waitForTimeout(3500);

    // 登出
    await page.getByRole('button', { name: '登出' }).click();

    // 第二次登入
    await page.getByLabel('帳號').fill('admin');
    await page.getByLabel('密碼').fill('password');
    await page.getByRole('button', { name: '登入' }).click();

    // 檢查歡迎畫面
    await expect(page.getByText('歡迎登入！')).toBeVisible();
  });
});
