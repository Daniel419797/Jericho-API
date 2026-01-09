# Jericho-API

A flexible, multi-tenant API platform built with TypeScript, Fastify, and Clean Architecture principles. Jericho-API supports multiple database backends (Supabase, MongoDB, PostgreSQL, MySQL) with a modular monolith architecture designed for scalability and maintainability.

## 🏗️ Architecture

Jericho-API follows **Clean Architecture** principles with a modular monolith structure:

```
src/
├── domain/              # Enterprise business rules
│   ├── entities/        # Business entities
│   ├── repositories/    # Repository interfaces
│   ├── value-objects/   # Value objects
│   └── events/          # Domain events
├── application/         # Application business rules
│   ├── use-cases/       # Use case implementations
│   ├── dtos/            # Data transfer objects
│   └── interfaces/      # Application interfaces
├── infrastructure/      # Frameworks & drivers
│   ├── database/        # Database adapters
│   │   ├── supabase/    # Supabase implementation
│   │   ├── mongodb/     # MongoDB implementation
│   │   ├── postgresql/  # PostgreSQL implementation
│   │   ├── mysql/       # MySQL implementation
│   │   └── adapters/    # Database adapter interfaces
│   ├── external-services/
│   └── adapters/
├── presentation/        # Interface adapters
│   ├── routes/          # API routes
│   ├── controllers/     # Controllers
│   ├── middlewares/     # Middlewares
│   └── schemas/         # Request/response schemas
├── modules/             # Feature modules
│   ├── auth/            # Authentication & authorization
│   ├── users/           # User management
│   ├── projects/        # Project management
│   ├── schemas/         # Schema management
│   ├── files/           # File management
│   ├── roles/           # Role-based access control
│   └── api-keys/        # API key management
├── shared/              # Shared utilities
│   ├── errors/          # Custom error classes
│   ├── utils/           # Utility functions
│   ├── types/           # Shared types
│   └── constants/       # Constants
└── config/              # Configuration management
```

## ✨ Features

- **Multi-Tenant Architecture**: Project-based isolation with API keys
- **Multiple Database Support**: Choose from Supabase, MongoDB, PostgreSQL, or MySQL
- **Clean Architecture**: Separation of concerns with clear boundaries
- **Dependency Injection**: Lightweight DI container for service management
- **Modular Architecture**: Easy to extend with new feature modules
- **Role-Based Access Control (RBAC)**: Flexible permission system
- **API Key Management**: Secure API key generation and validation
- **Schema Management**: Dynamic schema definition and validation
- **File Management**: Support for multiple storage providers
- **TypeScript**: Full type safety and excellent developer experience
- **Fastify**: High-performance web framework
- **Supabase Integration**: Platform-level database with real-time capabilities

## 🎯 Core Backend Bootstrap

The Jericho-API backend is bootstrapped with:

1. **Fastify Server**: High-performance HTTP server with plugin ecosystem
2. **Dependency Injection Container**: Manages service lifecycle and dependencies
3. **Environment Configuration**: Type-safe config loader with multi-tenant support
4. **Supabase Integration**: Platform database client for user/project management
5. **Module System**: Pre-configured modules for auth, users, and projects
6. **Route Registration**: Automatic API endpoint registration with versioning
7. **Security Middleware**: CORS, Helmet, and rate limiting built-in
8. **Health Checks**: Monitoring endpoint for service availability
9. **Logging**: Structured logging with Pino
10. **Testing**: Jest integration tests for API endpoints

## 🎯 User Tiers

Jericho-API supports three user tiers with different capabilities:

### 1. Casual Users (Dashboard Configuration)
- **Configuration**: Dashboard-based only
- **Limits**:
  - Up to 3 projects
  - Up to 5 API keys
  - Up to 10 users per project
  - 100 requests/minute rate limit
- **Features**: Basic project and API management

### 2. Power Users (Environment + API Configuration)
- **Configuration**: Dashboard + Environment variables + API
- **Limits**:
  - Up to 10 projects
  - Up to 20 API keys
  - Up to 100 users per project
  - 1,000 requests/minute rate limit
- **Features**: All casual features plus:
  - Custom domain support
  - Advanced RBAC
  - API configuration access

### 3. Enterprise Users (Self-Hosted)
- **Configuration**: Full control (Dashboard + Env + API + Self-hosted)
- **Limits**: Unlimited
- **Features**: All power features plus:
  - Self-hosted deployment
  - Custom integrations
  - Priority support
  - SLA guarantees

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Database of choice (Supabase account, MongoDB, PostgreSQL, or MySQL)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Daniel419797/Jericho-API.git
cd Jericho-API
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment template:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
# Platform Database (Supabase for platform management)
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# JWT Configuration
JWT_SECRET=your-secret-key

# Server Configuration
NODE_ENV=development
PORT=3000
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Development Commands

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage
```

## 📊 Database Configuration

### Platform Database (Supabase)
Used for platform-level data (users, projects, API keys, etc.):
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

### User Project Databases
Each project can choose its own database backend:

#### MongoDB
```env
MONGODB_URI=mongodb://localhost:27017
```

#### PostgreSQL
```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=jericho_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

#### MySQL
```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB=jericho_db
MYSQL_USER=root
MYSQL_PASSWORD=root
```

#### Supabase (User Project)
Projects can also use their own Supabase instance with their own credentials.

## 🔑 API Key Usage

Generate and use API keys for authentication:

```bash
# Generate an API key (from dashboard or API)
POST /api/v1/api-keys

# Use API key in requests
curl -H "Authorization: Bearer jka_your_api_key_here" \
  http://localhost:3000/api/v1/projects
```

## 🔐 Authentication

Jericho-API supports multiple authentication methods:

1. **JWT Tokens**: For user authentication
2. **API Keys**: For programmatic access
3. **OAuth** (Coming soon): Social login support

## 🔧 Extending the API

### Adding a New Module

Jericho-API is designed to be easily extensible. To add a new feature module:

1. **Create the module structure:**
```bash
mkdir -p src/modules/your-feature/{domain,application,infrastructure,presentation}
```

2. **Create the service** (`src/modules/your-feature/application/yourFeatureService.ts`):
```typescript
export class YourFeatureService {
  async create(data: Record<string, unknown>) {
    // Implement your logic
  }
  
  async getById(id: string) {
    // Implement your logic
  }
}
```

3. **Create the controller** (`src/modules/your-feature/presentation/yourFeatureController.ts`):
```typescript
import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from '../../../shared/container';
import { YourFeatureService } from '../application/yourFeatureService';

export const yourFeatureController = {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const service = container.resolve<YourFeatureService>('YourFeatureService');
    const result = await service.create(request.body as Record<string, unknown>);
    return reply.send(result);
  },
};
```

4. **Create the routes** (`src/modules/your-feature/presentation/routes.ts`):
```typescript
import { FastifyInstance } from 'fastify';
import { yourFeatureController } from './yourFeatureController';

export async function yourFeatureRoutes(app: FastifyInstance) {
  app.post('/', yourFeatureController.create);
  app.get('/:id', yourFeatureController.getById);
}
```

5. **Register in DI container** (`src/config/container.ts`):
```typescript
import { YourFeatureService } from '../modules/your-feature/application/yourFeatureService';

// Add to setupContainer function:
container.registerFactory('YourFeatureService', () => {
  return new YourFeatureService();
});
```

6. **Register routes** (`src/presentation/app.ts`):
```typescript
import { yourFeatureRoutes } from '../modules/your-feature/presentation/routes';

// In buildApp function:
await app.register(yourFeatureRoutes, { prefix: '/api/v1/your-feature' });
```

### Dependency Injection Container

The API uses a lightweight DI container for managing service dependencies:

```typescript
import { container } from './shared/container';

// Register a service instance
container.register('MyService', myServiceInstance);

// Register a factory for lazy initialization
container.registerFactory('MyService', () => new MyService());

// Resolve a service
const service = container.resolve<MyService>('MyService');
```

**Benefits:**
- Loose coupling between components
- Easy testing with mock services
- Centralized service management
- Lazy initialization of services

### Available Services

The following services are registered in the DI container:

- **SupabaseService**: Platform database client
- **AuthService**: Authentication and authorization
- **UsersService**: User management
- **ProjectsService**: Project management
- **SupabaseAdapter**: Supabase database adapter
- **MongoDBAdapter**: MongoDB database adapter
- **PostgreSQLAdapter**: PostgreSQL database adapter
- **MySQLAdapter**: MySQL database adapter

### Working with Database Adapters

To use a database adapter in your service:

```typescript
import { container } from '../../../shared/container';
import { IDatabaseAdapter } from '../../../infrastructure/database/adapters';

export class MyService {
  private db: IDatabaseAdapter;

  constructor() {
    // Resolve the appropriate adapter based on configuration
    this.db = container.resolve<IDatabaseAdapter>('SupabaseAdapter');
  }

  async getData() {
    return await this.db.query('SELECT * FROM my_table');
  }
}
```

## 🏢 Project Structure Best Practices

Each module follows the same structure:
- `domain/`: Business entities and logic
- `application/`: Use cases and services
- `infrastructure/`: Database and external service implementations
- `presentation/`: API routes and controllers

## 🛠️ Technology Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Web Framework**: Fastify
- **Platform Database**: Supabase
- **User Databases**: MongoDB, PostgreSQL, MySQL, Supabase
- **Validation**: Zod
- **Logging**: Pino
- **Security**: Helmet, CORS, Rate Limiting

## 📝 API Documentation

API documentation will be available at `/docs` once implemented (Swagger/OpenAPI).

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with Clean Architecture principles
- Inspired by modern API platform best practices
- Designed for flexibility and scalability

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**Status**: ✅ Core backend bootstrap completed. The API server is ready for development with:
- Fastify server with health checks
- Dependency injection container
- Supabase platform database integration
- Module routes (auth, users, projects) registered
- Environment-driven configuration
- Security middleware (CORS, Helmet, Rate Limiting)
- Test infrastructure with Jest

**Next Steps**: Implement business logic in module services and add domain models.