import { expect, test } from '@playwright/test';

const url = process.env.CURRENT_URL || 'http://localhost:5173/';

test.describe('login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('to login correct', async ({ page }) => {
    const loginInput = page.locator(`input[type="text"]`);
    await loginInput.waitFor();

    const passwordInput = page.locator(`input[type="password"]`);
    await passwordInput.waitFor();

    const submitButton = page.locator(`button[type="submit"]`);
    await submitButton.waitFor();

    const currentUrl = page.url();
    await loginInput.fill(process.env.TEST_USERNAME!);
    await passwordInput.fill(process.env.TEST_PASSWORD!);

    expect(currentUrl).toBe(`${url}login?to=/`);

    await submitButton.click();
    await page.waitForURL(url, { timeout: 60000 });
    await expect(page).toHaveURL(url);
  });
});
