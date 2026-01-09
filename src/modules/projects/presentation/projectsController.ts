import { FastifyRequest, FastifyReply } from 'fastify';

export const projectsController = {
  async getAll(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement get all projects
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async getById(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement get project by id
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async create(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement create project
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async update(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement update project
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async delete(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement delete project
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async testDatabaseConnection(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement database connection test
    return reply.status(501).send({ message: 'Not implemented' });
  },
};
