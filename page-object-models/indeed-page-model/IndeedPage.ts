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
    readonly filterPayRate: Locator;
    readonly filterLocation: Locator;
    readonly searchData: Locator;
    readonly dataCard: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInputBar = this.page.locator("div[id=MosaicProviderRichSearchDaemon]").first();
        this.inputJob = this.searchInputBar.locator ("input[id=text-input-what]");
        this.inputLocation = this.searchInputBar.locator("input[id=text-input-where]");
        this.filterDatePosted = this.searchInputBar.locator("button[id=filter-dateposted]");
        this.filterPayRate = this.searchInputBar.locator("button[id=filter-salary-estimate]");
        this.filterLocation = this.searchInputBar.locator("id[filter-remotejob]");
        this.searchData = this.page.locator("div[id=mosaic-jobResults]").first();
        this.dataCard = this.searchData.locator ("div[id=mosaic-provider-jobcards]").first();
    }

}