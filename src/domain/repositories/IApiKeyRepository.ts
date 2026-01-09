import { Repository } from './IRepository';
import { ApiKey } from '../entities/ApiKey';

export interface IApiKeyRepository extends Repository<ApiKey> {
  findByKeyHash(keyHash: string): Promise<ApiKey | null>;
  findByProjectId(projectId: string): Promise<ApiKey[]>;
  findByUserId(userId: string): Promise<ApiKey[]>;
  updateLastUsed(keyId: string): Promise<void>;
}
