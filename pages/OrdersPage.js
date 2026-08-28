exports.orders = class Orderspage {

    constructor(page) {

        this.page = page
        this.Order_detals = page.locator('label.ng-star-inserted')
        this.orderHistory = page.locator('button[routerlink="/dashboard/myorders"]')
        this.orderTable = page.locator('[scope="row"]')
        this.OrderRow = page.locator('tbody tr')

    }

    async Order() {

        const Order_detals = await this.Order_detals.textContent();
        const Order_ID = await Order_detals.split(' | ');
        const Neworder = await (Order_ID[1]);
        console.log(Neworder);
        await this.orderHistory.first().click();
        await this.orderTable.first().waitFor();

        const OrderIDs = await this.orderTable.allTextContents();
        const Total = await this.orderTable.count();

        for (let i = 0; i < Total; i++) {
            if (OrderIDs[i].trim() === Neworder.trim()) {
                console.log('Your Matched Odered ID is :-', OrderIDs[i]);
                await this.OrderRow.nth(i).locator('.btn.btn-primary').click();
            }
            break;

        }

    }

}