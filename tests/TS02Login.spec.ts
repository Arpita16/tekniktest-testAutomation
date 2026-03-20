import { test, expect, chromium} from '@playwright/test';

test('Login with Admin user', async ({ page }) => {

  // Navigate to the login page
  await page.goto('https://daedalus.janniskaranikis.dev/challenges/2-log-in');

  // Fill in username
  await page.getByLabel('Username').fill('Admin');

  // Fill in password
  await page.getByLabel('Password').fill('SafePass123');

  // click the "Log In" button
  await page.getByRole('button', { name: 'Log In' }).click();

  // Verify that the text "Good Job! Your well earned assert code: ASSERTME" is visible on the page
  
await expect(page.locator('text=Good Job! Your well earned assert code: ASSERTME')).toBeVisible();

});

