/**
 * Author: Quinatzin Sintora
 * Date: 07/13/2024
 */
import {type Locator, type Page}  from 'playwright'
export class IndeedPage {
    readonly page: Page;
    readonly searchInputBar: Locator;
    readonly inputJob: Locator;
    readonly inputLocation: Locator;
    readonly searchButton: Locator;
    readonly filterDatePosted: Locator;
    readonly filterDatePostedMenu: Locator;
    readonly filterJobType: Locator;
    readonly filterJobTypeMenu: Locator;
    readonly filterPayRate: Locator;
    readonly filterPayRateMenu: Locator;
    readonly filterLocation: Locator;
    readonly filterLocationMenu: Locator;
    readonly searchData: Locator;
    readonly dataCard: Locator;
    readonly navigationMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInputBar = this.page.locator("div[id=MosaicProviderRichSearchDaemon]").first();
        this.inputJob = this.searchInputBar.locator ("input[id=text-input-what]");
        this.inputLocation = this.searchInputBar.locator("input[id=text-input-where]");
        this.searchButton = this.searchInputBar.locator("button[type=submit]");
        this.filterDatePosted = this.searchInputBar.locator("button[id=filter-dateposted]")
        this.filterDatePostedMenu = this.searchInputBar.locator("ul[id=filter-dateposted-menu]")
        this.filterJobType = this.searchInputBar.locator("button[id=filter-jobtype]");
        this.filterJobTypeMenu = this.searchInputBar.locator ("ul[id=filter-jobtype-menu]");
        this.filterPayRate = this.searchInputBar.locator("button[id=filter-salary-estimate]");
        this.filterPayRateMenu = this.searchInputBar.locator ("ul[id=filter-salary-estimate-menu]");
        this.filterLocation = this.searchInputBar.locator("button[id=filter-remotejob]");
        this.filterLocationMenu = this.searchInputBar.locator("ul[id=filter-remotejob-menu]")
        this.searchData = this.page.locator("div[id=mosaic-jobResults]")
        this.dataCard = this.searchData.locator("div[id=mosaic-provider-jobcards]")
        this.navigationMenu = this.page.locator("nav[role=navigation]")
    }

    async jobSearch(jobSearchString?: string, jobLocationString?: string){
        if(jobSearchString !== undefined){
            await this.inputJob.waitFor({ state: 'visible' })
            await this.inputJob.waitFor({ state: 'attached'})
            await this.inputJob.fill(jobSearchString);
        }
        if(jobLocationString !== undefined){
            await this.inputLocation.waitFor({ state: 'visible'});
            await this.inputLocation.waitFor({ state: 'attached'});
            await this.inputJob.fill(jobLocationString);
        }else{
            await this.inputLocation.clear();
        }
    }

    async jobFilter(datePosted?: string, jobType?: string, jobLocation?: string, payRate?: string){
        if(datePosted !== undefined ){
            await this.page.waitForTimeout(5000);
            await this.filterDatePosted.waitFor({ state: 'visible'});
            await this.filterDatePosted.waitFor({ state: 'attached'});
            await this.filterDatePosted.click();

            await this.filterDatePostedMenu.evaluate(element => element.setAttribute('class', 'yosegi-FilterPill-dropdownList is-dropdownOpen'));
            await this.filterDatePostedMenu.locator('li').locator('a:has-text("Last 24 hours")').click();
        }
        if(jobType !== undefined ){
            await this.page.waitForTimeout(5000);
            await this.filterJobType.waitFor({ state: 'visible'});
            await this.filterJobType.waitFor({ state: 'attached'});
            await this.filterJobType.click();

            await this.filterJobTypeMenu.evaluate(element => element.setAttribute('class', 'yosegi-FilterPill-dropdownList is-dropdownOpen'));
            await this.filterJobTypeMenu.locator('li').locator('a:has-text("Full-time")').click();
        }
        if(jobLocation !== undefined){
            await this.page.waitForTimeout(5000);
            await this.filterLocation.waitFor({ state: 'visible'});
            await this.filterLocation.waitFor({ state: 'attached'});
            await this.filterLocation.click();

            await this.filterLocationMenu.evaluate(element => element.setAttribute('class', 'yosegi-FilterPill-dropdownList is-dropdownOpen'));
            await this.filterLocationMenu.locator('li').locator('a:has-text("Remote")').click();
        }
        if(payRate !== undefined){
            await this.page.waitForTimeout(5000);
            await this.filterPayRate.waitFor({ state: 'visible'});
            await this.filterPayRate.waitFor({ state: 'attached'});
            await this.filterPayRate.click();

            await this.filterPayRateMenu.evaluate(element => element.setAttribute('class', 'yosegi-FilterPill-dropdownList is-dropdownOpen'));
            await this.filterPayRateMenu.locator('li').locator('a:has-text("$80,000+")').click()
        }
    }

    async #getCardSearchCount(): Promise<number> {
        return await this.dataCard.first().locator("ul div[data-testid=slider_item]").count()
    }

    async #getCardJobTitle(rowIndex: number): Promise<string> {
        //return await this.tableSearchResult.locator('tbody').locator('tr').nth(rowIndex).locator('td').nth(columnIndex).innerText()
        return await this.dataCard.first().locator("ul div[data-testid=slider_item]").nth(rowIndex).locator("tbody").locator('h2').innerText();
    }

    async #getPayRate(rowIndex: number): Promise<string> {
        return await this.dataCard.first().locator("ul div[data-testid=slider_item]").nth(rowIndex).locator("tbody").locator("div.jobMetaDataGroup").innerText();
    }

    async #getJobPostLink(rowIndex: number) {
        return await this.dataCard.first().locator("ul div[data-testid=slider_item]").nth(rowIndex).locator("tbody").locator("h2").locator('a').getAttribute('href')
        //return await this.tableSearchResult.locator('tbody').locator('tr').nth(rowIndex).locator('td').nth(columnIndex).locator('a').getAttribute('href')
    }

    async #getPagination(){
        return this.navigationMenu.locator("ul").first().locator('li').last().locator('[data-test=pagination-page-next]')
    }
    
    async getData(){
        await this.dataCard.waitFor({ state: "visible" });
        await this.dataCard.waitFor({ state: "attached" });

        var cardCount = await this.#getCardSearchCount();

        for(let index = 0; index < cardCount; index++){
            await this.page.waitForTimeout(5000);
            console.log("JOB TITLE : "+ (await this.#getCardJobTitle(index)).toString())
            console.log("PAY RATE: " + (await this.#getPayRate(index)).toString())
            console.log("LINK: " + (await this.#getJobPostLink(index)))
            console.log(".........................................\n");
            console.log(".........................................\n");
        }

        /*
        if(await this.navigationMenu.isVisible()){
            while((await this.#getPagination()).isVisible()){
                (await this.#getPagination()).click();
                await this.page.waitForTimeout(3000);
                for(let index = 0; index < cardCount; index++){
                    console.log("JOB TITLE : "+ (await this.#getCardJobTitle(index)).toString())
                    console.log("PAY RATE: " + (await this.#getPayRate(index)).toString())
                    console.log("LINK: " + (await this.#getJobPostLink(index)))
                    console.log(".........................................\n");
                    console.log(".........................................\n");
                }

            }
        }*/
        

        /*
        console.log("JOB TITLE : "+ (await this.#getCardJobTitle(0)).toString())
        console.log("PAY RATE: " + (await this.#getPayRate(0)).toString())
        
        console.log("LINK: " + (await this.#getJobPostLink(0)))
        */
    }

}