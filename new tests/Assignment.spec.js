const { test, expect } = require('@playwright/test');

test("Register a new user", async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.click('.text-reset');

  await page.locator('#firstName').fill('Alex');
  await page.locator('#lastName').fill('Smith');
  await page.locator('#userEmail').fill('alexsmith1998@example.com');
  await page.locator('#userPassword').fill('Test@1234');

  // No .click() before selectOption on a <select>
  await page.locator('[formcontrolname="occupation"]').selectOption('Engineer');
  await page.locator('#userMobile').fill('1234567890');
  await page.locator('input[value="Male"]').check();
  await page.locator('input[type="checkbox"]').check();
  await page.locator('#confirmPassword').fill('Test@1234');
  await page.locator('#login').click();
  await page.locator('input[type="submit"]').click();
  await page.pause();
});

test.only("Print Product name", async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('input[type="email"]').fill('alexsmith1998@example.com');
    await page.locator('input[type="password"]').fill('Test@1234');
    await page.locator('input[type="submit"]').click();
    await page.waitForLoadState('networkidle');
    const productNames = await page.locator('.card-body b').allTextContents();
    console.log(productNames[0]);
    await page.pause();
});