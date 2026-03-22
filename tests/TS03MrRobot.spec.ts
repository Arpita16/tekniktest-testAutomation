import { test, expect } from '@playwright/test';

test('Mr. Robot challenge', async ({ page }) => {
  await page.goto('https://daedalus.janniskaranikis.dev/challenges/3-mr-robot');
 await page.waitForLoadState('networkidle');

 

  // find all buttons and click them the number of times indicated on the button
  const buttons = page.locator('button');
  const count = await buttons.count();

  for (let i = 0; i < count; i++) {
    const button = buttons.nth(i);

    // read the text on the button to determine how many times to click
    const text = await button.innerText();
    const times = parseInt(text.trim());

    // click the button the specified number of times
    for (let j = 0; j < times; j++) {
      await button.click();
    }
  }

  // read the text that says "I want a [soda]!" and extract the soda name
  const sodaText = await page.locator('text=/I want a .*!/').innerText();
  const soda = sodaText.match(/I want a (.*)!/)?.[1];

   // choose the soda from the dropdown
  await page.locator('select').selectOption({ label: soda });

  // assert that the text "Mr. Robot is happy! : ASSERTME" is visible on the page
  await expect(page.locator('text=Mr. Robot is happy! : ASSERTME')).toBeVisible();
});