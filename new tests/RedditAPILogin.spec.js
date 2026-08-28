const { test } = require('@playwright/test');

test.use({
    storageState: 'reddit-auth.json'
});


test('Login and save state', async ({ page }) => {

    await page.goto('https://www.reddit.com/');
    await page.waitForLoadState('domcontentloaded');
    console.log('Current URL:', page.url());
    await page.pause();
});
