const {Builder, By} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
require('chromedriver')

let HomePage = require('../pageobjects/homePage')
let CartPage = require('../pageobjects/cartPage')

const TIMEOUT = 10000

describe('Add products to cart', () => {
    beforeAll(async () => {

        //TODO add method to delete all old screenshots

        driver = await new Builder()
        .forBrowser('chrome')
        // If you dont want to open browser, uncomment line between comments
        //.setChromeOptions(new chrome.Options().addArguments('--headless'))
        //
        .build()
        driver.manage().setTimeouts({implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT})
        driver.manage().window().maximize()

        HomePage = new HomePage(driver)
        CartPage = new CartPage(driver)

        await HomePage.openUrl()
        
    })

    afterAll(async () => {
        await driver.quit()
    })
    afterEach(function() {
        HomePage.takeScreenShotIfTestFailed(expect.getState())
    })

    test('Test Open Web Page', async () => {
        await HomePage.verifyPageTitleContains('abebooks.com')
    })
})