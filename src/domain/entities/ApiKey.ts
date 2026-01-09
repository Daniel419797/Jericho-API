import { AuditableEntity } from '../../shared/types';

export interface ApiKey extends AuditableEntity {
  name: string;
  keyHash: string;
  projectId: string;
  userId: string;
  permissions: string[];
  isActive: boolean;
  expiresAt?: Date;
  lastUsedAt?: Date;
  metadata?: Record<string, unknown>;
}
