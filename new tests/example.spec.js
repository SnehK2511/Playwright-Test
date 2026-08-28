import {test , expect} from  '@playwright/test';

test('syntax check', async ({page}) => {

await page.goto('https://www.reddit.com/');
await page.pause();
  
});

