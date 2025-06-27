const workanaScraper = require('../workana');

async function routes(fastify, options) {
  fastify.get('/scrape', async (request, reply) => {
    const { platform, search, maxPages } = request.query;

    if (!platform || !search) {
      return reply.status(400).send({ error: 'Missing platform or search' });
    }

    let scraperFn;
    switch (platform.toLowerCase()) {
      case 'workana':
        scraperFn = workanaScraper;
        break;
      default:
        return reply.status(400).send({ error: 'Unsupported platform' });
    }

    const parsedMaxPages = parseInt(maxPages, 10);
    const limitPages = isNaN(parsedMaxPages) ? 2 : parsedMaxPages; // fallback padrão

    try {
      const projects = await scraperFn(search, limitPages);
      return { projects };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Scraping failed' });
    }
  });
}

module.exports = routes;
