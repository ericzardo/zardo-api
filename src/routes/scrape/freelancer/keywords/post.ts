import { FastifyInstance } from 'fastify';
import { prisma } from '@lib/prisma';

export default async function route(fastify: FastifyInstance) {
  fastify.post('/', async (request, reply) => {
    const { keyword } = request.body as { keyword?: string };

    if (!keyword || keyword.trim() === '') {
      return reply.status(400).send({ error: 'Keyword is required' });
    }

    try {
      const existingKeyword = await prisma.freelancerKeyword.findFirst({
        where: { keyword: keyword.trim() },
      });

      if (existingKeyword) {
        return reply.status(409).send({ error: 'Keyword already exists' });
      }

      const created = await prisma.freelancerKeyword.create({
        data: { keyword: keyword.trim() },
      });

      return reply.status(201).send(created);
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}
