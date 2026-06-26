import { test, Locator, expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly userNameTextbox;
    readonly passwordTextbox;
    readonly loginButton;

    constructor(page: Page) {
        super(page);
        this.userNameTextbox = page.getByPlaceholder('Username');
        this.passwordTextbox = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async openLoginPage(): Promise<void> {
        await test.step('Open LoginPage', async () => {
            await this.page.goto('/');
        })
    };

    async login(userName: string, password: string) {
        await test.step(`Login with userName : ${userName}`, async () => {
            await this.userNameTextbox.fill(userName);
        });

        await test.step(`Enter password: ${password}`, async () => {
            await this.passwordTextbox.fill(password);
        });

        await test.step('Click login', async () => {
            await this.loginButton.click();
        })
    }
}