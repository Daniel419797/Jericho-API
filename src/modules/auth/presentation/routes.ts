import { FastifyInstance } from 'fastify';
import { authController } from './authController';

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', authController.register);
  app.post('/login', authController.login);
  app.post('/logout', authController.logout);
  app.post('/refresh', authController.refreshToken);
  app.post('/verify-email', authController.verifyEmail);
  app.post('/forgot-password', authController.forgotPassword);
  app.post('/reset-password', authController.resetPassword);
}
