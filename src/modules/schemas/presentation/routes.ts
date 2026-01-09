import { FastifyInstance } from 'fastify';
import { schemasController } from './schemasController';

export async function schemasRoutes(app: FastifyInstance) {
  app.get('/', schemasController.getAll);
  app.get('/:id', schemasController.getById);
  app.post('/', schemasController.create);
  app.put('/:id', schemasController.update);
  app.delete('/:id', schemasController.delete);
  app.post('/:id/validate', schemasController.validateData);
}
