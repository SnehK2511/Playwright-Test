class APIutils {
    constructor(Request, LoginData) {
        this.Request = Request;
        this.LoginData = LoginData;

    }

    async gettoken() {
        const LoginURL = await this.Request.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.LoginData
            }
        )
        const NewJsonData = await LoginURL.json();
        const LoginToken = NewJsonData.token;
        console.log(LoginToken);
        return LoginToken;
    }

    async getOrderID(OrderIdData) {
        let response = {};
        response.token = await this.gettoken();
        const order_response = await this.Request.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: OrderIdData,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'

            },
        })
        const Ordered_response_json = await order_response.json();
        console.log('Ordered Page Jason Data:-', Ordered_response_json)
        const Ordered_ID = Ordered_response_json.orders[0];
        response.Ordered_ID = Ordered_ID
        return response;
    }
}
module.exports = { APIutils }