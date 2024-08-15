// index.spec.js
const { test, expect, chromium } = require('@playwright/test');

test('Hacker News 100 articles are sorted from newest to oldest', async ({ page }) => {

    // Go to Hacker News
    await page.goto("https://news.ycombinator.com/newest");
//     // Launch browser testing
//     const browser = await chromium.launch({ headless: false });
//     const context = await browser.newContext();
//     const page = await context.newPage();

//   // Go to Hacker News
//   await page.goto("https://news.ycombinator.com/newest");

  // Select the titles and their timestamps
  const articles = await page.$$eval(".itemlist .athing", (articles) => {
    return articles.slice(0, 100).map((article) => {
      const title = article.querySelector(".storylink").innerText;
      const ageElement = article.nextElementSibling.querySelector(".age");
      const timestamp = ageElement ? ageElement.title : null;
      return { title, timestamp };
    });
  });

  // Parse the date of the article
  articles.forEach((article) => {
    if (article.timestamp) {
      const date = new Date(article.timestamp);
      article.date = date;
    }
  });

  // Validate the sorting order from newest to oldest
  for (let i = 1; i < articles.length; i++) {
    expect(articles[i].date).toBeLessThanOrEqual(articles[i - 1].date);
  }

  console.log('Articles are correctly sorted from newest to oldest.');
});
