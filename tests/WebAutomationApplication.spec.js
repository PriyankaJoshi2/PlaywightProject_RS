const {test, expect} = require('@playwright/test');


test('Web Application Demo', async ({page})=>
{
    const email = page.locator("input#userEmail");
    const password = page.locator("input#userPassword");
    const LogIn = page.locator("[value='Login']");
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    

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

     //Get counts of products
     const count = await products.count();
     
     for(let i=0;i<count;i++)
     {
        //chaining locator using .locator ,instead to seaching entinire dom it will start from the current locator
        if(await products.nth(i).locator("b").textContent() === productName)
        {
            //Add to cart
           await products.nth(i).locator("text= Add To Cart").click();
           break;


        }


     }

     await page.pause();






  



    
});