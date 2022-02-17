import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

// https://www.scrapingbee.com/documentation/#proxy-mode
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--proxy-server=proxy.scrapingbee.com:8886'],
        ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();
    await page.authenticate({
        username: process.env.scrapingBeeApiKey,
        password: 'render_js=False'
    });

    // await page.goto('http://lumtest.com/myip.json');

    await page.goto('https://sos.iowa.gov/search/business/search.aspx');
    await page.type('#txtName', 'pizza');
    await page.click('[type="submit"]');

    await page.waitForTimeout(25000);

    await browser.close();

})();