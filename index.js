const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // Launch browser testing
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  // Select the titles and their timestamps
  const articles = await page.$$eval(".athing", (articles) => {
    return articles.slice(0, 100).map((article) => {
      const title = article.querySelector(".storylink").innerText;
      const timestamp = article.nextElementSibling.querySelector(".age a").title;
      return { title, timestamp };
    });
  });

  // Parse the date of the article
  articles.forEach((article) => {
    const date = new Date(article.timestamp);
    article.date = date;
  });

  // Validate the sorting order from newest to oldest
  for (let i = 1; i < articles.length; i++) {
    if (articles[i].date > articles[i - 1].date) {
      console.log('Articles are not sorted from newest to oldest.');
      // await new Promise(resolve => setTimeout(resolve, 5000));
      // await browser.close();
      return;
    }
  }

  console.log('Articles are correctly sorted from newest to oldest.');
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
