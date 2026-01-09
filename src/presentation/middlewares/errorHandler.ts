import { FastifyRequest, FastifyReply } from 'fastify';
import { AppError } from '../../shared/errors';

export async function errorHandler(error: Error, _request: FastifyRequest, reply: FastifyReply) {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      error: {
        code: error.code,
        message: error.message,
      },
    });
  }

  // Log unexpected errors
  console.error('Unexpected error:', error);

  return reply.status(500).send({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
    },
  });
}
