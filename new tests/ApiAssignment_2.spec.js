
// Yahoo API Login
//       ↓
// Get Token 🎫
//       ↓
// Get Event ID
//       ↓
// Create Yahoo Booking
//       ↓
// Gmail UI Login
//       ↓
// Gmail tries Yahoo Booking
//       ↓
// ❌ Access Denied
// 
    const { test, expect, request } = require('@playwright/test')
    const YahooLoginData = { email: "yamada012@yahoo.com", password: "Test@1234" }
    const GoogleLoginData = { email: "bunnyshanon786@gmail.com", password: "Sneh@2511" }
    const { ApiAssignment2Utils } = require('./utils/ApiAssignment2Utils')
    let Yahootoken;
    let Googletoken;
    let eventId;
    let yahooBookingId;
    let APIutilData;

    test.beforeAll(async () => {
        // Get Yahoo & Google Users Token
        const YahooApiReqest = await request.newContext();
        const GoogleApiReqest = await request.newContext();
        APIutilData = new ApiAssignment2Utils(YahooApiReqest, YahooLoginData, GoogleApiReqest, GoogleLoginData);
        Yahootoken = await APIutilData.getYahoousrToken();
        Googletoken = await APIutilData.getGoogleUsrToken();

        // Get Yahoo user Event ID
        eventId = await APIutilData.getYahoousrEventID();
        console.log("Yahoo usr EventID get successfully!!!");

        // Create Yahoo user Booking
        yahooBookingId = await APIutilData.getYahooBookingOrderID();
        console.log("Yahoo usr order booking id get successfully!!!!");
    });


    test("Google user cannot access Yahoo user's booking", async ({ page }) => {
        // Login as Google user
        await APIutilData.loginAs(page, GoogleLoginData);
        // Open Yahoo user's booking
        await page.goto(`https://eventhub.rahulshettyacademy.com/bookings/${yahooBookingId}`, { waitUntil: 'networkidle' });
        // Verify access denied
        await expect(page.getByText('Access Denied')).toBeVisible();
        await expect(page.getByText("You are not authorized to view this booking")).toBeVisible();
        await page.pause();
    });