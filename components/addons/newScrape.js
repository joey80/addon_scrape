const puppeteer = require('puppeteer')
const addOns = require('./addOns').addOns
var exports = (module.exports = {})

exports.scraper = (function () {
  let browser
  let page
  let results = []
  let version

  const getNewPage = async (browser) => {
    let page = await browser.newPage()
    page.on('error', (err) => {
      if (!page.isClosed()) {
        //Close page if not closed already
        page.close()
      }
    })
    return page
  }

  const scrape = async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    })
    page = await browser.newPage()

    for (let addOn of addOns) {
      await getUpdate(addOn, browser)
    }

    await browser.close()
    console.log(results)
  }

  const getUpdate = async ({ name, url, element }, browser) => {
    console.log(`Retrieving ${name} ...`)

    try {
      if (page.isClosed()) {
        page = await getNewPage(browser)
      }

      await page.goto(url, { waitUntil: 'networkidle2' })

      // get raw div contents ex: 3.1.1 - 2019-01-22
      const innerText = await page.$eval(element, (el) => el.innerText)

      // Change this to seperate into arrays and only keep the one with decimals
      const cleanIt = innerText.replace(/[^0-9.]/g, ' ')
      const splits = cleanIt.split(' ')

      // If the array includes a decimal, keep that one and then get out
      for (let split of splits) {
        if (split.includes('.')) {
          version = split
          break
        }
      }

      // save the clean data to an object
      let result = {
        name: name,
        version: version,
      }

      // Push it to the final array
      results.push(result)
    } catch (error) {
      console.log(
        'FE error with\n\n' + error + '\n\nRefreshing page and continuing profile switching'
      )
      await page.reload()
    }
  }

  return {
    init: function () {
      scrape()
    },
  }
})()
