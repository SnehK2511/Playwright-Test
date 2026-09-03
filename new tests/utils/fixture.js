const base = require('@playwright/test')
const {request} = require('@playwright/test')
const { APIutils } = require('./APIutils.js');
const LoginData = { userEmail: "alexsmith1998@example.com", userPassword: "Test@1234" };
const OrderIdData = { orders: [{ country: "Japan", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;

exports.customtest = base.test.extend({
    authenticatedPage: async ({ page }, use) => {
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.locator('input[type="email"]').fill('alexsmith1998@example.com');
        await page.locator('input[type="password"]').fill('Test@1234');
        await page.locator('input[type="submit"]').click();
        const productName = "ZARA COAT 3";
        const products = page.locator(".card-body");
        await products.first().waitFor();

        await use(page);
        //tear down : below use perameter mentioned code is on hold and not executed 
    },

    createOrderID: async({}, use) =>{

        const Request = await request.newContext();
        const apiutil = new APIutils(Request, LoginData);
        response = await apiutil.getOrderID(OrderIdData);
        use(response);
        await Request.dispose();

    },

    testDataOrder:
    {
        ProductName : 'LenovoLOQ',
    }
});