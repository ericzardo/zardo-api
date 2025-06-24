require('dotenv').config(); 

const fastify = require('fastify')({ logger: true });
const scrapeRoutes = require('./routes/scrape');

fastify.register(scrapeRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env.PORT), host: '0.0.0.0' });
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
