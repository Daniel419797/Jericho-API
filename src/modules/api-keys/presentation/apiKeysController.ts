import { FastifyRequest, FastifyReply } from 'fastify';

export const apiKeysController = {
  async getAll(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement get all API keys
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async getById(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement get API key by id
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async create(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement create API key
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async delete(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement delete API key
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async revoke(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement revoke API key
    return reply.status(501).send({ message: 'Not implemented' });
  },
};
