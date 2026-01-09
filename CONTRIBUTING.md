# Contributing to Jericho-API

Thank you for your interest in contributing to Jericho-API! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and considerate of others. We're all here to build something great together.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Jericho-API.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit and push
7. Create a Pull Request

## Development Setup

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn
- Git

### Installation
```bash
npm install
```

### Running Locally
```bash
# Development mode with hot reload
npm run dev

# Build
npm run build

# Run production build
npm start
```

## Development Guidelines

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Check formatting
npm run format:check

# Auto-format code
npm run format
```

**Important**: All code must pass linting before being merged.

### TypeScript

- Use strict TypeScript typing
- Avoid `any` types when possible
- Define interfaces for all data structures
- Use enums for fixed sets of values

### Architecture

Follow Clean Architecture principles:

1. **Domain Layer**: Pure business logic, no dependencies
2. **Application Layer**: Use cases and orchestration
3. **Infrastructure Layer**: Database and external services
4. **Presentation Layer**: HTTP handling

### Module Structure

When creating a new module, follow this structure:

```
modules/
└── your-module/
    ├── domain/          # Entities and interfaces
    ├── application/     # Use cases and services
    ├── infrastructure/  # Implementations
    └── presentation/    # Routes and controllers
```

See `docs/MODULE_DEVELOPMENT.md` for detailed guidance.

### Commit Messages

Use clear, descriptive commit messages:

```
feat: Add user authentication endpoint
fix: Resolve database connection timeout
docs: Update API documentation
refactor: Simplify error handling logic
test: Add unit tests for user service
```

Prefix guidelines:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage
```

**Requirements**:
- All new features must include tests
- Aim for >80% code coverage
- Test both success and error cases

### Pull Request Process

1. **Before submitting**:
   - Ensure all tests pass
   - Run linting and fix any issues
   - Update documentation if needed
   - Add tests for new features

2. **PR Description**:
   - Describe what changes you made
   - Explain why you made them
   - Reference any related issues

3. **Review Process**:
   - At least one approval required
   - All CI checks must pass
   - Address review feedback promptly

4. **Merging**:
   - Squash commits when merging
   - Delete branch after merge

## Project Structure

```
Jericho-API/
├── src/
│   ├── domain/          # Business entities and rules
│   ├── application/     # Use cases
│   ├── infrastructure/  # External services
│   ├── presentation/    # HTTP layer
│   ├── modules/         # Feature modules
│   ├── shared/          # Shared utilities
│   └── config/          # Configuration
├── docs/                # Documentation
└── tests/               # Test files
```

## Common Tasks

### Adding a New Endpoint

1. Define route in module's `presentation/routes.ts`
2. Create controller method in `presentation/controller.ts`
3. Implement business logic in `application/service.ts`
4. Add validation schema if needed
5. Write tests
6. Update API documentation

### Adding a New Database Adapter

1. Implement `IDatabaseAdapter` interface
2. Add connection configuration
3. Update factory pattern
4. Add tests
5. Update documentation

### Adding a New Module

1. Create module directory structure
2. Define domain entities
3. Create repository interfaces
4. Implement application services
5. Create routes and controllers
6. Add tests
7. Register routes in main app
8. Update documentation

## Questions or Need Help?

- Open an issue for bugs or feature requests
- Join our community discussions
- Check existing documentation

## Recognition

Contributors will be recognized in our README.md file.

Thank you for contributing to Jericho-API! 🎉
