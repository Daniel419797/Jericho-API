import { AuthService } from './authService';

const mockUserRepo = () => ({
  findByEmail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
});

describe('AuthService', () => {
  it('registers a new user', async () => {
    const repo = mockUserRepo() as any;
    repo.findByEmail.mockResolvedValue(null);
    repo.create.mockResolvedValue({ id: 'u1', email: 'a@b.c', isActive: true, isEmailVerified: false, tier: 'casual' });

    const service = new AuthService(repo);
    const result = await service.register('a@b.c', 'password');

    expect(repo.create).toHaveBeenCalled();
    expect((result as any).id).toBe('u1');
  });

  it('throws when registering existing user', async () => {
    const repo = mockUserRepo() as any;
    repo.findByEmail.mockResolvedValue({ id: 'u1', email: 'a@b.c' });

    const service = new AuthService(repo);
    await expect(service.register('a@b.c', 'pass')).rejects.toThrow('User already exists');
  });

  it('logs in a user and returns a token', async () => {
    const repo = mockUserRepo() as any;
    repo.findByEmail.mockResolvedValue({ id: 'u1', email: 'a@b.c', passwordHash: '$2a$10$somethinghashed' });

    // Mock bcrypt.compare to return true
    jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValue(true);

    const service = new AuthService(repo);
    const { token, user } = await service.login('a@b.c', 'password');

    expect(token).toBeDefined();
    expect(user.id).toBe('u1');
  });

  it('returns null for invalid token verification', async () => {
    const service = new AuthService({} as any);
    const verified = await service.verifyToken('bad.token');
    expect(verified).toBeNull();
  });
});
