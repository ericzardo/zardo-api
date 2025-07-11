import { FastifyInstance } from 'fastify';
import { prisma } from '@lib/prisma';

export default async function route(fastify: FastifyInstance) {
  fastify.get('/', async (_, reply) => {
    try {
      const cron = await prisma.freelancerCron.findFirst();
      return reply.status(200).send(cron);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch cron config' });
    }
  });
}
