import { test as baseTest } from '@playwright/test';
import * as allure from 'allure-js-commons';
import path from 'path';
import { HomePage } from "../src/page/HomePage";
import { LoginPage } from '../src/page/LoginPage';
import { ENV } from '../src/config/env';

type MyFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
}

const test = baseTest.extend<
    MyFixtures
    & { allureMetadata: void }
    & { screenshotOnPass: void }
>({
    allureMetadata: [async ({ }, use, testInfo) => {
        await allure.parentSuite('Automation Exercise');
        await allure.suite(path.basename(testInfo.file));
        await allure.subSuite(testInfo.project.name);
        await allure.layer('e2e');
        await allure.tag('ui');
        await allure.parameter('Environment', ENV.ENV_NAME);
        await allure.parameter('Base URL', ENV.BASE_URL);
        await allure.parameter('Browser project', testInfo.project.name);

        await use();
    }, { auto: true }],
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


