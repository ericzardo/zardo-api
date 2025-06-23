const fastify = require('fastify')({ logger: false });
const scrapeRoutes = require('./routes/scrape');

fastify.register(scrapeRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 Server ready at http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
