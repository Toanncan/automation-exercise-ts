import { defineConfig } from '@playwright/test';
import { ENV } from './src/config/env';
import packageJson from './package.json';
import os from 'os';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const isCI = !!process.env.CI;
export default defineConfig({
  testDir: './src/tests',
  // globalSetup: './utils/allureGlobalSetup.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['line'],
    ['allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          Project: 'Playwright Automation Framework',
          Version: '1.0.0',
          Environment: ENV.ENV_NAME,
          URL: ENV.BASE_URL,
          OS: `${os.type()} ${os.release()} (${os.platform()})`,
          Architecture: os.arch(),
          Node: process.version,
          Playwright: packageJson.devDependencies['@playwright/test'],
          ci: process.env.CI ? 'true' : 'false',
          workerCount: process.env.CI ? '1' : '1',
        },
        categories: [
          {
            name: 'Assertion failures',
            messageRegex: '.*expect.*|.*Expected.*|.*toBe.*|.*toHave.*',
            matchedStatuses: ['failed'],
          },
          {
            name: 'Application errors',
            messageRegex: '.*5\\d\\d.*|.*Internal Server Error.*|.*Bad Gateway.*',
            matchedStatuses: ['failed', 'broken'],
          },
          {
            name: 'Timeouts',
            messageRegex: '.*Timeout.*|.*timed out.*',
            matchedStatuses: ['failed', 'broken'],
          },
          {
            name: 'Product defects',
            matchedStatuses: ['failed'],
          },
          {
            name: 'Test defects',
            matchedStatuses: ['broken'],
          },
        ],
      }
    ]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    baseURL: ENV.BASE_URL,
    headless: isCI,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    launchOptions: {
      args: ['--start-maximized']
    },
    viewport: null,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium', },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
