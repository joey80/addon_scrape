const puppeteer = require('puppeteer');

const getInfo1 = async (url) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle2'});
        const innerText = await page.evaluate(() => document.querySelector('.sidebar-download').innerText);
        const answer = innerText.slice(10, innerText.length);
        console.log('AwEEsome Icons', answer);
        await browser.close();
};

const getInfo2 = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'});
    const innerText = await page.evaluate(() => document.querySelector('.content > h2').innerText);
    const answer = innerText.slice(1, -13).trim();
    console.log('Calendar', answer);
    await browser.close();
};

getInfo1('https://devot-ee.com/add-ons/aweesome-icons');
getInfo2('http://docs.solspace.com/expressionengine/calendar/v3/setup/changelog.html');