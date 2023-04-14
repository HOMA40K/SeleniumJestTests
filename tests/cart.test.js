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
        // If you dont want to open browser, uncomment following row
        //.setChromeOptions(new chrome.Options().addArguments('--headless'))
        .build()
        driver.manage().setTimeouts({implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT})
        driver.manage().window().maximize()

        HomePage = new HomePage(driver)
        CartPage = new CartPage(driver)

        await HomePage.openUrl()
        const closeDumbMenu = By.className('modal-content')
        const closeDumbMenuButt = By.css('div.modal-header > button.close')
        //if (closeDumbMenu.isDisplayed()){
            await HomePage.clickButton(closeDumbMenuButt)
        //}
        await HomePage.agreeWithCookies()
        
    })

    afterAll(async () => {
        await driver.quit()
    })
    afterEach(function() {
        HomePage.takeScreenShotIfTestFailed(expect.getState())
    })

    test('Test Open Web Page', async () => {
        await HomePage.verifyPageTitleContains('Bookdepository.com')
    })
    test('Test Finding Things', async () =>{
        await HomePage.searchForText('Harry Potter')
        await HomePage.verifySearchResultText('Harry Potter')
    })
    // test('Test If Button Exists', async () =>{
    //     await HomePage.checkIfButtonExists()
    // })
    test('Adding object to cart', async () => {
        await HomePage.addElementInCart(1)
    })
    test('Test If Notified About Adding To Cart', async () =>{
        //await HomePage.checkAddToCartPopupWindow()
        await HomePage.continueShoping()
    })
    test('Test Adding another item and going in ', async () =>{
        await HomePage.addElementInCart(2)
        await CartPage.goInBasket()
    })
    test('Test Amount of Items In Cart', async () =>{
        await CartPage.checkCartItems('2')
    })
    test('Test Deleting item', async () =>{
        await CartPage.deleteItem()
        await CartPage.checkCartItems('1')
    })

})