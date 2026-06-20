    const {test, expect} = require('@playwright/test');

    test('Playwright Special Locators', async ({page})=>

    {
     
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //To select checkbox with label tagname
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check(); //to select only


    //to select dropdown with Select tag
    await page.getByLabel("Gender").selectOption("Female");


    //to enter text check for placeholder tagname in dom
    await page.getByPlaceholder("Password").fill("abc123");

    //getByRole >> to select buttons
    await page.getByRole("button", {name:"Submit"}).click();

    //to verify success message
     await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

     await page.getByRole("link" ,{name: "Shop"}).click();

     //If tagname is same and we have to select one product we can use filter method
     await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
     //only one button add is there so we did not use name in getByRole method



     //Sometimes getByLabel is not working on entering text in input field, for this edit box should also be inside label tag or if there is association between label and input field with for and id attribute.
    //Instead use placeholder

    });

