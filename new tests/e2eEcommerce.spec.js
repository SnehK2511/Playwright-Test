const { test, expect } = require('@playwright/test');
const { count } = require('node:console');

test.only("Register New User", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.click('.text-reset');
    await page.locator('#firstName').fill('Alex');
    await page.locator('#lastName').fill('Smith');
    await page.locator('#userEmail').fill('alexsmith15@example.com');
    await page.locator('#userPassword').fill('Test@1234');
    await page.locator('[formcontrolname="occupation"]').selectOption('Engineer');
    await page.locator('#userMobile').fill('1234567890');
    await page.locator('input[value="Male"]').check();
    await page.locator('input[type="checkbox"]').check();
    await page.locator('#confirmPassword').fill('Test@1234');
    await page.locator('#login').click();
    await page.locator('.btn.btn-primary').click();
    await page.locator('input[type="email"]').fill('alexsmith17@example.com');
    await page.locator('input[type="password"]').fill('Test@1234');
    await page.locator('input[type="submit"]').click();
    await page.waitForLoadState('networkidle');
    await page.pause();

});

test("E2E Purchase Flow", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('input[type="email"]').fill('alexsmith77@example.com');
    await page.locator('input[type="password"]').fill('Test@1234');
    await page.locator('input[type="submit"]').click();
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    await products.first().waitFor();
    const totalProducts = await products.count();
    console.log("Total Products:", totalProducts);

    for (let i = 0; i < totalProducts; i++) {

        const title = await products.nth(i).locator("b").textContent();

        console.log(title);

        if (title.trim() === productName) {

            console.log("Product Found");

            await products.nth(i).locator("text=Add To Cart").click();

            break;
        }
    }

    const toast = page.locator('[role="alert"]');
    await toast.waitFor({ state: 'visible' });
    console.log(await toast.innerText());
    await expect(toast).toBeVisible();
    await page.locator("button[routerlink='/dashboard/cart']").click();
    await page.locator('text= Buy Now').click();
    const email = page.locator('input.input.txt.text-validated.ng-pristine');
    console.log(await email.inputValue());
    await expect(email).toBeVisible();
    await page.locator('[placeholder="Select Country"]').click();
    await page.locator('[placeholder="Select Country"]').pressSequentially("Ind");
    

    await page.locator('.ta-item.list-group-item.ng-star-inserted').nth(1).click();
    await page.locator('select.input.ddl').first().selectOption('02');
    await page.locator('select.input.ddl').last().selectOption('27');
    await page.locator('input.input.txt').nth(1).type('123');
    await page.locator('input.input.txt').nth(2).type('Rahul Gandu');
    await page.locator('input.input.txt').nth(3).type('rahulshettyacademy');
    await page.locator('button[type="submit"]').click();
    const cuppon_code = console.log(await page.locator('.mt-1.ng-star-inserted').textContent());
    await expect(page.locator('.mt-1.ng-star-inserted')).toBeVisible();
    await page.locator('.btnn.action__submit').click();
    const Confirmation_text = page.locator('.hero-primary')
    await expect(Confirmation_text).toBeVisible();
    const confirmationMessage = await Confirmation_text.textContent();
    console.log(confirmationMessage);
    const Order_detals = await page.locator('label.ng-star-inserted').textContent();
    const Order_ID = await Order_detals.split(' | ');
    const Neworder = await (Order_ID[1]);
    console.log(Neworder);
    await page.locator('button[routerlink="/dashboard/myorders"]').first().click();
    await page.locator('[scope="row"]').first().waitFor();

    const OrderIDs = await page.locator('[scope="row"]').allTextContents();
    const Total = await page.locator('[scope="row"]').count();

    for (let i = 0; i < Total; i++) {
        if (OrderIDs[i].trim() === Neworder.trim()) {
            console.log('Your Matched Odered ID is :-', OrderIDs[i]);
            await page.locator('tbody tr').nth(i).locator('.btn.btn-primary').click();
        }
        break;
    }
    await page.pause();
});