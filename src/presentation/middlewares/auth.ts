import { FastifyRequest, FastifyReply } from 'fastify';
import { UnauthorizedError } from '../../shared/errors';

export async function authMiddleware(request: FastifyRequest, _reply: FastifyReply) {
  // TODO: Implement JWT verification
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('No authorization header provided');
  }

  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    throw new UnauthorizedError('Invalid token format');
  }

  // TODO: Verify JWT token and attach user to request
  // const user = await verifyToken(token);
  // request.user = user;
}
