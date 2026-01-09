import { FastifyInstance } from 'fastify';
import { apiKeysController } from './apiKeysController';

export async function apiKeysRoutes(app: FastifyInstance) {
  app.get('/', apiKeysController.getAll);
  app.get('/:id', apiKeysController.getById);
  app.post('/', apiKeysController.create);
  app.delete('/:id', apiKeysController.delete);
  app.post('/:id/revoke', apiKeysController.revoke);
}
