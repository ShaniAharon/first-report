import puppeteer from 'puppeteer';
// import puppeteerConfig from './.puppeteerrc.cjs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


export async function scrapeForm(data) {
  console.log('data in', data);
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://docs.google.com/forms/d/e/1FAIpQLSc11wDSie5jCHXp1lmJ0yP65t3eQZIjTA_Plna7NZHi9URA-Q/viewform?pli=1');

await page.waitForNavigation()

  await page.waitForSelector("input[jsname='YPqjbf']");
  const inuputElem = await page.$$('input[jsname="YPqjbf"]')
  await inuputElem[0].type(data.num.slice(0,7));
  await inuputElem[1].type(data.name);

  // Wait for the dropdown to be visible
  await page.waitForSelector("div[jsname='wQNmvb']");
  const dropdownElem = await page.$('div[jsname="wQNmvb"]');
  await dropdownElem.click();

// Wait for the options to be visible
// await page.waitForSelector('div[jsname="WkxXtf"]');

// Click on the desired option (replace 'משמרת בוקר' with the actual text of the option)
await page.evaluate(() => {
  const option = document.querySelector('div[data-value="משמרת בוקר"]');

  option.click();
});

// Inject a script into the page to handle the beforeunload event
await page.evaluateOnNewDocument(() => {
  window.addEventListener('beforeunload', () => {
    // Perform cleanup or stop the process here
    console.log("Stopping the process...");
    browser.close();
    return Promise.resolve()
  });
});


  // await new Promise( res => setTimeout(res, 10 * 60 * 1000))

  // await browser.close();
  // return Promise.resolve()
}
