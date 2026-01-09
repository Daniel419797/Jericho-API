# Architecture Overview

## Clean Architecture Principles

Jericho-API follows Clean Architecture principles to ensure:
- **Independence of Frameworks**: Business logic isn't dependent on external libraries
- **Testability**: Business logic can be tested without UI, database, or external elements
- **Independence of UI**: The UI can change without affecting the system
- **Independence of Database**: Business rules don't know about the database
- **Independence of External Agencies**: Business rules don't know about external interfaces

## Layers

### 1. Domain Layer (`src/domain/`)
The innermost layer containing enterprise business rules.

**Components:**
- **Entities**: Business objects with identity (User, Project, ApiKey, etc.)
- **Value Objects**: Immutable objects defined by their attributes
- **Repository Interfaces**: Contracts for data access
- **Domain Events**: Events that represent domain state changes

**Rules:**
- No dependencies on outer layers
- Pure TypeScript with no framework dependencies
- Contains core business logic

### 2. Application Layer (`src/application/`)
Contains application-specific business rules and use cases.

**Components:**
- **Use Cases**: Application-specific business operations
- **DTOs**: Data Transfer Objects for cross-layer communication
- **Interfaces**: Contracts for external services

**Rules:**
- Depends only on the Domain layer
- Orchestrates domain objects to perform use cases
- Independent of delivery mechanisms

### 3. Infrastructure Layer (`src/infrastructure/`)
Contains implementations of interfaces defined in inner layers.

**Components:**
- **Database Adapters**: Implementations for different databases
  - Supabase Adapter
  - MongoDB Adapter
  - PostgreSQL Adapter
  - MySQL Adapter
- **External Services**: Third-party API integrations
- **Repositories**: Concrete implementations of repository interfaces

**Rules:**
- Implements interfaces from Domain/Application layers
- Contains framework-specific code
- Can depend on external libraries

### 4. Presentation Layer (`src/presentation/`)
The outermost layer handling HTTP requests/responses.

**Components:**
- **Routes**: API endpoint definitions
- **Controllers**: Request handling and response formatting
- **Middlewares**: Request/response interceptors
- **Schemas**: Request/response validation schemas

**Rules:**
- Depends on Application layer
- Handles HTTP-specific concerns
- Delegates business logic to use cases

## Dependency Rule

Dependencies point inward:
```
Presentation → Application → Domain
     ↓              ↓
Infrastructure → Domain
```

Outer layers can depend on inner layers, but never the reverse.

## Module Structure

Each feature module follows the same layered structure:

```
modules/
└── {feature}/
    ├── domain/          # Feature-specific entities
    ├── application/     # Feature-specific use cases
    ├── infrastructure/  # Feature-specific implementations
    └── presentation/    # Feature-specific routes/controllers
```

## Communication Between Layers

1. **Controller → Use Case**: Controllers call use cases with DTOs
2. **Use Case → Repository**: Use cases call repository interfaces
3. **Repository Implementation → Database**: Infrastructure implements repositories
4. **Use Case → Controller**: Use cases return DTOs to controllers

## Benefits

- **Maintainability**: Clear separation of concerns
- **Testability**: Each layer can be tested independently
- **Flexibility**: Easy to swap implementations (e.g., change databases)
- **Scalability**: New features follow the same pattern
- **Team Collaboration**: Different teams can work on different layers

## Example Flow

User Registration Flow:
1. Request hits `/api/v1/auth/register` (Presentation)
2. Controller validates input and calls RegisterUserUseCase (Application)
3. Use case validates business rules and calls UserRepository (Domain Interface)
4. Repository implementation saves user to Supabase (Infrastructure)
5. Response flows back through layers to client
