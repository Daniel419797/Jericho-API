import { FastifyInstance } from 'fastify';
import { filesController } from './filesController';

export async function filesRoutes(app: FastifyInstance) {
  app.get('/', filesController.getAll);
  app.get('/:id', filesController.getById);
  app.post('/', filesController.upload);
  app.delete('/:id', filesController.delete);
  app.get('/:id/download', filesController.download);
}
