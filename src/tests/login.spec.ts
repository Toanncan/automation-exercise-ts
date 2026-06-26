import * as allure from 'allure-js-commons';
import { test } from 'fixtures/fixtures';
import { ENV } from '../config/env';

test('Login success', async ({ loginPage }) => {
    // await allure.description('Verify that a valid standard user can sign in successfully.');
    // await allure.epic('Sauce Demo');
    // await allure.feature('Login');
    // await allure.story('Valid credentials');
    // await allure.severity('critical');
    // await allure.parameter('Username', ENV.USER_NAME);
    // await allure.parameter('Password', ENV.USER_PASSWORD, { mode: 'masked' });

    await loginPage.openLoginPage();
    await loginPage.login(ENV.USER_NAME, ENV.USER_PASSWORD);
    await loginPage.expectLoginSuccess();
});

test('Do not input user, password', async ({ loginPage }) => {
    // await allure.description('Verify that the login form shows a validation error when username and password are empty.');
    // await allure.epic('Sauce Demo');
    // await allure.feature('Login');
    // await allure.story('Required credentials validation');
    // await allure.severity('normal');
    // await allure.parameter('Username', '<empty>');
    // await allure.parameter('Password', '<empty>', { mode: 'masked' });

    await loginPage.openLoginPage();
    await loginPage.login("", "");
    await loginPage.expectErrorMessage('Epic sadface: Username is required');
})
