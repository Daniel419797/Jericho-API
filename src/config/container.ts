import { container } from '../shared/container';
import { supabaseService } from '../infrastructure/database/supabase';
import { AuthService } from '../modules/auth/application/authService';
import { UsersService } from '../modules/users/application/usersService';
import { ProjectsService } from '../modules/projects/application/projectsService';

/**
 * Setup and configure the dependency injection container
 * Registers all services, repositories, and adapters
 */
export function setupContainer(): void {
  // Register platform database service
  container.register('SupabaseService', supabaseService);

  // Register database adapters (lazy initialization)
  container.registerFactory('SupabaseAdapter', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { SupabaseAdapter } = require('../infrastructure/database/adapters');
    return new SupabaseAdapter();
  });

  container.registerFactory('MongoDBAdapter', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { MongoDBAdapter } = require('../infrastructure/database/adapters');
    return new MongoDBAdapter();
  });

  container.registerFactory('PostgreSQLAdapter', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { PostgreSQLAdapter } = require('../infrastructure/database/adapters');
    return new PostgreSQLAdapter();
  });

  container.registerFactory('MySQLAdapter', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { MySQLAdapter } = require('../infrastructure/database/adapters');
    return new MySQLAdapter();
  });

  // Register application services
  container.registerFactory('AuthService', () => {
    return new AuthService();
  });

  container.registerFactory('UsersService', () => {
    return new UsersService();
  });

  container.registerFactory('ProjectsService', () => {
    return new ProjectsService();
  });
}
