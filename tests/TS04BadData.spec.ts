import { test, expect } from '@playwright/test';

test('Bad Data - mock API', async ({ page }) => {

  // Intercept API request
  await page.route('**/users', async (route) => {
    
    // Fake response with a user age >= 40
     // added valid users to the mocked data
    const mockedData = [
      { name: 'Richard', age: 31 },
      { name: 'Dinesh', age: 33 },
      { name: 'Gilfoyle', age: 35 },
      { name: 'Bighead', age: 29 },
      { name: 'Jared', age: 45 } 
      ];

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockedData),
    });
  });

  await page.goto('https://daedalus.janniskaranikis.dev/challenges/4-bad-data');

  await page.waitForLoadState('networkidle');

  // Assert that user with age ≥ 40 is now visible
  await expect(page.getByText('45')).toBeVisible();

  // Optional: check error message disappears
  await expect(page.getByText('Good job! Your assert code: ASSERTME')).toBeVisible();
});