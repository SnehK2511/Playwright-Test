import { test, expect } from '@playwright/test';
test('register form with getby method', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator('input[name="name"]').nth(0).fill('smith');
    await page.locator('input[name="email"]').fill('babaji@test.com');
    await page.getByPlaceholder("Password").fill('babaji@123');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByLabel('Employed').click();
    await page.getByRole('button', { name: 'submit' }).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    // await page.getByText('Shop').click();
    await page.locator('[href*="/shop"]').click();
    await page.locator('.col-lg-3.col-md-6.mb-3').filter({ hasText: 'iphone X' }).getByRole('button', { name: 'Add ' }).click();
    await page.locator('.nav-item.active').click();
    await page.getByText('iphone X', { exact: true });
    await page.getByRole("button", { name: 'Checkout' }).click();
    // await page.locator('.btn.btn-success').click();
  
    await page.locator('label[for="checkbox2"]').click();
    await page.getByRole('button', {name:'Close'}).nth(0).click();;
    await page.locator("#country").pressSequentially('Ind');
    await page.getByText('India', { exact: true }).click();
    await page.locator('.checkbox.checkbox-primary input').check();
    await page.getByRole("button" , {name:'Purchase'}).click();
    await page.getByText(' Thank you! Your order will be delivered in next few weeks :-).').isVisible();
    await page.pause();


});