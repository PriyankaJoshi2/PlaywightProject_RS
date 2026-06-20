    
    
         const{test,expect} = require('@playwright/test');

         

         const email = "dummttest123@gmail.com";
         const password = "Test@123";
         const BASE_URL = "https://eventhub.rahulshettyacademy.com";

         async function login(page)
         {
            await page.goto(`${BASE_URL}/login`);
            await page.locator("input#email").fill(email);
            await page.locator("input#password").fill(password);
            await page.locator("button[type='submit']").click();
            await page.waitForLoadState('networkidle');
            //await expect(page.locator("input#event-title-input")).toBeVisible();
            //await expect(page.getByText("Browse Events")).toBeVisible();
         }

         function futureDateValue()
         {
            const date = new Date();
            date.setDate(date.getDate() + 2);

            
            const year = date.getFullYear();
            const month = String(date.getMonth() +1).padStart(2, '0');
            const dateValue = String(date.getDate()).padStart(2, '0');

            return  `${year}-${month}-${dateValue}T10:00`;


         }
        
      test('create event via UI, book it, and verify seat reduction', async({page})=>
        
        {
    
         await login(page);
         await page.goto(`${BASE_URL}/admin/events`);
         const description = 'This is a test event created by Playwright automation.';
         const city = 'Bangalore';
         const venue = 'Test Venue';
         const title = `Test Event ${Date.now()}`;
         

         await page.locator("input#event-title-input").fill(title);
         await page.locator("textarea[placeholder*='event']").fill(description);

         await page.locator("input#city").fill(city);
         await page.locator("input#venue").fill(venue);

         await page.locator("input[id='event-date-&-time']").fill(futureDateValue());
         await page.locator("input[id='price-($)']").fill("100");

         await page.locator("#total-seats").fill("50");


         await page.locator("button[type='submit']").click();


         await expect(page.getByText('Event created!')).toBeVisible();



      });


       test.only (' Find the event card and capture seats' , async ({page})=>
        
        
        {

           await login(page);
           await page.goto(`${BASE_URL}/events`);
           

           await page.waitForLoadState('networkidle');

           const eventCard = await page.locator("#event-card");

           await expect(eventCard.first()).toBeVisible();


           const eventCount = await eventCard.count();
    

           for(let i=0; i<eventCount ; i++)


            {
                const eventTitle =  await eventCard.nth(i).locator("h3.font-semibold").textContent();

                if(await eventTitle.includes("Test Event"))
                {
                const seatText = await eventCard.nth(i).locator("text=/seats available/i").textContent();
                const seatsBeforeBooking = parseInt(seatText.split(" ")[0]);
                console.log(seatsBeforeBooking);

                await eventCard.nth(i).locator("text=Book Now").click();
                console.log("clicked on book now button");



        


                }

                

            }



        });


       


        
          




        