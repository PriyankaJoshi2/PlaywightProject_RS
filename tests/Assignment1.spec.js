const {test, expect} = require('@playwright/test');

test('Assignment 1', async ({page})=>
{
    const email = page.locator("input#userEmail");
    const password = page.locator("input#userPassword");
    const LogIn = page.locator("[value='Login']");
    

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await email.fill("dummttest123@gmail.com");
    await password.fill("Test@123");
    await LogIn.click();

     //to wait until all the Network calls are made and the page is fully loaded
     //await page.waitForLoadState('networkidle');// this is flaky

     //Another method
     await page.locator("div.card-body b").first().waitFor();


     const titles = await page.locator("div.card-body b").allTextContents();
     console.log(titles);

  



    
});