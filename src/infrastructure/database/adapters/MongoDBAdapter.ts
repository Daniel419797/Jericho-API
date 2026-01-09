import { IDatabaseAdapter } from './IDatabaseAdapter';
import { DatabaseType } from '../../../shared/types/enums';

export class MongoDBAdapter implements IDatabaseAdapter {
  async connect(): Promise<void> {
    // TODO: Implement MongoDB connection
    throw new Error('Not implemented');
  }

  async disconnect(): Promise<void> {
    // TODO: Implement MongoDB disconnection
    throw new Error('Not implemented');
  }

  async query<T>(_sql: string, _params?: unknown[]): Promise<T[]> {
    // TODO: Implement MongoDB query
    throw new Error('Not implemented');
  }

  async insert<T>(_table: string, _data: Partial<T>): Promise<T> {
    // TODO: Implement MongoDB insert
    throw new Error('Not implemented');
  }

  async update<T>(_table: string, _id: string, _data: Partial<T>): Promise<T> {
    // TODO: Implement MongoDB update
    throw new Error('Not implemented');
  }

  async delete(_table: string, _id: string): Promise<void> {
    // TODO: Implement MongoDB delete
    throw new Error('Not implemented');
  }

  getDatabaseType(): DatabaseType {
    return DatabaseType.MONGODB;
  }
}
