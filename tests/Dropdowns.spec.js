const {test, expect} = require('@playwright/test');

     test('Dropdown Test', async ({page})=>

    {
     const userName = page.locator('input#username');
     const signIn = page.locator("input#signInBtn");
     const cardTitles = page.locator("div.card-body a");
     const dropdown = page.locator("select.form-control");
     const documentLink = page.locator("[href*=documents-request]");


     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

     //Static Dropdowns >> Options are already defined >> Tagname will be Select in HTML
     await dropdown.selectOption("consult");

     


     //To select Radio button
     await page.locator("span.radiotextsty").last().click();


     //Web Based Popup
     await page.locator("button#okayBtn").click();


     //To verify user radio button is selected
     await expect(page.locator(".radiotextsty").last()).toBeChecked();

     //Another method for verifying user radio button is selected
     console.log(await page.locator(".radiotextsty").last().isChecked()); //will return boolean value
     //This is not assertion just a method to check in console if the radio button is selected or not


     await page.locator("input#terms").click();
     await expect(page.locator("input#terms")).toBeChecked();
     //await is used outside because it performs actionn outside the block

     //To uncheck the checkbox
     await page.locator("input#terms").uncheck();
     

     //For Uncheck we don't have any assertion, but we can use the method isChecked to verify if the checkbox is unchecked
     expect(await page.locator("input#terms").isChecked()).toBeFalsy();
     //await is used inside because it performs actionn inside


     //Verify blinking text
     await expect(documentLink).toHaveAttribute("class","blinkkingText");
     

     //To pause execution before closing test// opens playwright inspector
     // await page.pause();

    });





     // Handling Child windows
       
     test.only('Child window handling', async ({browser})=>

     {
     const context = await browser.newContext();
     const page = await context.newPage();
     const documentLink = page.locator("[href*=documents-request]");
     const userName = page.locator('input#username');


     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");


     //await documentLink.click();//here only new page is opening
     //To open new page on same context
     //const page2 = await context.waitForEvent('page');// listen for any new page to open but page is already opened in above step
     //so no point to listen after page is opened.

     //If we write  await context.waitForEvent('page') before documentLink.click();, won't work because for event fist click should be made
     //In js there are three forms of promise - pending , rejected and fulfilled. So if we write await context.waitForEvent('page') before documentLink.click();, it will be in pending state and will wait for the event to happen but since click is not yet happened, it will wait indefinitely and test will fail.
     // WE nedd to execute both the step parallely so need not to put await


     const [newPage] = await Promise.all ( //waitForEvent returns a newpage object and click is just a click
        [
            context.waitForEvent('page'),// will not add await bcz we want them to execute parallely
            documentLink.click(),

        ])
     //As the first step does not have await promise will be pending and will move to step 2
     //It will come out of block after all the steps in the block are executed i.e fulfilled

     const text = await newPage.locator("p.red").textContent();
     console.log(text);

     //To split and get the required text
     const arrayText =  text.split("@");
     const domain = arrayText[1].split(" ")[0];
     console.log(domain);

     //To redirect to the main page
     await userName.fill(domain);
     //console.log(await userName.textContent());
     console.log(await userName.inputValue());
         
     });