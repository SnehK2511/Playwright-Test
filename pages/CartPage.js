exports.Cart = class CartPage {
    constructor(page) {
        this.page = page
        this.CartButton = page.locator("button[routerlink='/dashboard/cart']")
        this.Buynow = page.locator('text= Buy Now')
    }

    async goToCart() {
        await this.CartButton.click();
        await this.Buynow.click();
    }

}