import { test, expect } from '@playwright/test';

test.use({ baseURL: 'http://localhost:8080' });

test('homepage has correct title', async ({ page }) => {
  await page.goto('/index.html');
  await expect(page).toHaveTitle(/Creative Work Pro Hub/);
});

test('navigation links work', async ({ page }) => {
  await page.goto('/index.html');
  await page.click('a[href="about.html"]');
  await expect(page).toHaveURL(/.*about\.html/);
});

test('contact form handles submission', async ({ page }) => {
  await page.goto('/contact.html');

  // Mock the API response BEFORE triggering the request
  await page.route('**/api/contact.php', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'success', message: 'Message sent successfully' })
    });
  });

  // Fill the form
  await page.fill('#contact-form input[name="name"]', 'Test User');
  await page.fill('#contact-form input[name="email"]', 'test@example.com');
  await page.fill('#contact-form textarea[name="message"]', 'This is a test message');

  // Submit
  await page.click('#contact-form button[type="submit"]');

  // Verify success message
  const successMessage = page.locator('.form-status--success');
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toContainText('Спасибо! Ваше сообщение отправлено');
});
