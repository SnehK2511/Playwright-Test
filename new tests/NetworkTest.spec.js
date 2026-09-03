const { test, expect, request } = require('@playwright/test');
const { APIutils } = require('./utils/APIutils');
const LoginData = { userEmail: "alexsmith1998@example.com", userPassword: "Test@1234" };
const OrderIdData = { orders: [{ country: "Japan", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const FakePlayload = { data: [], message: "No Orders" };
let response;

//Apiutil call
test.beforeAll(async () => {
    const Request = await request.newContext();
    const apiutil = new APIutils(Request, LoginData);
    response = await apiutil.getOrderID(OrderIdData);
});


test("Chek Message When My Order Page is Empty", async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");

    // ❌ REMOVE THIS CLICK FROM HERE
    // await page.locator('button[routerlink="/dashboard/myorders"]').first().click();
    // ✅ KEEP YOUR SAME ROUTE CODE, BUT CHANGE THE URL

    await page.route("**/api/ecom/order/get-orders-for-customer**",
        async route => {
            const response = await page.request.fetch(route.request())
            let body = JSON.stringify(FakePlayload);
            await route.fulfill(
                {
                    response,
                    body
                });
        }
    );


    // ✅ NOW CLICK My Orders
    await page.locator('button[routerlink="/dashboard/myorders"]').first().click();
    await page.waitForResponse("**/api/ecom/order/get-orders-for-customer**");
    console.log(await page.locator('.mt-4').textContent());
    await page.pause();

});