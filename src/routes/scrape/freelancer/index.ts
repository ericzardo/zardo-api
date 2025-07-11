import { FastifyInstance } from 'fastify';
import keywordsGet from './keywords/get';
import keywordsPost from './keywords/post';
import keywordsDelete from './keywords/delete';
import cronGet from './cron/get';
import cronPost from './cron/post';
import cronPut from './cron/put';
import get from "./get"

export default async function freelancerRoutes(fastify: FastifyInstance) {
  await fastify.register(keywordsGet, { prefix: '/keywords' });
  await fastify.register(keywordsPost, { prefix: '/keywords' });
  await fastify.register(keywordsDelete, { prefix: '/keywords' });

  await fastify.register(cronGet, { prefix: '/cron' });
  await fastify.register(cronPost, { prefix: '/cron' });
  await fastify.register(cronPut, { prefix: '/cron' });

  await fastify.register(get);
}
