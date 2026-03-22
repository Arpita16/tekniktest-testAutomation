import { test, expect, request as playwrightRequest } from '@playwright/test';

test('Countersign', async ({ page }) => {

  // 1. Create API context
  const apiContext = await playwrightRequest.newContext();
 

  // 2. Open page
  await page.goto('https://daedalus.janniskaranikis.dev/challenges/6-countersign');

  // 3. Wait for page to load and get passcode
   await page.reload({ waitUntil: 'networkidle' });

  

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

   const responseBody = await response.text();


  // 7. Extract key from response

console.log('API response:', responseBody);

const value = responseBody.startsWith('{')
  ? JSON.parse(responseBody).key
  : responseBody;
    

  // 8. Input key into UI and submit

  await page.getByLabel('Your Response').fill(value.trim());
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('Well done! : ASSERTME')).toBeVisible();
  // 11. Dispose context (cleanup)
 await apiContext.dispose();
});