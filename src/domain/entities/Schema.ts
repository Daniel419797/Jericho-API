import { AuditableEntity } from '../../shared/types';

export interface Schema extends AuditableEntity {
  name: string;
  projectId: string;
  fields: SchemaField[];
  version: number;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}

export interface SchemaField {
  name: string;
  type: string;
  required: boolean;
  unique?: boolean;
  default?: unknown;
  validation?: Record<string, unknown>;
}
