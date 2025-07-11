import 'dotenv/config';
import Fastify from 'fastify';
import routes from './routes';

async function main() {
  const app = Fastify({ logger: true });

  await app.register(routes);

  try {
    await app.listen({ port: parseInt(process.env.PORT || '9999', 10) });
    console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
