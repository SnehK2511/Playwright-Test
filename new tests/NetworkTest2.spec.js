const { expect, test } = require('@playwright/test')

test("Verify Unauthorized message while accessing the another user orderid:", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('input[type="email"]').fill('alexsmith77@example.com');
    await page.locator('input[type="password"]').fill('Test@1234');
    await page.locator('input[type="submit"]').click();
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    await products.first().waitFor();

    await page.locator('button[routerlink="/dashboard/myorders"]').first().click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a93e65d21054ba465fd5ccc",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6" })
    )

    await page.getByRole('button', { name: 'View' }).first().click();
    await expect(page.getByText("You are not authorize to view this order")).toBeVisible();
    console.log("Yes you are successed");
    await page.pause();

})