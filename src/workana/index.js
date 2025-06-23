const getBrowserPage = require('../lib/scrape');
const { expandDescriptions, extractProjectData } = require('./extract');
const parseProjects = require('./parse');

async function scrapeWorkana(querySearch, maxPages = 5) {
  const { browser, page } = await getBrowserPage();
  const baseUrl = 'https://www.workana.com/jobs';
  const allProjects = [];

  try {
    for (let i = 1; i <= maxPages; i++) {
      const url = `${baseUrl}?query=${encodeURIComponent(querySearch)}&page=${i}`;

      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.waitForSelector('#projects .project-item.js-project', { timeout: 10000 });

      await expandDescriptions(page);
      const rawProjects = await extractProjectData(page);
      const parsedProjects = parseProjects(rawProjects);

      allProjects.push(...parsedProjects);
    }
  } finally {
    await browser.close();
  }

  return allProjects;
}

module.exports = scrapeWorkana;
