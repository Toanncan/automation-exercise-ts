import { test, expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly userNameTextbox;
    readonly passwordTextbox;
    readonly loginButton;
    readonly errorMessage;

    constructor(page: Page) {
        super(page);
        this.userNameTextbox = page.getByPlaceholder('Username');
        this.passwordTextbox = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByRole('heading', { level: 3 });
    }

    async openLoginPage(): Promise<void> {
        await test.step('Open LoginPage', async () => {
            await this.page.goto('/');
        })
    };

    async login(userName: string, password: string): Promise<void> {
        const displayedUserName = userName || '<empty>';
        const passwordState = password ? '<masked>' : '<empty>';

        await test.step(`Enter username: ${displayedUserName}`, async () => {
            await this.userNameTextbox.fill(userName);
        });

        await test.step(`Enter password: ${passwordState}`, async () => {
            await this.passwordTextbox.fill(password);
        });

        await test.step('Click login', async () => {
            await this.loginButton.click();
        });
    };

    async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent()) ?? "";
    }

    async expectLoginSuccess(): Promise<void> {
        await test.step('Verify login success', async () => {
            await expect(this.page).toHaveURL(/.*inventory\.html/);
        });
    }

    async expectErrorMessage(message: string): Promise<void> {
        await test.step(`Verify error message: ${message}`, async () => {
            await expect(this.errorMessage).toHaveText(message);
        });
    }

}
