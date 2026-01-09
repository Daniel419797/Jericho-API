import { AuditableEntity } from '../../shared/types';
import { Role, Permission } from '../../shared/types/enums';

export interface RoleEntity extends AuditableEntity {
  name: Role | string;
  projectId: string;
  permissions: Permission[];
  description?: string;
  isSystemRole: boolean;
  metadata?: Record<string, unknown>;
}
