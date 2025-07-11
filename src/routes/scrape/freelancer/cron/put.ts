import { FastifyInstance } from 'fastify';
import { prisma } from '@lib/prisma';

export default async function route(fastify: FastifyInstance) {
  fastify.put('/', async (request, reply) => {
    const { isActive, interval, unit, time } = request.body as {
      isActive?: boolean;
      interval?: number;
      unit?: string;
      time?: string;
    };

    const existing = await prisma.freelancerCron.findFirst();
    if (!existing) {
      return reply.status(404).send({ error: 'No cron config found' });
    }

    const updated = await prisma.freelancerCron.update({
      where: { id: existing.id },
      data: {
        isActive,
        interval,
        unit,
        time,
      },
    });

    return reply.status(200).send(updated);
  });
}
