exports.registerUser = class registerUser {

    constructor(page) {
        this.page = page
        this.registerUrl = page.click('.text-reset')
        this.firstname = page.locator('#firstName')
        this.lastname = page.locator('#lastName')
        this.email = page.locator('#userEmail')
        this.password = page.locator('#userPassword')
        this.confirmPasword = page.locator('#confirmPassword')
        this.occupation = page.locator('[formcontrolname="occupation"]')
        this.mobile = page.locator('#userMobile')
        this.gender = page.locator('input[value="Male"]')
        this.agreement = page.locator('input[type="checkbox"]')
        this.register = page.locator('#login')
        this.loginLink = page.locator('.btn.btn-primary')
        this.username = page.locator('input[type="email"]')
        this.userPass = page.locator('input[type="password"]')
        this.submit = page.locator('input[type="submit"]')
    }

    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }
    async Signup(firstname, lastname, email, password, confirmPasword, occupation, mobile) {
        await this.registerUrl
        await this.firstname.fill(firstname)
        await this.lastname.fill(lastname)
        await this.email.fill(email)
        await this.password.fill(password)
        await this.confirmPasword.fill(confirmPasword)
        await this.occupation.selectOption(occupation)
        await this.mobile.fill(mobile)
        await this.gender.check()
        await this.agreement.check()
        await this.register.click()
    }
    async Signin(username, userPass) {
        await this.loginLink.click()
        await this.username.fill(username)
        await this.userPass.fill(userPass)
        await this.submit.click()
    }

}


