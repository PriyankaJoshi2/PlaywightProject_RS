      const{ test , expect } = require('@playwright/test');

      test('Calendar Validation', async ({page}) =>

      {
         const monthNumber = "6";
         const date = "15";
         const year = "2027";

         const expectedList =[monthNumber,date,year];

       await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
       

       //to click on calendar icon
       await page.locator(".react-date-picker__inputGroup").first().click();
       await page.locator(".react-calendar__navigation__label").click();
       await page.locator(".react-calendar__navigation__label").click();
       await page.getByText(year).click();


       //to select month
       //cannot apply minus to string "6" so we need to convert it into number
       await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
       await page.locator("//abbr[text()='"+date+"']").click();

       //to get the values from dom like month, date and year
       const inputs = await page.locator(".react-date-picker__inputGroup .react-date-picker__inputGroup__input");

       for(let i=0;i<expectedList.length;i++)

        {
            const value = await inputs.nth(i).inputValue();
            expect(value).toEqual(expectedList[i]);
        }


       });
