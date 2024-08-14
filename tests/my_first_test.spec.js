const {test, expect} = require('@playwright/test')
// const {hello, helloworld} = require('./demo/hello')
// import {test, expect} from '@playwright/test'

test('My first test   ', async ({page}) => {

    await page.goto('httpe://google.com')
    await expect(page).toHaveTitle('Google')
})