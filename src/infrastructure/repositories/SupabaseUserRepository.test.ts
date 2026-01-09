import { SupabaseUserRepository } from './SupabaseUserRepository';
import { IDatabaseAdapter } from '../database/adapters/IDatabaseAdapter';
import { User } from '../../domain/entities/User';

const mockAdapter = (): jest.Mocked<IDatabaseAdapter> => ({
  connect: jest.fn(),
  disconnect: jest.fn(),
  query: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getDatabaseType: jest.fn(),
});

describe('SupabaseUserRepository', () => {
  it('creates, finds, updates and deletes user', async () => {
    const adapter = mockAdapter();

    const fakeUser: User = {
      id: 'u1',
      email: 'test@example.com',
      isActive: true,
      isEmailVerified: false,
      tier: 'casual',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User;

    adapter.insert.mockResolvedValue(fakeUser);
    adapter.query.mockResolvedValue([fakeUser]);
    adapter.update.mockResolvedValue({ ...fakeUser, firstName: 'Updated' } as User);
    adapter.delete.mockResolvedValue(undefined as any);

    const repo = new SupabaseUserRepository(adapter);

    const created = await repo.create({
      email: 'test@example.com',
      isActive: true,
      isEmailVerified: false,
      tier: 'casual',
    } as any);

    expect(created).toEqual(fakeUser);
    expect(adapter.insert).toHaveBeenCalledWith('users', expect.any(Object));

    const found = await repo.findByEmail('test@example.com');
    expect(found).toEqual(fakeUser);

    const updated = await repo.update('u1', { firstName: 'Updated' });
    expect(updated.firstName).toBe('Updated');

    await expect(repo.delete('u1')).resolves.toBeUndefined();
    expect(adapter.delete).toHaveBeenCalledWith('users', 'u1');
  });

  it('returns null when not found', async () => {
    const adapter = mockAdapter();
    adapter.query.mockResolvedValue([]);

    const repo = new SupabaseUserRepository(adapter);
    const found = await repo.findByEmail('nope@example.com');
    expect(found).toBeNull();
  });
});
