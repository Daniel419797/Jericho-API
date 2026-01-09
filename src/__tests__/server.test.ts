import { buildApp } from '../presentation/app';

describe('Server Integration Tests', () => {
  describe('Health Check', () => {
    it('should return 200 OK with status and timestamp', async () => {
      const app = await buildApp();

      const response = await app.inject({
        method: 'GET',
        url: '/health',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.status).toBe('ok');
      expect(body.timestamp).toBeDefined();

      await app.close();
    });
  });

  describe('Module Routes', () => {
    let app: Awaited<ReturnType<typeof buildApp>>;

    beforeAll(async () => {
      app = await buildApp();
    });

    afterAll(async () => {
      await app.close();
    });

    describe('Auth Routes', () => {
      it('should have /api/v1/auth/register endpoint', async () => {
        const response = await app.inject({
          method: 'POST',
          url: '/api/v1/auth/register',
        });

        expect(response.statusCode).toBe(501); // Not implemented
      });

      it('should have /api/v1/auth/login endpoint', async () => {
        const response = await app.inject({
          method: 'POST',
          url: '/api/v1/auth/login',
        });

        expect(response.statusCode).toBe(501); // Not implemented
      });
    });

    describe('Users Routes', () => {
      it('should have /api/v1/users endpoint', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/api/v1/users',
        });

        expect(response.statusCode).toBe(501); // Not implemented
      });
    });

    describe('Projects Routes', () => {
      it('should have /api/v1/projects endpoint', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/api/v1/projects',
        });

        expect(response.statusCode).toBe(501); // Not implemented
      });
    });
  });
});
