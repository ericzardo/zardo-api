import { FastifyInstance } from 'fastify';
import { prisma } from '@lib/prisma';

export default async function route(fastify: FastifyInstance) {
  fastify.delete('/', async (request, reply) => {
    const { id } = request.body as { id?: number };

    if (!id) {
      return reply.status(400).send({ error: 'Keyword ID is required' });
    }

    try {
      const existingKeyword = await prisma.freelancerKeyword.findUnique({ where: { id } });

      if (!existingKeyword) {
        return reply.status(404).send({ error: 'Keyword not found' });
      }

      await prisma.freelancerKeyword.delete({ where: { id } });

      return reply.status(200).send({ message: 'Keyword deleted successfully' });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}
