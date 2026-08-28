const { test, expect, request } = require('@playwright/test');
let LoginToken = {};

test.beforeAll(async () => {
    const Request = await request.newContext();
    const user = {
        KiseData:
        {
            userEmail: "kiseryota12@gmail.com",
            userPassword: "Test@123"

        },
        DaikiData:
        {
            userEmail: "daikiaomine123@gmail.com",
            userPassword: "Test@123"
        },
        SatsukiMomoi:
        {
            userEmail: "satsukimomoi12@gmail.com",
            userPassword: "Test@123"
        },
        TestsuyaKuroko:
        {
            userEmail: "tetsuyakuroko12@gmail.com",
            userPassword: "Test@123"
        }

    };
    // read the notes "494 # 9. API LOGIN + MULTIPLE USERS" for the for loop concept
    for (const [username, userdata] of Object.entries(user)) {
        const response = await Request.post(
            'https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: userdata
            }
        )
        expect(response.ok()).toBeTruthy();
        const jsondata = await response.json();
        LoginToken[username] = jsondata.token;
        console.log(username, ":", LoginToken[username]);;
    };

})


test("MultiPleUserLongin via API", async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, LoginToken.DaikiData);

    await page.goto('https://rahulshettyacademy.com/client/');


})

