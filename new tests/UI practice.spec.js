const { test, expect } = require('@playwright/test');

test.only("Create Post", async ({ page }) => {
  await page.goto("https://www.reddit.com/");
  await page.locator('#login-button').click();
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill("lss_mobile_9301");
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill("asdfasdf12");
  await page.locator('button:has-text("Log In")').click();
  const pageTitle = await page.title();
  console.log(pageTitle);
  await expect(pageTitle).toBe("Reddit - The heart of the internet");
  await page.locator('#create-post').click();
  await page.reload();
  await page.locator('#create-post').click();
  await page.locator('#post-submit-community-picker').click();
  await page.locator('textarea[placeholder="Search"]').click();
  await page.locator('textarea[placeholder="Search"]').fill("r/lssmod191");
  await page.locator('span:text-is("r/lssmod191")').click();
  await page.locator('textarea[name="title"]').fill("Test Post");
  await page.locator('div[name="body"]').click();
  await page.locator('div[name="body"]').fill("This is a test post.");
  await page.locator('button:has-text("Post")').click();
  await page.click('div[slot="close-button"] button');
  await page.pause();
});

test('Search Aniimo on Reddit', async ({ page }) => {
  await page.goto('https://www.reddit.com/');

  await expect(page).toHaveTitle(/Reddit/i);

  const searchBox = page.locator('.text-area-wrapper textarea');

  await searchBox.waitFor({ state: 'visible' });
  await searchBox.click();
  await searchBox.fill('Aniimo');
  await searchBox.press('Enter');

  await page.waitForLoadState('networkidle');
  
});