import { FastifyInstance } from 'fastify';
import { prisma } from '@lib/prisma';

export default async function route(fastify: FastifyInstance) {
  fastify.get('/', async (_, reply) => {
    try {
      const keywords = await prisma.freelancerKeyword.findMany({
        orderBy: { keyword: 'asc' },
      });

      return reply.status(200).send(keywords);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch keywords' });
    }
  });
}
