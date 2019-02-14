const puppeteer = require('puppeteer');

let browser;
let page;

const awesomeIcons = async (url) => {
    await page.goto(url, {waitUntil: 'networkidle2'});
    const innerText = await page.evaluate(() => document.querySelector('.sidebar-download').innerText);
    const answer = innerText.slice(10, innerText.length);
    console.log('AwEEsome Icons', answer);
};

const calendar = async (url) => {
    await page.goto(url, {waitUntil: 'networkidle2'});
    const innerText = await page.evaluate(() => document.querySelector('.content > h2').innerText);
    const answer = innerText.slice(1, -13).trim();
    console.log('Calendar', answer);
};

const init = async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await awesomeIcons('https://devot-ee.com/add-ons/aweesome-icons');
    await calendar('http://docs.solspace.com/expressionengine/calendar/v3/setup/changelog.html');
    await browser.close();
}

init();