import { FastifyRequest, FastifyReply } from 'fastify';

export const rolesController = {
  async getAll(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement get all roles
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async getById(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement get role by id
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async create(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement create role
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async update(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement update role
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async delete(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement delete role
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async addPermission(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement add permission to role
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async removePermission(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement remove permission from role
    return reply.status(501).send({ message: 'Not implemented' });
  },
};
