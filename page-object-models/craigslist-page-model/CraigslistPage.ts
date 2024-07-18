/**
 * Author: Quinatzin Sintora
 * Date: 07/16/2024
 */
import {type Locator, type Page } from 'playwright'
export class CraigslistPage {
    readonly page: Page;
    readonly viewModeBar: Locator;
    readonly listButton: Locator;
    readonly newestButton: Locator;
    readonly searchResultContent: Locator;
    readonly dataList: Locator;

    constructor(page: Page){
        this.page = page;
        this.viewModeBar = this.page.locator("div[id=search-toolbars-1]").first();
        this.listButton = this.viewModeBar.locator("button.cl-search-view-mode-list");
        this.newestButton = this.viewModeBar.locator("button.cl-search-sort-mode-newest");
        this.searchResultContent = this.page.locator("div[id=search-results-page-1]").first();
        this.dataList = this.searchResultContent.locator("li[data-pid]")  
    }

    async #getListSearchCount(): Promise<number> {
        return await this.dataList.count();
    }

    async #getJobTitle(rowIndex: number) {
        return (await this.dataList.nth(rowIndex).getAttribute('title'))
    }

    async #getMetaData(rowIndex: number): Promise<string> {
        return await this.dataList.nth(rowIndex).locator("span.meta").innerText()
    }

    async #getJobPostLink(rowIndex: number) {
        return await this.dataList.nth(rowIndex).locator("a").getAttribute("href")
    }

    async getData(){
        await this.viewModeBar.waitFor({ state: "visible" });
        await this.viewModeBar.waitFor({ state: "attached" });

       
        var dataListCount = await this.#getListSearchCount();
        console.log("COUNT : " + dataListCount.toString())

        for(let index = 0; index < dataListCount; index++){
            //await this.page.waitForTimeout(5000);
            console.log("JOB TITLE : "+ (await this.#getJobTitle(index)))
            console.log("META DATA: " + (await this.#getMetaData(index)).toString())
            console.log("LINK: " + (await this.#getJobPostLink(index)))
            console.log(".........................................\n");
            console.log(".........................................\n");
        }
    }
}