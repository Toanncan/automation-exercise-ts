import { expect, Page, test } from "@playwright/test";

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(path: string = '/'): Promise<void> {
        await this.page.goto(path);
    }
}