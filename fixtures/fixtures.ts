import { test as baseTest, expect } from '@playwright/test';
import { HomePage } from "../src/page/HomePage";
import { LoginPage } from '../src/page/LoginPage';

type MyFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
}

const test = baseTest.extend<
    MyFixtures
    & { screenshotOnPass: void }
>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
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


