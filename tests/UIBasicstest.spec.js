//import annotations from jars
const {test, expect} = require('@playwright/test');
 // for assertions we need to import expect from the config file


//because we use await we need to add async to the function declaration
// test('Playwright First Test',async function()


// {

// });


// test('Browser Context Playwright Test', async ({ browser })=>
// {
//      const context = await browser.newContext();
//      const page = await  context.newPage();
//page.goto("https://rahulshettyacademy.com/loginpagePractice/");
// });

test('Page Context Playwright Test', async ({ page })=>
{
await page.goto("https://google.com");
console.log (await page.title());
await expect(page).toHaveTitle("Google");
//to get the title of the page

});

test.only('Playwright Test', async ({ page })=>
{
const userName = page.locator('input#username');
const signIn = page.locator("input#signInBtn");
const cardTitles = page.locator("div.card-body a");




await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await userName.fill("rahulshetty");
await page.locator("[type ='password']").fill("Learning@830$3mK2");
await signIn.click();


//Extracting text from browser and inserting valid expect assertions in test, blinking error msg
console.log(await page.locator("[style*='block']").textContent());//to grab the text content of the element


//To make sure error message is correct
await expect(page.locator("[style*='block']")).toContainText("Incorrect");//Can add partiall text


//To clear existing text in the field
await userName.fill("");//to clear the existing text in the field
await userName.fill("rahulshettyacademy");//to fill the field with new text

await signIn.click();

//To grab the text content of first element
//await page.locator("div.card-body a").textContent(); //will fail bcz it return 4 elements

//To grab first element use indexing method
//console.log(await cardTitles.nth(1).textContent());

//Another method is to use first() method
//console.log(await cardTitles.first().textContent());


//To grab text of all the products
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);

//If we remove nth(1) and first() method line then the code withh fail bcz for textContent() method it wait till the element is visible 
//but for allTextContents there is no such thing bcs an array can return empty array so when we click on signin
//page is still loading but it thinks that its empty array













});