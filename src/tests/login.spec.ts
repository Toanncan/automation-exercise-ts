import { expect } from '@playwright/test';
import { test } from 'fixtures/fixtures';
import { ENV } from '../config/env';

test('Login success', async ({ loginPage, page }) => {

    await loginPage.openLoginPage();
    await loginPage.login(ENV.USER_NAME, ENV.USER_PASSWORD);
})