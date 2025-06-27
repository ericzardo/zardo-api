async function routes(fastify, options) {
  fastify.get('/scrape', async (request, reply) => {
    const { platform, search, maxPages } = request.query;
    if (!platform || !search) {
      return reply.status(400).send({ error: 'Missing platform or search' });
    }

    const pages = parseInt(maxPages, 10);
    const limitPages = isNaN(pages) || pages < 1 ? 5 : pages;

    let scraperFn;
    switch (platform.toLowerCase()) {
      case 'workana':
        scraperFn = require('../workana');
        break;
      default:
        return reply.status(400).send({ error: 'Unsupported platform' });
    }

    fastify.log.info({ search, limitPages }, 'Starting scrape job');

    try {
      const projects = await scraperFn(search, limitPages);
      fastify.log.info({ count: projects.length }, 'Scrape completed');
      return { projects };
    } catch (err) {
      fastify.log.error(err, 'Error during scraping');
      return reply.status(500).send({ error: 'Scraping failed', message: err.message });
    }
  });
}
