# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Do not input user, password
- Location: src/tests/login.spec.ts:19:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByRole('heading', { level: 3 })
Expected: "Epic sadface: Username is required"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for getByRole('heading', { level: 3 })

```

```yaml
- text: Swag Labs
- main:
  - form "Login":
    - textbox "Username"
    - textbox "Password"
    - alert:
      - button "Dismiss error"
      - text: "Epic sadface: Username is required"
    - button "Login"
  - heading "Accepted usernames are:" [level=4]
  - text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
  - heading "Password for all users:" [level=4]
  - text: secret_sauce
```

# Test source

```ts
  1  | import { test, expect, Page } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | 
  4  | export class LoginPage extends BasePage {
  5  |     readonly userNameTextbox;
  6  |     readonly passwordTextbox;
  7  |     readonly loginButton;
  8  |     readonly errorMessage;
  9  | 
  10 |     constructor(page: Page) {
  11 |         super(page);
  12 |         this.userNameTextbox = page.getByPlaceholder('Username');
  13 |         this.passwordTextbox = page.getByPlaceholder('Password');
  14 |         this.loginButton = page.getByRole('button', { name: 'Login' });
  15 |         this.errorMessage = page.getByRole('heading', { level: 3 });
  16 |     }
  17 | 
  18 |     async openLoginPage(): Promise<void> {
  19 |         await test.step('Open LoginPage', async () => {
  20 |             await this.page.goto('/');
  21 |         })
  22 |     };
  23 | 
  24 |     async login(userName: string, password: string): Promise<void> {
  25 |         const displayedUserName = userName || '<empty>';
  26 |         const passwordState = password ? '<masked>' : '<empty>';
  27 | 
  28 |         await test.step(`Enter username: ${displayedUserName}`, async () => {
  29 |             await this.userNameTextbox.fill(userName);
  30 |         });
  31 | 
  32 |         await test.step(`Enter password: ${passwordState}`, async () => {
  33 |             await this.passwordTextbox.fill(password);
  34 |         });
  35 | 
  36 |         await test.step('Click login', async () => {
  37 |             await this.loginButton.click();
  38 |         });
  39 |     };
  40 | 
  41 |     async getErrorMessage(): Promise<string> {
  42 |         return (await this.errorMessage.textContent()) ?? "";
  43 |     }
  44 | 
  45 |     async expectLoginSuccess(): Promise<void> {
  46 |         await test.step('Verify login success', async () => {
  47 |             await expect(this.page).toHaveURL(/.*inventory\.html/);
  48 |         });
  49 |     }
  50 | 
  51 |     async expectErrorMessage(message: string): Promise<void> {
  52 |         await test.step(`Verify error message: ${message}`, async () => {
> 53 |             await expect(this.errorMessage).toHaveText(message);
     |                                             ^ Error: expect(locator).toHaveText(expected) failed
  54 |         });
  55 |     }
  56 | 
  57 | }
  58 | 
```