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
      console.log(`Scraping Workana - Page ${i} - URL: ${url}`);

      await page.goto(url, { waitUntil: 'networkidle2' });

      // Aguarde por projeto ou lance erro se falhar
      try {
        await page.waitForSelector('#projects .project-item.js-project', { timeout: 10000 });
      } catch (e) {
        console.warn(`No projects found on page ${i}`);
        continue; // pula para a próxima página
      }

      await expandDescriptions(page);
      const rawProjects = await extractProjectData(page);
      const parsedProjects = parseProjects(rawProjects);

      console.log(`Found ${parsedProjects.length} projects on page ${i}`);
      allProjects.push(...parsedProjects);
    }
  } catch (error) {
    console.error('Error during scraping:', error.message);
    throw error;
  } finally {
    await browser.close();
  }

  return allProjects;
}

module.exports = scrapeWorkana;
