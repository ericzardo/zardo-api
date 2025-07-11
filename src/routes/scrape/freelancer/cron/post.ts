import { FastifyInstance } from 'fastify';
import { prisma } from '@lib/prisma';

export default async function route(fastify: FastifyInstance) {
  fastify.post('/', async (request, reply) => {
    const { interval, unit, time } = request.body as {
      interval?: number;
      unit?: string;
      time?: string;
    };

    if (!interval || !unit) {
      return reply.status(400).send({ error: 'Interval and unit are required' });
    }

    const existing = await prisma.freelancerCron.findFirst();
    if (existing) {
      return reply.status(409).send({ error: 'Cron config already exists' });
    }

    const created = await prisma.freelancerCron.create({
      data: {
        interval,
        unit,
        time,
        isActive: false, // default desativado
      },
    });

    return reply.status(201).send(created);
  });
}
