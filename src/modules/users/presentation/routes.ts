import { FastifyInstance } from 'fastify';
import { usersController } from './usersController';

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', usersController.getAll);
  app.get('/:id', usersController.getById);
  app.post('/', usersController.create);
  app.put('/:id', usersController.update);
  app.delete('/:id', usersController.delete);
  app.get('/:id/projects', usersController.getProjects);
}
