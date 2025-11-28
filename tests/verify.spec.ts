
import { test, expect } from '@playwright/test';

test('My awesome test', async ({ page }) => {
  await page.goto('http://localhost:8000', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'test-results/verification.png' });
});
