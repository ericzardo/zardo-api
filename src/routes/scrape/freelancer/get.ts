import { FastifyInstance } from 'fastify';
import { runWorkanaScraper } from '@services/scraper/workana';

export default async function route(fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    const { platform, search, maxPages } = request.query as { platform?: string; search?: string, maxPages?: number };

    if (!platform) {
      return reply.status(400).send({ error: 'Platform is required (e.g. ?platform=workana)' });
    }

    try {
      let result;

      switch (platform.toLowerCase()) {
        case 'workana':
          result = await runWorkanaScraper(search, maxPages);
          break;
        default:
          return reply.status(400).send({ error: 'Unsupported platform' });
      }

      return reply.status(200).send(result);
    } catch (err) {
      return reply.status(500).send({ error: 'Error running scraper', details: err });
    }
  });
}
