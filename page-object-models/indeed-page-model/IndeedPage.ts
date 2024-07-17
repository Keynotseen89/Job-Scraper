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
        this.dataCard = this.searchData.locator ("div[id=mosaic-provider-jobcards]")
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
            await this.filterDatePosted.waitFor({ state: 'visible'});
            await this.filterDatePosted.waitFor({ state: 'attached'});
            await this.filterDatePosted.click();

            await this.filterDatePostedMenu.evaluate(element => element.setAttribute('class', 'yosegi-FilterPill-dropdownList is-dropdownOpen'));
            await this.filterDatePostedMenu.locator('li').locator('a:has-text("Last 24 hours")').click();
        }
        if(jobType !== undefined ){
            await this.filterJobType.waitFor({ state: 'visible'});
            await this.filterJobType.waitFor({ state: 'attached'});
            await this.filterJobType.click();

            await this.filterJobTypeMenu.evaluate(element => element.setAttribute('class', 'yosegi-FilterPill-dropdownList is-dropdownOpen'));
            await this.filterJobTypeMenu.locator('li').locator('a:has-text("Full-time")').click();
        }
        if(jobLocation !== undefined){
            await this.filterLocation.waitFor({ state: 'visible'});
            await this.filterLocation.waitFor({ state: 'attached'});
            await this.filterLocation.click();

            await this.filterLocationMenu.evaluate(element => element.setAttribute('class', 'yosegi-FilterPill-dropdownList is-dropdownOpen'));
            await this.filterLocationMenu.locator('li').locator('a:has-text("Remote")').click();
        }
        if(payRate !== undefined){
            await this.filterPayRate.waitFor({ state: 'visible'});
            await this.filterPayRate.waitFor({ state: 'attached'});
            await this.filterPayRate.click();

            await this.filterPayRateMenu.evaluate(element => element.setAttribute('class', 'yosegi-FilterPill-dropdownList is-dropdownOpen'));
            await this.filterPayRateMenu.locator('li').locator('a:has-text("$80,000+")').click()
        }
    }

}