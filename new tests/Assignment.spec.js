const { test, expect } = require('@playwright/test');

test("Printing First Product Name", async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.click('.text-reset');

  await page.locator('#firstName').fill('Alex');
  await page.locator('#lastName').fill('Smith');
  await page.locator('#userEmail').fill('alex.smith@example.com');
  await page.locator('#userPassword').fill('Sneh@2511');

  // No .click() before selectOption on a <select>
  await page.locator('[formcontrolname="occupation"]').selectOption('Engineer');

  await page.pause();
});