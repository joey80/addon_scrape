const puppeteer = require('puppeteer');

let browser;
let page;
let results = [];
const addOns = {
    
}

const getUpdate = async (name, url, elm) => {
    await page.goto(url, {waitUntil: 'networkidle2'});
    const innerText = await page.$eval(elm, el => el.innerText);
    let result = {
        "name": name,
        "version": innerText
    };
    results.push(result);
};

const init = async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await getUpdate('awEEsome Icons', 'https://devot-ee.com/add-ons/aweesome-icons', '.sidebar-download');
    await getUpdate('Calendar', 'http://docs.solspace.com/expressionengine/calendar/v3/setup/changelog.html', '.content > h2');
    await browser.close();
    console.log(results);
}

init();