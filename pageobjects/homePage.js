const Page = require('./basePage');
const {By} = require('selenium-webdriver')

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

const addToCartPopupWindow = By.css('.status-success.in > div > div')
const goInCartAddingToCart = By.css('a.btn.btn-primary.pull-right.continue-to-basket.string-to-localize.link-to-localize')

const addCartButton = By.css('div:nth-child(1) > div.item-actions > div')
const continueShoping = By.css('div.basket-info > a.btn.btn-secondary.pull-left.continue-shopping.string-to-localize')

const addedItemNotifText = By.css('div.modal-dialog.modal-md div.modal-content div.modal-header h3.modal-title')


module.exports = class HomePage extends Page {
    constructor(driver) {
        super(driver);
    }

    async openUrl() {
        await super.openUrl(baseUrl);
    }

    async agreeWithCookies() {
        await super.waitForElementVisible(cookiesConsentBtn);
        await super.clickButton(cookiesConsentBtn);
    }

    async verifyPageTitleContains(pageTitle) {
        const pageTitleElement = await super.getElementAttribute(brandLinkHeader, 'alt');
        expect(pageTitleElement).toContain(pageTitle)
    }

    async searchForText(text) {
        await super.sendText(searchField, text);        
        await super.clickButton(searchBtn);
    }

    async verifySearchResultText(text) {
        const searchResultTitle = await super.getElementText(searchResultHeader);
        expect(searchResultTitle).toContain('Search results for ' + text)
    }

    async verifyAllSearchItemsContainText(text) {
        let itemFormats = await super.getElements(searchResultItemTitle);

        for(let item of itemFormats) {
            expect(await item.getText()).toContain(text);
        }
    }

    async verifySearchResultContainsMoreItemsThan(number) {
        const searchCount = await super.getElementText(searchResultCount)
        searchCountNum = parseInt(searchCount.replace(',', ''))
        expect(searchCountNum).toBeGreaterThan(number)
    }

    async verifyProductSortOptions() {
        let sortByOptions = await super.getElements(sortOptions);
        expect(sortByOptions).toHaveLength(5)
    }

    async sortResultsByPrice() {
        await super.clickButton(sortByPriceBtn);
    }

    async verifyResultsAreSorted() {
        let searchItems = await super.getElements(searchResultsItemPrice);
        
        //Verify that the products are sorted correctly.
        let price1 = parseFloat((await searchItems[0].getText()).replace(/[^\d,.]/, '').replace(',', '.'))
        let price2 = parseFloat((await searchItems[1].getText()).replace(/[^\d,.]/, '').replace(',', '.'))

        expect(price1).toBeGreaterThanOrEqual(price2)
    }

    async verifyProductFilters() {
        let filterByOptions = await super.getElements(filterOptions)
        expect(filterByOptions).toHaveLength(6)
    }

    async filterResultsByText(text) {
        await super.clickButton(By.xpath('//*[@id="filterFormat"]/option[contains(text(),"' + text + '")]'));
        await super.clickButton(filterResultsBtn);
    }

    async verifyResultsFilter(text) {  
        let itemFormats = await super.getElements(searchResultItemFormat)

        for(let item of itemFormats) {
            expect(await item.getText()).toContain(text)
        }
    }

    async verifyResultsAreFiltered() {
        const searchCountFiltered = await super.getElementText(searchResultCount)
        const searchCountFilteredNum = parseInt(searchCountFiltered.replace(',', ''))

        expect(searchCountFilteredNum).toBeLessThan(searchCountNum)
    }
    async addElementInCart(choosenIndex){
        const addCartButton = By.css(`div:nth-child(${choosenIndex}) > div.item-actions > div`)
        await super.clickButton(addCartButton)
    }
    async checkIfButtonExists(){
        //expect(component.queryByText("Text I care about")).not.toBeInTheDocument();
        //expect(addCartButton.exists()).toBeTruthy()
        //expect(addCartButton).not.toBeVisible()
        //isDisplayed().toBe(true)
    }
    async checkAddToCartPopupWindow(){
        expect(addToCartPopupWindow)
    }
    async continueShoping(){
        await super.clickButton(continueShoping)
    }
    

}