exports.LoginUser = class LoginUser 
{
    constructor(page)
    {
        this.page = page
        this.username = page.locator('input[type="email"]')
        this.userPass = page.locator('input[type="password"]')
        this.submit = page.locator('input[type="submit"]')
    }

    async gotoURL() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async LoginUser(username, userPass)
    {
        await this.username.fill(username)
        await this.userPass.fill(userPass)
        await this.submit.click()
    }


}
