import {test , expect} from '@playwright/test' ;
test ('register form with getby method' , async ({page})  =>
{

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator ('input[name="name"]').nth(0).fill('smith');
    await page.locator ('input[name="email"]').fill('babaji@test.com');
    await page.getByPlaceholder ("Password").fill('babaji@123');
    await page.getByLabel ('Check me out if you Love IceCreams!').check();
    await page.getByLabel ('Gender').selectOption('Female');
    await page.getByLabel ('Employed').click();
    await page.getByRole ('button', {name: 'submit'}).click();
    await page.getByText ('Success! The Form has been submitted successfully!.').isVisible();

    
});