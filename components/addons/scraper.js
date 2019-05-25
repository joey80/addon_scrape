const puppeteer = require('puppeteer');

let browser;
let page;
let results = [];
let version;
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
    },
    {
        "name": "Field Limits",
        "url": "https://buzzingpixel.com/software/field-limits/changelog",
        "element": "div.block-changelog:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(2)"
    },
    {
        "name": "Field Pack",
        "url": "https://eeharbor.com/fieldpack/changelog",
        "element": "div.changelog:nth-child(1) > h2:nth-child(2)"
    },
    {
        "name": "Forms",
        "url": "https://eeharbor.com/forms",
        "element": "div.release-version:nth-child(2) > span:nth-child(2)"
    },
    {
        "name": "FreeForm",
        "url": "http://docs.solspace.com/expressionengine/freeform/v1/setup/changelog.html",
        "element": "html body div#app div.theme-container main.page div.content.default h2:first-of-type"
    },
    {
        "name": "Low Reorder",
        "url": "https://gotolow.com/addons/low-reorder/changelog",
        "element": ".addon-meta > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)"
    },
    {
        "name": "Low Search",
        "url": "https://gotolow.com/addons/low-search/changelog",
        "element": ".addon-meta > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)"
    },
    {
        "name": "Low Seg2Cat",
        "url": "https://gotolow.com/addons/low-seg2cat/changelog",
        "element": ".addon-meta > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)"
    },
    {
        "name": "Matrix",
        "url": "https://eeharbor.com/matrix/changelog",
        "element": "div.changelog:nth-child(1) > h2:nth-child(2)"
    },
    {
        "name": "Mo' Variables",
        "url": "https://devot-ee.com/add-ons/mo-variables",
        "element": ".btn-standard"
    },
    {
        "name": "Playa",
        "url": "https://eeharbor.com/playa/changelog",
        "element": "div.changelog:nth-child(1) > h2:nth-child(2)"
    },
    {
        "name": "Publisher Lite",
        "url": "https://boldminded.com/add-ons/publisher",
        "element": ".nav_content_right"
    },
    {
        "name": "Safe Harbor",
        "url": "https://eeharbor.com/safeharbor/changelog",
        "element": "div.changelog:nth-child(1) > h2:nth-child(2)"
    },
    {
        "name": "SEO Lite",
        "url": "https://devot-ee.com/add-ons/seolite",
        "element": ".addon-download > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(3)"
    },
    {
        "name": "Sitemap Module",
        "url": "https://devot-ee.com/add-ons/sitemap-module",
        "element": "#addon-commercial"
    },
    {
        "name": "Snaptcha",
        "url": "https://devot-ee.com/add-ons/snaptcha",
        "element": "#addon-commercial"
    },
    {
        "name": "Structure",
        "url": "https://eeharbor.com/structure/changelog",
        "element": "div.changelog:nth-child(1) > h2:nth-child(2)"
    },
    {
        "name": "User",
        "url": "https://eeharbor.com/user/changelog",
        "element": "div.changelog:nth-child(1) > h2:nth-child(2)"
    },
    {
        "name": "Visitor",
        "url": "https://eeharbor.com/visitor/changelog",
        "element": "div.changelog:nth-child(1) > h2:nth-child(2)"
    },
    {
        "name": "Wygwam",
        "url": "https://eeharbor.com/wygwam/changelog",
        "element": "div.changelog:nth-child(1) > h2:nth-child(2)"
    }
];

const first = 'https://www.learnexportcompliance.com';

const newArray = ecti.map((url) => {
    return `${first}${url}`;
});

const getUpdate = async (name, url, element) => {
    console.log('Retrieving', name + ' ...');
    await page.goto(url, {waitUntil: 'networkidle2'});
    const innerText = await page.$eval(element, el => el.innerText);

    // Change this to seperate into arrays and only keep the one with decimals
    const cleanIt = innerText.replace(/[^0-9.]/g, " ");
    const splits = cleanIt.split(" ");

    for (let split of splits) {
        if (split.includes('.')) {
            version = split;
            break;
        }
    }

    let result = {
        "name": name,
        "version": version
    };

    results.push(result);
};

let finalArray = [];

const getNewUpdate = async (url) => {
    const response = await page.goto(url);
    const status = response._status;

    let newResult = {
        "link": url,
        "status": status
    };

    console.log(newResult);

    finalArray.push(newResult);
};

// Start puppeteer 
const init = async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    // for (let addOn of addOns) {
    //    await getUpdate(addOn.name, addOn.url, addOn.element);
    // }

    for (let item of newArray) {
        await getNewUpdate(item);
    }
    
    await browser.close();
    console.log(finalArray);
}

init();