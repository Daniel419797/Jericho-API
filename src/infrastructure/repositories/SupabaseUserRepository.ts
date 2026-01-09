import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { IDatabaseAdapter } from '../database/adapters/IDatabaseAdapter';

export class SupabaseUserRepository implements IUserRepository {
  constructor(
    private adapter: IDatabaseAdapter,
    private tableName = 'users',
  ) {}

  async findById(id: string): Promise<User | null> {
    const rows = await this.adapter.query<User>(`SELECT * FROM ${this.tableName}`);
    return rows.find((r) => r.id === id) || null;
  }

  async findAll(filters?: Record<string, unknown>): Promise<User[]> {
    // Basic implementation: fetch all and filter in-memory for provided equality filters
    let rows = await this.adapter.query<User>(`SELECT * FROM ${this.tableName}`);
    if (filters) {
      rows = rows.filter((r) => {
        return Object.entries(filters).every(([k, v]) => (r as any)[k] === v);
      });
    }
    return rows;
  }

  async create(entity: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const created = await this.adapter.insert<User>(this.tableName, entity as Partial<User>);
    return created;
  }

  async update(id: string, entity: Partial<User>): Promise<User> {
    const updated = await this.adapter.update<User>(this.tableName, id, entity as Partial<User>);
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.adapter.delete(this.tableName, id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const rows = await this.adapter.query<User>(`SELECT * FROM ${this.tableName}`);
    return rows.find((r) => r.email === email) || null;
  }

  async updatePassword(userId: string, passwordHash: string): Promise<void> {
    await this.adapter.update<User>(this.tableName, userId, { passwordHash } as Partial<User>);
  }

  async verifyEmail(userId: string): Promise<void> {
    await this.adapter.update<User>(this.tableName, userId, {
      isEmailVerified: true,
    } as Partial<User>);
  }
}
