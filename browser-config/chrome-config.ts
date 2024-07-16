/**
 * Author: Quinatzin Sintora
 * Date: 07/15/2024
 */
export const UserAgent: string[] = generateUserAgents();

function generateUserAgents(): string[] {
    const windowsVersions = ['Windows NT 10.0', 'Windows NT 6.1'];
    const macVersions = ['Macintosh; Intel Mac OS X 14_1', 'Macintosh; Intel Mac OS X 10_15_7'];
    const firefoxVersion = 'Gecko/20100101 Firefox/120.0';
    const chromeVersion = 'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const edgeVersion = 'Edg/120.0.0.0';

    const userAgents: string[] = [];
 
    windowsVersions.forEach(version => {
        userAgents.push(`Mozilla/5.0 (${version}; Win64; x64; rv:120.0) ${firefoxVersion}`);
        userAgents.push(`Mozilla/5.0 (${version}; Win64; x64) ${chromeVersion} Edg/${edgeVersion}`);
        userAgents.push(`Mozilla/5.0 (${version}; Win64; x64) ${chromeVersion}`);
    });

    macVersions.forEach(version => {
        userAgents.push(`Mozilla/5.0 (${version}; ${firefoxVersion}`);
        userAgents.push(`Mozilla/5.0 (${version}) ${chromeVersion}`);
        userAgents.push(`Mozilla/5.0 (${version}) ${chromeVersion} Edg/119.0.2151.97`);
        userAgents.push(`Mozilla/5.0 (${version}) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15`);
    });

    return userAgents.sort(() => Math.random() - 0.5);
} 

export const BrowserReferers: string[] = generateReferers();

function generateReferers(): string[] {
    const searchEngines = [
        'https://www.google.com/',
        'https://yahoo.com/',
        'https://duckduckgo.com/',
        'https://www.bing.com/',
        'https://www.ask.com/'
        // Add more search engine URLs here as needed
    ];

    // Combine and shuffle the arrays to create a diverse set of referers
    const referers: string[] = [...searchEngines].sort(() => Math.random() - 0.5)
    return referers;
}