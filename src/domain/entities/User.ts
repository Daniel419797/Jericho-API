import { AuditableEntity } from '../../shared/types';

export interface User extends AuditableEntity {
  email: string;
  passwordHash?: string;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  tier: 'casual' | 'power' | 'enterprise';
  metadata?: Record<string, unknown>;
}
