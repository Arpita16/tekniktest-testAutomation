import { test, expect, Locator } from '@playwright/test';

test('Create a quote', async ({ page }) => {
  await page.goto('https://daedalus.janniskaranikis.dev/challenges/5-create-a-quote');
  await page.waitForLoadState('networkidle');

  const quoteElement = page.locator('q.text-lg.italic');
  await quoteElement.waitFor({ state: 'visible' });

  // Read the target quote
  const quoteText = await quoteElement.innerText();

  // Remove quotes and split into words
  const words = quoteText
    .trim()
    .split(/\s+/);

  // Source area and drop area
  const sourceArea = page.locator('text=Drag from here').locator('..');
  const dropArea = page.locator('ul.bg-slate-50.mb-6.border');

  for (const word of words) {
    // Find all matching draggable items in source
   const elements = sourceArea.locator(`text="${word}"`);

    const count = await elements.count();

    let dragged = false;//start dragging variable as false

    for (let i = 0; i < count; i++) {
      const item = elements.nth(i);

      if (await item.isVisible()) {
        await item.dragTo(dropArea);
        dragged = true;//set dragged to true if the item was successfully dragged
        break;
      }
    }
  }

  // Wait for all words to be dropped
  await dropArea.locator('li').first().waitFor({ state: 'visible' });

  // assertion for success code appears
  const resultWords = await dropArea.locator('li').allTextContents();
  const expectedQuote = words.join(' ').trim();
  expect(resultWords.join(' ').trim()).toBe(expectedQuote);
});