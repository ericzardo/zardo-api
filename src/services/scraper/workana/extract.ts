import { Page } from 'puppeteer';

export async function expandDescriptions(page: Page): Promise<void> {
  await page.evaluate(() => {
    document.querySelectorAll('.html-desc .link.small').forEach((el) => {
      if (el.textContent?.toLowerCase().includes('ver mais')) {
        (el as HTMLElement).click();
      }
    });
  });

  await new Promise(resolve => setTimeout(resolve, 1000));
}

export interface RawProject {
  title: string | null;
  link: string | null;
  rawDate: string | null;
  rawProposals: string | null;
  description: string;
  budget: string | null;
}

export async function extractProjectData(page: Page): Promise<RawProject[]> {
  return await page.evaluate(() => {
    return Array.from(document.querySelectorAll('#projects .project-item.js-project')).map((item) => {
      const title = item.querySelector('h2.project-title a span')?.getAttribute('title') ?? null;
      const link = item.querySelector('h2.project-title a')?.getAttribute('href') ?? null;
      const rawDate = item.querySelector('.project-main-details .date')?.textContent?.trim() ?? null;
      const rawProposals = item.querySelector('.project-main-details .bids')?.textContent?.trim() ?? null;
      const budget = item.querySelector('h4.budget span.values span')?.textContent?.trim() ?? null;

      let description = item.querySelector('.project-details')?.textContent || '';
      description = description
        .replace(/[\n\t]+/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/ver menos$/i, '')
        .trim();

      return {
        title,
        link: link ? `https://www.workana.com${link}` : null,
        rawDate,
        rawProposals,
        description,
        budget,
      };
    });
  });
}
