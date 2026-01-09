import { FastifyRequest, FastifyReply } from 'fastify';

export const schemasController = {
  async getAll(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement get all schemas
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async getById(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement get schema by id
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async create(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement create schema
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async update(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement update schema
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async delete(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement delete schema
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async validateData(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement data validation against schema
    return reply.status(501).send({ message: 'Not implemented' });
  },
};
