# Database Adapters Guide

## Overview

Jericho-API supports multiple database backends through a unified adapter interface. This allows projects to choose the database that best fits their needs while maintaining a consistent API.

## Supported Databases

1. **Supabase** - PostgreSQL with real-time capabilities
2. **MongoDB** - NoSQL document database
3. **PostgreSQL** - Traditional relational database
4. **MySQL** - Popular relational database

## Architecture

All adapters implement the `IDatabaseAdapter` interface:

```typescript
interface IDatabaseAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<T>(sql: string, params?: unknown[]): Promise<T[]>;
  insert<T>(table: string, data: Partial<T>): Promise<T>;
  update<T>(table: string, id: string, data: Partial<T>): Promise<T>;
  delete(table: string, id: string): Promise<void>;
  getDatabaseType(): DatabaseType;
}
```

## Platform vs Project Databases

### Platform Database (Supabase)
- Stores platform-level data (users, projects, API keys)
- Always uses Supabase
- Configured via `SUPABASE_*` environment variables

### Project Databases
- Stores user project data
- Can be any supported database type
- Configured per-project via dashboard or API

## Usage

### 1. Supabase Adapter

**Configuration:**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

**Features:**
- Real-time subscriptions
- Built-in authentication
- Row-level security
- Auto-generated REST API

**Best For:**
- Projects needing real-time features
- Rapid prototyping
- Modern web applications

### 2. MongoDB Adapter

**Configuration:**
```env
MONGODB_URI=mongodb://localhost:27017
```

**Features:**
- Schema flexibility
- Horizontal scaling
- Rich query language
- Aggregation framework

**Best For:**
- Document-oriented data
- Flexible schema requirements
- High write throughput

### 3. PostgreSQL Adapter

**Configuration:**
```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=jericho_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

**Features:**
- ACID compliance
- Complex queries
- JSON support
- Full-text search

**Best For:**
- Complex relational data
- Strong consistency requirements
- Advanced SQL features

### 4. MySQL Adapter

**Configuration:**
```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB=jericho_db
MYSQL_USER=root
MYSQL_PASSWORD=root
```

**Features:**
- Wide adoption
- Good performance
- Replication support
- Full-text search

**Best For:**
- Traditional web applications
- WordPress-style architectures
- Legacy system integration

## Creating a Custom Adapter

To add support for a new database:

1. Implement the `IDatabaseAdapter` interface
2. Add database-specific configuration
3. Update the adapter factory
4. Add database type to enums

Example:
```typescript
export class RedisAdapter implements IDatabaseAdapter {
  async connect(): Promise<void> {
    // Implementation
  }
  
  async disconnect(): Promise<void> {
    // Implementation
  }
  
  // ... other methods
  
  getDatabaseType(): DatabaseType {
    return DatabaseType.REDIS;
  }
}
```

## Connection Pooling

Each adapter manages its own connection pool:
- **Supabase**: Managed by Supabase client
- **MongoDB**: Uses native driver pooling
- **PostgreSQL**: Uses pg pool
- **MySQL**: Uses mysql2 pool

## Error Handling

All adapters throw `DatabaseError` for consistency:
```typescript
try {
  await adapter.query('SELECT * FROM users');
} catch (error) {
  if (error instanceof DatabaseError) {
    // Handle database error
  }
}
```

## Testing

Use test implementations for unit tests:
```typescript
class MockDatabaseAdapter implements IDatabaseAdapter {
  // Mock implementation
}
```

## Performance Considerations

- **Connection Pooling**: Reuse connections
- **Query Optimization**: Use indexes appropriately
- **Batch Operations**: Group similar operations
- **Caching**: Implement caching layer when needed

## Migration Strategy

When switching databases:
1. Export data from current database
2. Transform data to new format
3. Import to new database
4. Update project configuration
5. Verify data integrity

## Best Practices

1. Always use parameterized queries
2. Implement proper error handling
3. Use transactions for multi-step operations
4. Monitor connection pool usage
5. Set appropriate timeouts
6. Log slow queries for optimization
