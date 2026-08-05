const{test,expect}=require('@playwright/test');
test('error toast',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username=page.locator('#username');
    const password=page.locator('#password');
    const signInBtn=page.locator('#signInBtn');
    await username.fill('sneh');
    await password.fill('123456');
    await signInBtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await username.fill('');
    await username.fill('rahulshettyacademy');
    await password.fill('');
    await password.fill('Learning@830$3mK2');
    await signInBtn.click();
    console.log(await page.locator('.card-title a').nth(0).textContent());
    await page.pause();
    
});
