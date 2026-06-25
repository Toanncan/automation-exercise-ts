import { Locator, Page, expect, test } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async gotoHomePage(): Promise<void> {
        await test.step('Navigate to HomePage', async () => {
            await this.goto('/');
        });
    };
}