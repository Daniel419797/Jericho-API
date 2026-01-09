import { FastifyRequest, FastifyReply } from 'fastify';

export const filesController = {
  async getAll(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement get all files
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async getById(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement get file by id
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async upload(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement file upload
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async delete(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement delete file
    return reply.status(501).send({ message: 'Not implemented' });
  },

  async download(_request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement file download
    return reply.status(501).send({ message: 'Not implemented' });
  },
};
