import { FastifyRequest, FastifyReply } from 'fastify';

export const usersController = {
  async getAll(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement get all users
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async getById(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement get user by id
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async create(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement create user
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async update(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement update user
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async delete(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement delete user
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async getProjects(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement get user projects
    return reply.status(501).send({ message: 'Not implemented' });
  },
};
