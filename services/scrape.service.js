import puppeteer from 'puppeteer';
// import puppeteerConfig from './.puppeteerrc.cjs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


export async function scrapeForm(data) {
  const browser = await puppeteer.launch({
    headless: false, // Launch a visible browser window
    defaultViewport: null, // Set the viewport to the default size
    cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  });

  const page = await browser.newPage();
  const url = 'https://docs.google.com/forms/d/e/1FAIpQLSc11wDSie5jCHXp1lmJ0yP65t3eQZIjTA_Plna7NZHi9URA-Q/viewform?fbzx=1572039827529357247'; // Replace with the desired URL

  await page.goto(url);

  // Wait for the input fields to be visible
  const inputFields = await page.$$('input[jsname="YPqjbf"]');
  const db = [{ name: 'שני אהרון', num: '11234' }]
  const user = db[0]
  console.log('data', data.vendor)
  await inputFields[0].type(data._id);
  await inputFields[1].type(data.vendor);

  // Collect all options with jsname="wQNmvb" inside the V68bde container
  const options = await page.evaluate(() => {
    const options = Array.from(document.querySelectorAll('[jsname="wQNmvb"]'));
    console.log('options', options);
    options[1].click()
    return options.map(option => option.innerText);
  });

  await page.waitForNavigation();


  await browser.close();
  return options;
}
