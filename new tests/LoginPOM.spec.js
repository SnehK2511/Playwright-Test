import { test, expect } from '@playwright/test';
import { registerUser } from '../pages/register';

test.only("Register New User", async ({ page }) => {
    const register = new registerUser(page);

    await register.goto();
    await register.Signup('Anita', 'Roy', 'sfgfgegeds@gmail.com', 'Test@12345', 'Test@12345', 'Engineer', '1234567890');

    await page.pause();
});
