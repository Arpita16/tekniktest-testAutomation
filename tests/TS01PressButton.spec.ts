import { test, expect } from '@playwright/test';
test('Press the button', async ({ page }) => {
    
    //go to the page
    await page.goto('https://daedalus.janniskaranikis.dev/challenges/1-press-the-button');
    //wait for the page to load
    await page.waitForLoadState('networkidle');
    //click the button that says "Press Me"
    await page.getByRole('button', { name: 'Press Me' }).click();
    await page.waitForTimeout(1000);

    //assert that the text "You made it! Your assert code: ASSERTME" is visible on the page
    await expect(page.locator('text=You made it! Your assert code: ASSERTME')).toBeVisible();
});
