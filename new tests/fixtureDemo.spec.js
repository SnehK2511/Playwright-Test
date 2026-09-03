const { test, expect, requst } = require('@playwright/test');
const { customtest } = require('./utils/fixture')

customtest("Furure Demo", async ({ authenticatedPage, createOrderID, testDataOrder }) => {

    await authenticatedPage.goto("https://rahulshettyacademy.com/client/");
    await authenticatedPage.locator('button[routerlink="/dashboard/myorders"]').first().click();
    await authenticatedPage.locator('tbody').waitFor();
    console.log("Created Order ID:",createOrderID.Ordered_ID);
    console.log("Orders displayed on page:",await authenticatedPage.locator('tbody').innerText());
    await expect(authenticatedPage.getByText(createOrderID.Ordered_ID)).toBeVisible();
    console.log("New Products is:", testDataOrder.ProductName);
})