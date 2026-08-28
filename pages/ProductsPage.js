exports.e2e = class productdetails {

    constructor(page) {
        this.page = page
        this.Products = page.locator(".card-body")
        this.Toast = page.locator('[role="alert"]')


    }

    async AddToCart() {

        const productName = "ZARA COAT 3";
        await this.Products
        await this.Products.first().waitFor()
        const totalProduct = await this.Products.count()

        console.log("Total Products:", totalProduct);

        for (let i = 0; i < totalProduct; i++) {
            const title = await this.Products.nth(i).locator("b").textContent();
            console.log(title);
            if (title.trim() === productName) {
                console.log("Product Found");
                await this.Products.nth(i).locator("text=Add To Cart").click();
                break;
            }
        }
    }

    async verifyProductAdded() {
        await this.Toast.waitFor({ state: "visible" });
        console.log(await this.Toast.innerText());
    }


}