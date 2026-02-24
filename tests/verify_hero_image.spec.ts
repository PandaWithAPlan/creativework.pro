import { test, expect } from '@playwright/test';

test('Verify Hero Image Attributes', async ({ page }) => {
  // Navigate to the index page
  await page.goto('http://localhost:8000/index.html');

  // Select the hero image
  const heroImage = page.locator('img[alt="Hero Image: Professional creative designer at work"]');

  // Check if the image exists
  await expect(heroImage).toBeVisible();

  // Verify width and height attributes
  const width = await heroImage.getAttribute('width');
  const height = await heroImage.getAttribute('height');

  console.log(`Hero image width: ${width}, height: ${height}`);

  expect(width).toBe('1200');
  expect(height).toBe('600');
});
