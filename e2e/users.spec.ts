import { test, expect } from '@playwright/test';

test.describe('Users Page', () => {
  test('should navigate to users page', async ({ page }) => {
    await page.goto('/users');
    await expect(page).toHaveURL(/.*\/users/);
  });

  test('should display users works text', async ({ page }) => {
    await page.goto('/users');
    await expect(page.locator('text=users works!')).toBeVisible();
  });

  test('should have Get Users button', async ({ page }) => {
    await page.goto('/users');
    await expect(page.locator('button:has-text("Get Users")')).toBeVisible();
  });
});
