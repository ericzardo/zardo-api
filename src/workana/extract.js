async function expandDescriptions(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.html-desc .link.small').forEach(el => {
      if (el.innerText.toLowerCase().includes('ver mais')) el.click();
    });
  });

  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function extractProjectData(page) {
  return await page.evaluate(() => {
    return Array.from(document.querySelectorAll('#projects .project-item.js-project')).map(item => {
      const title = item.querySelector('h2.project-title a span')?.getAttribute('title') || null;
      const link = item.querySelector('h2.project-title a')?.getAttribute('href') || null;
      const rawDate = item.querySelector('.project-main-details .date')?.innerText.trim() || null;
      const rawProposals = item.querySelector('.project-main-details .bids')?.innerText.trim() || null;
      const budget = item.querySelector('h4.budget span.values span')?.innerText.trim() || null;

      let description = item.querySelector('.project-details')?.innerText || '';
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

module.exports = { expandDescriptions, extractProjectData };
