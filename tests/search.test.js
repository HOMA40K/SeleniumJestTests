const {Builder, By} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
require('chromedriver')

let HomePage = require('../pageobjects/homePage')

const TIMEOUT = 10000

describe('Search products', () => {

    let driver

    beforeAll(async () => {

        //TODO add method to delete all old screenshots

        driver = await new Builder()
        .forBrowser('chrome')
        // If you dont want to open browser, uncomment line between comments
        .setChromeOptions(new chrome.Options().addArguments('--headless'))
        // 
        .build()
        driver.manage().setTimeouts({implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT})
        driver.manage().window().maximize()

        HomePage = new HomePage(driver)

        await HomePage.openUrl()
        const closeDumbMenu = By.className('modal-content')
        const closeDumbMenuButt = By.css('div.modal-header > button.close')
        //if (closeDumbMenu.isDisplayed()){
        await HomePage.clickButton(closeDumbMenuButt)
        //}
        await HomePage.agreeWithCookies()
        
    })

    afterEach(function() {
        HomePage.takeScreenShotIfTestFailed(expect.getState())
    })
    
    afterAll(async () => {
        await driver.quit()
    })


    test('Test Open Web Page', async () => {
        await HomePage.verifyPageTitleContains('Bookdepository.com')
    })

    test('Test Search by Keyword', async () => {

        await HomePage.searchForText('Harry Potter')
        await HomePage.verifySearchResultText('Harry Potter')
        await HomePage.verifyAllSearchItemsContainText('Harry Potter')
        await HomePage.verifySearchResultContainsMoreItemsThan(1)

    })

    test('Test Sort by price', async () => {

        await HomePage.verifyProductSortOptions();
        await HomePage.sortResultsByPrice();
        await HomePage.verifyResultsAreSorted();

    })

    test('Test Filter by format', async () => {
        await HomePage.verifyProductFilters();
        await HomePage.filterResultsByText('Hardback');
        await HomePage.verifyResultsFilter('Hardback');
        await HomePage.verifyResultsAreFiltered();
    })
})