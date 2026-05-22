import { test, expect } from '@playwright/test';

test.describe('Shop Page', () => {
  test('should display list of items', async ({ page }) => {
    await page.goto('/shop');
    await expect(page.locator('text=foo')).toBeVisible();
    await expect(page.locator('text=mario')).toBeVisible();
    await expect(page.locator('text=luigi')).toBeVisible();
  });

  test('should display sort controls', async ({ page }) => {
    await page.goto('/shop');
    await expect(page.locator('text=Sort by:')).toBeVisible();
    await expect(page.locator('button:has-text("Name")')).toBeVisible();
    await expect(page.locator('button:has-text("Description")')).toBeVisible();
    await expect(page.locator('button:has-text("Price")')).toBeVisible();
  });
});
