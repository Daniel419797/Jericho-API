import { FastifyInstance } from 'fastify';
import { projectsController } from './projectsController';

export async function projectsRoutes(app: FastifyInstance) {
  app.get('/', projectsController.getAll);
  app.get('/:id', projectsController.getById);
  app.post('/', projectsController.create);
  app.put('/:id', projectsController.update);
  app.delete('/:id', projectsController.delete);
  app.post('/:id/database/test', projectsController.testDatabaseConnection);
}
