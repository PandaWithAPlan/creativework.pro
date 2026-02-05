const { test, expect } = require('@playwright/test');

test.describe('Form Validation', () => {
  test('Newsletter form validation on index.html', async ({ page }) => {
    // Go to index.html
    await page.goto('file://' + process.cwd() + '/index.html');

    // The form might not have an ID yet, so we select by class or hierarchy for now,
    // but the JS expects an ID. If the JS is not attached, the browser's default validation might kick in
    // (since input type=email), but the JS custom validation logic won't run.

    // However, to verify OUR optimization in js/forms.js, we need the JS to run.
    // So we will assume the ID 'newsletter-form' exists. If not, the test will fail finding the locator,
    // which confirms we need to fix the HTML.

    const form = page.locator('#newsletter-form');
    // If the element doesn't exist, we can't test it.
    // Let's assert it exists first.
    await expect(form).toBeVisible();

    const emailInput = form.locator('input[type="email"]');
    const submitBtn = form.locator('button[type="submit"]');

    // Test invalid email
    await emailInput.fill('invalid-email');
    await submitBtn.click();

    // Check for error message from js/forms.js
    // It creates a .form-status element
    const status = form.locator('.form-status');
    await expect(status).toBeVisible();
    await expect(status).toHaveText(/Пожалуйста, укажите корректный email/);
    await expect(status).toHaveClass(/form-status--error/);

    // Test valid email
    await emailInput.fill('test@example.com');
    await submitBtn.click();

    // Check for success message
    await expect(status).toHaveText(/Спасибо! Мы добавили ваш email/);
    await expect(status).toHaveClass(/form-status--success/);
  });
});
