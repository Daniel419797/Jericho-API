import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IDatabaseAdapter } from './IDatabaseAdapter';
import { DatabaseType } from '../../../shared/types/enums';

export class SupabaseAdapter implements IDatabaseAdapter {
  private client: SupabaseClient | null = null;

  constructor(
    private url?: string,
    private anonKey?: string,
  ) {}

  async connect(): Promise<void> {
    const url = this.url || process.env.SUPABASE_URL;
    const anonKey = this.anonKey || process.env.SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY are required');
    }

    this.client = createClient(url, anonKey);
  }

  async disconnect(): Promise<void> {
    // Supabase client doesn't have explicit disconnect; clear the instance
    this.client = null;
  }

  async query<T>(sql: string, _params?: unknown[]): Promise<T[]> {
    if (!this.client) throw new Error('Not connected');

    const selectMatch = sql.match(/select\s+\*\s+from\s+([a-zA-Z0-9_]+)/i);
    if (selectMatch) {
      const table = selectMatch[1];
      const { data, error } = await this.client.from(table).select('*');
      if (error) throw error;
      return (data as T[]) || [];
    }

    throw new Error('Unsupported SQL query in SupabaseAdapter');
  }

  async insert<T>(table: string, data: Partial<T>): Promise<T> {
    if (!this.client) throw new Error('Not connected');

    const { data: res, error } = await this.client.from(table).insert([data]).select().single();
    if (error) throw error;
    return res as T;
  }

  async update<T>(table: string, id: string, data: Partial<T>): Promise<T> {
    if (!this.client) throw new Error('Not connected');

    const { data: res, error } = await this.client
      .from(table)
      .update(data as any)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return res as T;
  }

  async delete(table: string, id: string): Promise<void> {
    if (!this.client) throw new Error('Not connected');

    const { error } = await this.client.from(table).delete().eq('id', id);
    if (error) throw error;
  }

  getDatabaseType(): DatabaseType {
    return DatabaseType.SUPABASE;
  }
}
