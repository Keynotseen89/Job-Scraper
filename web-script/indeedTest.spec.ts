import { BrowserReferers, UserAgent } from '../browser-config/chrome-config'
import { IndeedPage }  from '../page-object-models/indeed-page-model/IndeedPage'

const { chromium } = require('playwright')

; (async ()=> {
    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext({ userAgent: UserAgent[0], Referer: BrowserReferers[0] });
    
    const page = await context.newPage();

    await page.goto("https://indeed.com", "domcontentloaded")
 
    const webPage = new IndeedPage(page);

    await webPage.jobSearch("qa automation engineer")
    await webPage.searchButton.click();
    await page.waitForTimeout(1000);

    await webPage.jobFilter("24 hours", "Full-time", "Remote");
    await webPage.getData()
    
    await page.waitForTimeout(1000);
    await browser.close()
})()