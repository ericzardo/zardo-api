import { getBrowserPage } from '@lib/scrape';
import { expandDescriptions, extractProjectData } from './extract';
import { parseProjects } from './parse';

export async function runWorkanaScraper(querySearch: string = '', maxPages = 5) {
  const { browser, page } = await getBrowserPage();
  const baseUrl = 'https://www.workana.com/jobs';
  const allProjects: any[] = [];

  try {
    for (let i = 1; i <= maxPages; i++) {
      const url = `${baseUrl}?query=${encodeURIComponent(querySearch)}&page=${i}`;
      console.log(`🔍 Scraping Workana | Page ${i} | URL: ${url}`);

      await page.goto(url, { waitUntil: 'networkidle2' });

      try {
        await page.waitForSelector('#projects .project-item.js-project', { timeout: 10000 });
      } catch (e) {
        console.warn(`⚠️ Nenhum projeto encontrado na página ${i}`);
        continue;
      }

      await expandDescriptions(page);
      const rawProjects = await extractProjectData(page);
      const parsedProjects = parseProjects(rawProjects);

      allProjects.push(...parsedProjects);
    }
  } catch (error: any) {
    console.error('❌ Erro ao raspar:', error.message);
    throw error;
  } finally {
    await browser.close();
  }

  return allProjects;
}
