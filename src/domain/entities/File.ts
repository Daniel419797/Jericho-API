import { AuditableEntity } from '../../shared/types';

export interface File extends AuditableEntity {
  name: string;
  projectId: string;
  path: string;
  mimeType: string;
  size: number;
  url?: string;
  storageProvider: 'supabase' | 's3' | 'local';
  metadata?: Record<string, unknown>;
}
