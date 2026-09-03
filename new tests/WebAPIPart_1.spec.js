const { test, expect, request } = require('@playwright/test');
const { APIutils } = require('./utils/APIutils');
const LoginData = { userEmail: "alexsmith1998@example.com", userPassword: "Test@1234" }
const OrderIdData = { orders: [{ country: "Japan", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
let response;

test.beforeAll(async () => {
    const Request = await request.newContext();
    const apiutil = new APIutils(Request, LoginData)
    response = await apiutil.getOrderID(OrderIdData)


})
test("Api Testing", async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);


    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('button[routerlink="/dashboard/myorders"]').first().click();
    await page.locator('[scope="row"]').first().waitFor();

    const OrderIDs = await page.locator('[scope="row"]').allTextContents();
    const Total = await page.locator('[scope="row"]').count();

    for (let i = 0; i < Total; i++) {
        if (OrderIDs[i].trim() === response.Ordered_ID.trim()) {
            console.log('Your Matched Odered ID is :-', OrderIDs[i]);
            await page.locator('tbody tr').nth(i).locator('.btn.btn-primary').click();
        }
        break;
    }
    await page.pause();
})
