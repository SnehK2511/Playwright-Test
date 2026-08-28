const { test, expect } = require('@playwright/test');
const { buffer } = require('node:stream/consumers');

test('e2e using getby', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder('email@example.com').fill('alexsmith77@example.com');
    await page.getByPlaceholder("enter your passsword").fill('Test@1234');
    await page.getByRole("button", { name: "login" }).click();

    const productName = "ZARA COAT 3";
    await page.locator(".card-body").filter({ hasText: productName }).getByRole('button', { name: "Add To Cart" }).click();

    const toast = page.locator('[role="alert"]');
    await toast.waitFor({ state: 'visible' });
    console.log(await toast.innerText());
    await expect(toast).toBeVisible();

    //clicked on Buy now button
    await page.getByRole('listitem').getByRole('button', { name: 'Cart' }).click();
    await expect(page.getByText('ZARA COAT 3').isVisible());
    await page.locator('.items').filter({ hasText: productName }).getByRole('button', { name: 'Buy Now' }).click();

    //Email Validation
    const EmailIVerifcation = await page.locator('.details__user input').first().inputValue();
    console.log(EmailIVerifcation);
    await expect(EmailIVerifcation).toBeTruthy();

    await page.getByPlaceholder("Select Country").pressSequentially('IND');
    await page.locator('.ta-results').filter({ hasText: ' India' }).click();

    //NO GETBY METHOD APPLIED
    await page.locator('select.input.ddl').first().selectOption('02');
    await page.locator('select.input.ddl').last().selectOption('27');
    await page.locator('input.input.txt').nth(1).type('123');
    await page.locator('input.input.txt').nth(2).type('Rahul Gandu');
    await page.locator('input.input.txt').nth(3).type('rahulshettyacademy');

    await page.getByRole('button', { name: 'Apply Coupon' }).click();
    await expect(page.getByText('* Coupon Applied').isVisible());
    await page.getByText('Place Order').click();
    await expect(page.getByText(' Thankyou for the order. ').isVisible());
    const Order_detals = await page.locator('label.ng-star-inserted').textContent();
    const Order_ID = await Order_detals.split(' | ');
    const Neworder = await (Order_ID[1]);
    console.log(Neworder);
    await page.getByText(' Orders History Page ').click();
    await page.locator('.table-bordered').getByRole('row', { name: Neworder }).getByRole('button', { name: 'View' }).click();
    await page.pause();

});