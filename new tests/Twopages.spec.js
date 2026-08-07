const { test, expect } = require('@playwright/test');

test("first page", async ({ page, browser }) => {
    const context = await browser.newContext();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('input[type="email"]').fill('alexsmith1998@example.com');
    await page.locator('input[type="password"]').fill('Test@1234');
    await page.locator('input[type="submit"]').click();
    await page.waitForLoadState('networkidle');
    const productNames = await page.locator('.card-body b').allTextContents();
    console.log(productNames[0]);

    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        await page.locator('.blinkingText').click(),

    ]);
    await newPage.waitForLoadState('networkidle');
    const NewText = await newPage.locator('.text-sm.font-medium.text-primary');
    console.log(await NewText.textContent());
    const splittext = (await NewText.textContent()).split(' — ');
    console.log(splittext[1].replace(' Open', ' '));

    await page.locator('.fa.fa-sign-out').click();

    await page.pause();
});