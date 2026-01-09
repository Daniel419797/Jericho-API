import { container } from '../shared/container';
import { supabaseService } from '../infrastructure/database/supabase';
import { SupabaseAdapter } from '../infrastructure/database/adapters/SupabaseAdapter';
import { MongoDBAdapter } from '../infrastructure/database/adapters/MongoDBAdapter';
import { PostgreSQLAdapter } from '../infrastructure/database/adapters/PostgreSQLAdapter';
import { MySQLAdapter } from '../infrastructure/database/adapters/MySQLAdapter';
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
  container.registerFactory('SupabaseAdapter', () => new SupabaseAdapter());
  container.registerFactory('MongoDBAdapter', () => new MongoDBAdapter());
  container.registerFactory('PostgreSQLAdapter', () => new PostgreSQLAdapter());
  container.registerFactory('MySQLAdapter', () => new MySQLAdapter());

  // Register application services
  container.registerFactory('AuthService', () => new AuthService());
  container.registerFactory('UsersService', () => new UsersService());
  container.registerFactory('ProjectsService', () => new ProjectsService());
}
