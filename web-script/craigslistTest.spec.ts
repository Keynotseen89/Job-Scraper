/**
 * Author: Quinatzin Sintora
 */
import { BrowserReferers, UserAgent } from "../browser-config/chrome-config";
import { CraigslistPage } from "../page-object-models/craigslist-page-model/CraigslistPage";
import { PAGE_URL } from "../url/page-url";
require('dotenv').config()

const { chromium } = require('playwright')

; (async ()=> {
    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext({ userAgent: UserAgent[0], Referer: BrowserReferers[0] });
    
    const page = await context.newPage();

    await page.goto(PAGE_URL.Craigslist_Page, "domcontentloaded")
 
    const webPage = new CraigslistPage(page);
    await page.waitForTimeout(2000);

    await webPage.getData()
    
    await page.waitForTimeout(2000);

    await browser.close()
})()