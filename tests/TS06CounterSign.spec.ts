import { test, expect, request as playwrightRequest } from '@playwright/test';

test('Countersign', async ({ page }) => {

  // 1. Create API context
  const apiContext = await playwrightRequest.newContext();

  // 2. Open page
  await page.goto('https://daedalus.janniskaranikis.dev/challenges/6-countersign');

  

  // 4. Get passcode from UI
  const passCode = await page.locator('input').first().inputValue();

  // 5. Send POST request with plain text
  const response = await apiContext.post(
    'https://daedalus.janniskaranikis.dev/api/getkey',
    {
      headers: {
        'Content-Type': 'text/plain', // request with plain text
      },
      data: passCode,
    }
  );

  // 6. Validate response
  expect(response.ok()).toBeTruthy();

  // 7. Extract encrypted key
  const encryptedKey = await response.text();

  // 8. Fill in UI
  await page.getByLabel('Your Response').fill(encryptedKey);

  // 9. Submit
  await page.getByRole('button', { name: 'Submit' }).click();

  // 10. Assert success (assert code appears or error message disappears)
    expect(page.locator('text=That is not the correct response')).not.toBeVisible();
  // 11. Dispose context (cleanup)
  await apiContext.dispose();
});