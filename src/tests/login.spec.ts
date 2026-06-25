import { expect } from '@playwright/test';
import { test } from 'fixtures/fixtures';

test('open homepage', async ({ homePage, page }) => {
    await homePage.gotoHomePage();
})