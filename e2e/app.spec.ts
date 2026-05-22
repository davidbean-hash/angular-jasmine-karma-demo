import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test('should redirect to /shop by default', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/.*\/shop/);
  });

  test('should display the app title', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('span')).toContainText('angular-jasmine-karma-demo app is running!');
  });

  test('should have router-outlet', async ({ page }) => {
    await page.goto('/');
    const routerOutlet = page.locator('router-outlet');
    await expect(routerOutlet).toHaveCount(1);
  });
});
