import { buildApp } from './presentation/app';
import { config } from './config';

async function start() {
  try {
    const app = await buildApp();

    await app.listen({
      port: config.server.port,
      host: config.server.host,
    });

    console.log(`Server running on http://${config.server.host}:${config.server.port}`);
    console.log(`Environment: ${config.server.env}`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

start();
