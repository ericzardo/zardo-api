import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import routes from './routes';

async function main() {
  const app = Fastify({ logger: true });

  await app.register(routes);
  await app.register(cors, {
  origin: (origin, cb) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://dashboard.zardo.dev',
    ];
    if (!origin) return cb(null, true);

    if (allowedOrigins.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"), origin);
    }
  },
});

  try {
    await app.listen({ port: parseInt(process.env.PORT || '9999', 10), host: '0.0.0.0' });
    console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
