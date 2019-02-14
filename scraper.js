const puppeteer = require('puppeteer');

let browser;
let page;
let results = [];
const addOns = [
    {
        "name": "awEEsome Icons",
        "url": "https://devot-ee.com/add-ons/aweesome-icons",
        "element": ".addon-download > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(3)"
    },
    {
        "name": "Ansel",
        "url": "https://buzzingpixel.com/software/ansel-ee/changelog",
        "element": "div.block-changelog:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(2)"
    },
    {
        "name": "Calendar",
        "url": "http://docs.solspace.com/expressionengine/calendar/v3/setup/changelog.html",
        "element": "html body div#app div.theme-container main.page div.content.default h2:first-of-type"
    },
    {
        "name": "CartThrob",
        "url": "https://www.cartthrob.com/docs/pages/change_log/index.html",
        "element": "html body div#content.container div.row div.span11.docs-content h3:first-of-type"
    },
    {
        "name": "CE Image",
        "url": "https://docs.causingeffect.com/expressionengine/ce-image/change-log.html",
        "element": "div.software-info:nth-child(3) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2)"
    },
    {
        "name": "Channel Files",
        "url": "https://eeharbor.com/channel-files",
        "element": "div.release-version:nth-child(4) > span:nth-child(2)"
    },
    {
        "name": "Channel Images",
        "url": "https://eeharbor.com/channel-images",
        "element": "div.release-version:nth-child(4) > span:nth-child(2)"
    },
    {
        "name": "Construct",
        "url": "https://buzzingpixel.com/software/construct/changelog",
        "element": "div.block-changelog:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(2)"
    },
    {
        "name": "Custom System Messages",
        "url": "https://boldminded.com/add-ons/csm/change-log",
        "element": ".grid-col > div:nth-child(3) > h3:nth-child(2)"
    },
    {
        "name": "Data Grab",
        "url": "https://devot-ee.com/add-ons/datagrab",
        "element": "#addon-commercial"
    },
    {
        "name": "Detour Pro",
        "url": "https://eeharbor.com/detour-pro/changelog",
        "element": "div.changelog:nth-child(1) > h2:nth-child(2)"
    }
];

const getUpdate = async (name, url, element) => {
    await page.goto(url, {waitUntil: 'networkidle2'});
    const innerText = await page.$eval(element, el => el.innerText);
    // Strip out the word '3rd' and any character that is not a number or decimal
    const first = innerText.replace("3rd", "");
    const second = first.replace(/[^0-9.]/g, "");
    let result = {
        "name": name,
        "version": second
    };
    results.push(result);
};

const init = async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    for (let i = 0; i < addOns.length; i++) {
        await getUpdate(addOns[i].name, addOns[i].url, addOns[i].element);
    }

    await browser.close();
    console.log(results);
}

init();