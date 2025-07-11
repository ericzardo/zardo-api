import { FastifyInstance } from 'fastify';
import freelancerRoutes from './freelancer';

export default async function scrapeRoutes(fastify: FastifyInstance) {
  await fastify.register(freelancerRoutes, { prefix: '/freelancer' });
}
