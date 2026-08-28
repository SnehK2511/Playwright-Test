import { test, expect } from '@playwright/test';
import { registerUser } from '../pages/register';
import { LoginUser } from '../pages/LoginPgae';
import { e2e } from '../pages/ProductsPage';
import { Cart } from '../pages/CartPage';
import { Checkout } from '../pages/CheckoutPage';
import { orders } from '../pages/OrdersPage'

test("Register New User", async ({ page }) => {
    const register = new registerUser(page);

    await register.goto();
    await register.Signup('Anita', 'Roy', 'sfgfgegeds@gmail.com', 'Test@12345', 'Test@12345', 'Engineer', '1234567890');

    await page.pause();
});

test.only("Order Prdoduct", async ({ page }) => {
    const Login = new LoginUser(page);
    const ProductPage = new e2e(page);
    const AddtoCart = new Cart(page);
    const Prod_Checkout = new Checkout(page);
    const Order_History = new orders(page);

    await Login.gotoURL();
    await Login.LoginUser('alexsmith77@example.com', 'Test@1234');

    await ProductPage.AddToCart();
    await ProductPage.verifyProductAdded();
    console.log('Product Added');

    await AddtoCart.goToCart();
    await Prod_Checkout.CardDetails();

    await Order_History.Order();
    await page.pause();

});
