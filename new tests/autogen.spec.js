const { test, expect, request } = require('@playwright/test');
const LoginData = {userEmail: "alexsmith1998@example.com", userPassword: "Test@1234"}
let LoginToken;

test.beforeAll(async()=>
{
    const Request = await request.newContext();
    const LoginURL = await Request.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: LoginData
        }
    )  
    expect(LoginURL.ok()).toBeTruthy();
    const NewJsonData = await LoginURL.json();
    LoginToken = NewJsonData.token; 
    console.log(LoginToken);

})
test("Api Testing", async({page}) =>{
   await page.addInitScript(value =>
    {
        window.localStorage.setItem('token', value);
    }, LoginToken);

    
    
    // await page.locator('input[type="email"]').fill('alexsmith77@example.com');
    // await page.locator('input[type="password"]').fill('Test@1234');
    // await page.locator('input[type="submit"]').click();
    await page.goto("https://rahulshettyacademy.com/client");
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

})
