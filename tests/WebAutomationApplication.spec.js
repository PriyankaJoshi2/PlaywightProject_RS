const {test, expect} = require('@playwright/test');


test('Web Application Demo', async ({page})=>
{
    const email = page.locator("input#userEmail");
    const password = page.locator("input#userPassword");
    const LogIn = page.locator("[value='Login']");
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const emailValue = "dummttest123@gmail.com";
    

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
        //chaining locator using .locator ,instead to seaching entire dom it will start from the current locator
        if(await products.nth(i).locator("b").textContent() === productName)
        {
            //Add to cart
           await products.nth(i).locator("text= Add To Cart").click();
           break;


        }


     }

       await page.locator("[routerlink*='cart']").click();
       //wait fot tag name to load
       await page.locator("div li").first().isVisible();
       const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //Text based locator
       //IsVisible does not have auto wait property
       //expect(bool).toBeTruthy();

       //To click on checkout
       await page.locator("text=Checkout").click();

       await page.locator("[placeholder*= Country]").type("ind");
       
       const dropdownOptions = page.locator("section.ta-results");
       await dropdownOptions.waitFor();

       const countOptions = await dropdownOptions.locator("button").count();

       for(let i=0;i<countOptions;i++)
       {
         const text = await dropdownOptions.locator("button").nth(i).textContent();
         if(text === " India")
         {
           await dropdownOptions.locator("button").nth(i).click();
           break;
         }
       }

       await expect(page.locator(".user__name [type='text']").first()).toHaveText(emailValue);
       console.log("abc");
       await page.locator(".action__submit").click();

       await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

       const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
       console.log(orderID);



        






  



    
});