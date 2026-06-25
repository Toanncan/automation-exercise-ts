import { test as baseTest, expect } from '@playwright/test';
import { HomePage } from "../src/page/HomePage";

type MyFixtures = {
    homePage: HomePage;
}

const test = baseTest.extend<
    MyFixtures
    & { screenshotOnPass: void }
>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    screenshotOnPass: [async ({ page }, use, testInfo) => {
        await use();
        if (testInfo.status === 'passed') {
            const screenshot = await page.screenshot();
            await testInfo.attach('final-screenshot-passed', {
                body: screenshot,
                contentType: 'image/png'
            })
        }
    }, { auto: true }],
});

export { test };


