import { FastifyInstance } from 'fastify';
import { rolesController } from './rolesController';

export async function rolesRoutes(app: FastifyInstance) {
  app.get('/', rolesController.getAll);
  app.get('/:id', rolesController.getById);
  app.post('/', rolesController.create);
  app.put('/:id', rolesController.update);
  app.delete('/:id', rolesController.delete);
  app.post('/:id/permissions', rolesController.addPermission);
  app.delete('/:id/permissions/:permissionId', rolesController.removePermission);
}
