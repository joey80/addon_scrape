const puppeteer = require('puppeteer');
const addOns = require('./addOns').addOns;
var exports = module.exports = {};

exports.scraper = (function() {

    let browser;
    let page;
    let results = [];
    let version;

    const scrape = async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    
        for (let addOn of addOns) {
           await getUpdate(addOn.name, addOn.url, addOn.element);
        }
        
        await browser.close();
        console.log(results);
    };

    const getUpdate = async (name, url, element) => {
        console.log(`Retrieving ${name} ...`);
    
        await page.goto(url, {waitUntil: 'networkidle2'});
    
        // get raw div contents ex: 3.1.1 - 2019-01-22
        const innerText = await page.$eval(element, el => el.innerText);
    
        // Change this to seperate into arrays and only keep the one with decimals
        const cleanIt = innerText.replace(/[^0-9.]/g, " ");
        const splits = cleanIt.split(" ");
    
        // If the array includes a decimal, keep that one and then get out
        for (let split of splits) {
            if (split.includes('.')) {
                version = split;
                break;
            }
        }
    
        // save the clean data to an object
        let result = {
            "name": name,
            "version": version
        };
    
        // Push it to the final array
        results.push(result);
    };

    return {
        init: function() {
            scrape();
        }
    };

})();