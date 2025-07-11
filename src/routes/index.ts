import { FastifyInstance } from 'fastify';

import scrapeRoutes from './scrape';

export default async function routes(fastify: FastifyInstance) {
  fastify.register(scrapeRoutes, { prefix: '/scrape' });
}
