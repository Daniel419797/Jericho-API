import { buildApp } from './presentation/app';
import { config } from './config';

async function start() {
  try {
    const app = await buildApp();

    await app.listen({
      port: config.server.port,
      host: config.server.host,
    });

    app.log.info(`Server running on http://${config.server.host}:${config.server.port}`);
    app.log.info(`Environment: ${config.server.env}`);
  } catch (error) {
    // Use console.error here as logger may not be initialized if buildApp fails
    // eslint-disable-next-line no-console
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

start();
