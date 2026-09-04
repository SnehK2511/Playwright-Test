const { expect } = require('@playwright/test');

exports.ApiAssignment2Utils = class ApiAssignment2Utils {

    constructor(YahooApiReqest, YahooLoginData, GoogleApiReqest, GoogleLoginData) {
        this.YahooApiReqest = YahooApiReqest;
        this.YahooLoginData = YahooLoginData;
        this.GoogleApiReqest = GoogleApiReqest;
        this.GoogleLoginData = GoogleLoginData;
    }

    async getYahoousrToken() {
        console.log("Yahoo Login Data:", this.YahooLoginData);
        const YahooRequest = await this.YahooApiReqest.post(
            'https://api.eventhub.rahulshettyacademy.com/api/auth/login',
            {
                data: this.YahooLoginData,
                headers: {
                    'content-type': 'application/json'
                },
            }
        );
        await expect(YahooRequest.status()).toBe(200);
        const YahooJsonData = await YahooRequest.json();
        this.Yahootoken = YahooJsonData.token;
        console.log("Yahoo token received ✅")
        return this.Yahootoken;
    }

    async getGoogleUsrToken() {
        console.log("Google Login Data:", this.GoogleLoginData);
        const GoogleRequest = await this.GoogleApiReqest.post(
            'https://api.eventhub.rahulshettyacademy.com/api/auth/login',
            {
                data: this.GoogleLoginData,
                headers: {
                    'content-type': 'application/json'
                },
            }
        );
        await expect(GoogleRequest.status()).toBe(200);
        const GoogleJsonData = await GoogleRequest.json();
        const Googletoken = GoogleJsonData.token;
        console.log("Google token received ✅");
        console.log("Google token exists:", !!Googletoken);
        return Googletoken;
    }

    async getYahoousrEventID() {
        const EventsRequest = await this.YahooApiReqest.get(
            'https://api.eventhub.rahulshettyacademy.com/api/events',
            {
                headers: {
                    Authorization: `Bearer ${this.Yahootoken}`
                }
            }
        );
        await expect(EventsRequest.status()).toBe(200);
        const EventsJsonData = await EventsRequest.json();
        console.log("ALL EVENTS:", EventsJsonData.data);
        this.eventId = EventsJsonData.data.find(event => event.availableSeats > 0).id;
        console.log("Event ID >>>", this.eventId);
        return this.eventId;
    }

    async getYahooBookingOrderID() {
        const BookingRequest = await this.YahooApiReqest.post('https://api.eventhub.rahulshettyacademy.com/api/bookings', {
            headers: {
                Authorization: `Bearer ${this.Yahootoken}`,
                'content-type': 'application/json'
            },
            data: {
                eventId: this.eventId,
                customerName: "Yahoo User",
                customerEmail: this.YahooLoginData.email,
                customerPhone: "9876543210",
                quantity: 1
            }
        });
        console.log("Booking Status:", BookingRequest.status());
        console.log("Booking Response:", await BookingRequest.text());
        await expect(BookingRequest.status()).toBe(201);
        const BookingJsonData = await BookingRequest.json();
        const yahooBookingId = BookingJsonData.data.id;
        console.log("Yahoo Order Booking ID >>>", yahooBookingId);
        return yahooBookingId;
    }

    async loginAs(page, user) {
        await page.goto("https://eventhub.rahulshettyacademy.com/login");
        await page.locator('input[type="email"]').fill(user.email);
        await page.locator('input[type="password"]').fill(user.password);
        await page.getByRole('button', { name: 'Sign In' }).click();
        await expect(page).not.toHaveURL(/\/login/);
    }
}