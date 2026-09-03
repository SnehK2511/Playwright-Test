const { request, expect } = require('@playwright/test')

exports.apiAssignmentUtils = class apiAssignmentUtils {
    constructor(apiRequest, loginData) {
        this.apiRequest = apiRequest,
            this.loginData = loginData
    }

    async login() {
        const response = await this.apiRequest.post(
            "https://api.eventhub.rahulshettyacademy.com/api/auth/login",
            {
                data: this.loginData,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        await expect(response).toBeOK();
        const responseJson = await response.json();
        const token = responseJson.token;
        console.log("Token received ✅");
        await this.apiRequest.dispose();
        return token;
    }
}