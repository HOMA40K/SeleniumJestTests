const Page = require('./basePage');
const {By, Button} = require('selenium-webdriver')

const baseUrl = 'https://www.bookdepository.com/'

let searchCountNum;

//locators
const cookiesConsentBtn = By.css('div.cookie-consent > div.cookie-consent-buttons > button.btn.btn-sm.btn-yes');
const brandLinkHeader = By.xpath('//h1/a[@class="brand-link"]/img');

const searchField = By.css('#book-search-form > div > input[name="searchTerm"]');
const searchBtn = By.className('header-search-btn');
const searchResultHeader = By.css('div.main-content.search-page > h1');
const searchResultCount = By.className('search-count');
const searchResultItemTitle = By.css('div.item-info > h3.title');
const searchResultItemFormat = By.css('div.item-info > p.format');
const searchResultsItemPrice = By.css('span.sale-price');

const sortOptions = By.xpath('//select[@name="searchSortBy"]/option');
const sortByPriceBtn = By.xpath('//select[@name="searchSortBy"]/option[@value="price_high_low"]');

const filterOptions = By.css('form.filter-menu > div > label');
const filterResultsBtn = By.xpath('//button[contains(text(),"Refine results")]');

const addCartButton = By.css('div:nth-child(1) > div.item-actions > div')
const continueAddingToCart = By.css('a.btn.btn-primary.pull-right.continue-to-basket.string-to-localize.link-to-localize')
const goInBasketButton = By.css('a.btn.btn-primary.pull-right.continue-to-basket.string-to-localize.link-to-localize')

const cartItemsAmount = By.css('.right-section > div > a.basket-btn > span')

const deleteButton = By.css('div.item-checkout-info > form.remove-item > button')

module.exports = class CartPage extends Page {
    constructor(driver) {
        super(driver);
    }

    async goInBasket(){
        await super.clickButton(goInBasketButton)
    }

    async checkCartItems(choosenAmount){
        const cartItemsAmountText = await super.getElementText(cartItemsAmount);
        console.log(cartItemsAmountText)
        expect(cartItemsAmountText).toContain(`${choosenAmount}`)
    }
    async deleteItem(){
        await super.clickButton(deleteButton)
    }
}