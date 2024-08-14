// @ts-check
const environmentBaseUrl = require('./utils/environmentBaseUrl');
const { defineConfig, devices } = require('@playwright/test');

const environment = process.env.NODE_ENV || 'local';
const baseURL = environmentBaseUrl[environment]?.api;

module.exports = defineConfig({
  testDir: './tests', 
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'all-browsers-and-tests',
      use: { 
        baseURL: 'https://playwright.dev/'
      },
    },
    {
      name: 'local',
      use: {
        baseURL: environmentBaseUrl.local.home,
      },
    },
  ],

  // Uncomment and customize if you have a local server setup.
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
