import { Repository } from './IRepository';
import { User } from '../entities/User';

export interface IUserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>;
  updatePassword(userId: string, passwordHash: string): Promise<void>;
  verifyEmail(userId: string): Promise<void>;
}
