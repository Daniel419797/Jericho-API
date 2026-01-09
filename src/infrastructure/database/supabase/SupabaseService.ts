import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../../../config';

/**
 * Supabase client for platform-level database operations
 * Used for managing users, projects, API keys, etc.
 */
export class SupabaseService {
  private client: SupabaseClient | null = null;

  /**
   * Initialize the Supabase client
   */
  initialize(): SupabaseClient {
    if (this.client) {
      return this.client;
    }

    const { supabaseUrl, supabaseAnonKey } = config.platformDb;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        'Supabase configuration is missing. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your environment variables.',
      );
    }

    this.client = createClient(supabaseUrl, supabaseAnonKey);
    return this.client;
  }

  /**
   * Get the Supabase client
   */
  getClient(): SupabaseClient {
    if (!this.client) {
      return this.initialize();
    }
    return this.client;
  }

  /**
   * Get admin client with service role key
   */
  getAdminClient(): SupabaseClient {
    const { supabaseUrl, supabaseServiceKey } = config.platformDb;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error(
        'Supabase admin configuration is missing. Please set SUPABASE_URL and SUPABASE_SERVICE_KEY in your environment variables.',
      );
    }

    return createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
}

// Export singleton instance
export const supabaseService = new SupabaseService();
