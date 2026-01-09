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
- **Role-Based Access Control (RBAC)**: Flexible permission system
- **API Key Management**: Secure API key generation and validation
- **Schema Management**: Dynamic schema definition and validation
- **File Management**: Support for multiple storage providers
- **TypeScript**: Full type safety and excellent developer experience
- **Fastify**: High-performance web framework
- **Modular Monolith**: Easy to understand and maintain

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

**Note**: This is a boilerplate/foundation structure. Implementation of business logic is pending and marked with `TODO` comments throughout the codebase.