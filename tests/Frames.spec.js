   

   const { test , expect } = require('@playwright/test');


   test('Handle pop up and frames' , async ({page})=>


     {
      
       await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
       //await page.goto("https://google.com");

      //  await page.goBack(); //Navigating back to the previous page
      //  await page.goForward(); //Navigating forward to the next page


      await expect(page.locator("#displayed-text")).toBeVisible();
      await page.locator("#hide-textbox").click();
      await expect(page.locator("#displayed-text")).toBeHidden();

      //Handle javascript pop ups 
      page.on('dialog' , dialog =>dialog.dismiss()); //accept() to accept the pop up and dismiss() to cancel the pop up
      await page.locator("#confirmbtn").click();


      //To Hover over an element
      await page.locator("#mousehover").hover();
      












       


     });