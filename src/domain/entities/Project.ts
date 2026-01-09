import { AuditableEntity } from '../../shared/types';
import { DatabaseType } from '../../shared/types/enums';

export interface Project extends AuditableEntity {
  name: string;
  description?: string;
  ownerId: string;
  databaseType: DatabaseType;
  databaseConfig: Record<string, unknown>;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}
