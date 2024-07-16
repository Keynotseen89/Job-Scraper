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
        this.filterDatePosted = this.searchInputBar.locator("button[id=filter-dateposted]");
        this.filterDatePostedMenu = this.searchInputBar.locator("ul[id=filter-dateposted-menu]");
        this.filterJobType = this.searchInputBar.locator("button[id=filter-jobtype]");
        this.filterJobTypeMenu = this.searchInputBar.locator ("ul[id=filter-jobtype-menu]");
        this.filterPayRate = this.searchInputBar.locator("button[id=filter-salary-estimate]");
        this.filterPayRateMenu = this.searchInputBar.locator ("ul[id=filter-salary-estimate-menu]");
        this.filterLocation = this.searchInputBar.locator("id[filter-remotejob]");
        this.filterLocationMenu = this.searchInputBar.locator("ul[filter-remotejob-menu]");
        this.searchData = this.page.locator("div[id=mosaic-jobResults]").first();
        this.dataCard = this.searchData.locator ("div[id=mosaic-provider-jobcards]").first();
    }

    async jobSearch(jobSearchString?: string, jobLocationString?: string){
        if(jobSearchString !== undefined){
            await this.inputJob.waitFor({ state: 'visible' })
            await this.inputJob.waitFor({ state: 'attached'})
            await this.inputJob.click();
            await this.inputJob.fill(jobSearchString);
        }
        if(jobLocationString !== undefined){
            await this.inputLocation.waitFor({ state: 'visible'});
            await this.inputLocation.waitFor({ state: 'attached'});
            await this.inputLocation.click();
            await this.inputJob.fill(jobLocationString);
        }else{
            await this.inputLocation.click();
            await this.inputLocation.clear();
        }
    }

    async jobFilter(datePosted?: string, jobType?: string, jobLocation?: string, payRate?: string){
        if(datePosted !== undefined && datePosted === "24 hours"){
            await this.filterDatePosted.click();
            await this.filterDatePostedMenu.waitFor({ state: 'visible'})
            await this.filterDatePostedMenu.locator(`li a, { hasText: 'Last 24 hours' }`).click();
        }
        if(jobType !== undefined && jobType === "Full-time"){
            await this.filterJobType.click();
            await this.filterJobTypeMenu.waitFor({ state: 'visible'})
            await this.filterJobTypeMenu.locator(`li a, { hasText: 'Full-time'}`).click()
        }
        if(jobLocation !== undefined && jobLocation === "Remote"){
            await this.filterLocation.click();
            await this.filterLocation.waitFor({ state: 'visible'});
            await this.filterLocationMenu.locator(`li a, { hasText: Remote}`).click();
        }
        if(payRate !== undefined && payRate === "80k"){
            await this.filterPayRate.click();
            await this.filterPayRateMenu.waitFor({ state: 'visible'});
            await this.filterPayRateMenu.locator(`li a, { hasText: $80,000+ }`).click();
        }
    }

}