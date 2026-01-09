# Module Development Guide

## Creating a New Module

Each module in Jericho-API follows the Clean Architecture pattern. This guide walks you through creating a new module.

## Module Structure

```
modules/
└── {module-name}/
    ├── domain/
    │   ├── entities/       # Domain entities
    │   ├── repositories/   # Repository interfaces
    │   └── value-objects/  # Value objects
    ├── application/
    │   ├── use-cases/      # Business logic
    │   ├── dtos/           # Data transfer objects
    │   └── services/       # Application services
    ├── infrastructure/
    │   ├── repositories/   # Repository implementations
    │   └── adapters/       # External service adapters
    └── presentation/
        ├── routes.ts       # Route definitions
        ├── controller.ts   # Request handlers
        └── schemas.ts      # Validation schemas
```

## Step-by-Step Guide

### 1. Define Domain Entity

Create your entity in `domain/entities/`:

```typescript
// modules/posts/domain/entities/Post.ts
import { AuditableEntity } from '@shared/types';

export interface Post extends AuditableEntity {
  title: string;
  content: string;
  authorId: string;
  projectId: string;
  published: boolean;
  tags?: string[];
}
```

### 2. Create Repository Interface

Define repository interface in `domain/repositories/`:

```typescript
// modules/posts/domain/repositories/IPostRepository.ts
import { Repository } from '@domain/repositories';
import { Post } from '../entities/Post';

export interface IPostRepository extends Repository<Post> {
  findByAuthor(authorId: string): Promise<Post[]>;
  findByProject(projectId: string): Promise<Post[]>;
  publish(postId: string): Promise<void>;
}
```

### 3. Create Application Service

Implement business logic in `application/services/`:

```typescript
// modules/posts/application/services/PostsService.ts
export class PostsService {
  constructor(private postRepository: IPostRepository) {}

  async createPost(data: CreatePostDto): Promise<Post> {
    // Validate data
    // Apply business rules
    return await this.postRepository.create(data);
  }

  async publishPost(postId: string): Promise<void> {
    const post = await this.postRepository.findById(postId);
    if (!post) throw new NotFoundError('Post');
    
    await this.postRepository.publish(postId);
  }
}
```

### 4. Create DTOs

Define data transfer objects in `application/dtos/`:

```typescript
// modules/posts/application/dtos/CreatePostDto.ts
export interface CreatePostDto {
  title: string;
  content: string;
  authorId: string;
  projectId: string;
  tags?: string[];
}
```

### 5. Implement Repository

Create concrete implementation in `infrastructure/repositories/`:

```typescript
// modules/posts/infrastructure/repositories/PostRepository.ts
export class PostRepository implements IPostRepository {
  constructor(private db: IDatabaseAdapter) {}

  async findById(id: string): Promise<Post | null> {
    // Implementation
  }

  async findByAuthor(authorId: string): Promise<Post[]> {
    // Implementation
  }

  // ... other methods
}
```

### 6. Create Controller

Handle HTTP requests in `presentation/controller.ts`:

```typescript
// modules/posts/presentation/controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';

export const postsController = {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as CreatePostDto;
    const post = await postsService.createPost(data);
    return reply.status(201).send(post);
  },

  async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const post = await postsService.getById(id);
    return reply.send(post);
  },
};
```

### 7. Define Routes

Create route definitions in `presentation/routes.ts`:

```typescript
// modules/posts/presentation/routes.ts
import { FastifyInstance } from 'fastify';
import { postsController } from './controller';

export async function postsRoutes(app: FastifyInstance) {
  app.get('/', postsController.getAll);
  app.get('/:id', postsController.getById);
  app.post('/', postsController.create);
  app.put('/:id', postsController.update);
  app.delete('/:id', postsController.delete);
}
```

### 8. Create Validation Schemas

Define request/response schemas in `presentation/schemas.ts`:

```typescript
// modules/posts/presentation/schemas.ts
import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  authorId: z.string().uuid(),
  projectId: z.string().uuid(),
  tags: z.array(z.string()).optional(),
});
```

### 9. Register Routes

Add module routes to main app:

```typescript
// src/presentation/app.ts
import { postsRoutes } from '../modules/posts/presentation/routes';

// In buildApp function:
await app.register(postsRoutes, { prefix: '/api/v1/posts' });
```

## Best Practices

### Domain Layer
- Keep entities pure - no framework dependencies
- Use value objects for concepts without identity
- Define clear repository interfaces
- Encapsulate business rules in entities

### Application Layer
- Keep use cases focused and single-purpose
- Use DTOs for cross-layer communication
- Validate input at this layer
- Handle business logic errors

### Infrastructure Layer
- Implement repository interfaces
- Handle database-specific logic
- Manage connections and transactions
- Transform between domain and persistence models

### Presentation Layer
- Validate HTTP input with schemas
- Keep controllers thin - delegate to services
- Return appropriate HTTP status codes
- Handle and format errors properly

## Testing

### Unit Tests
```typescript
// modules/posts/application/__tests__/PostsService.test.ts
describe('PostsService', () => {
  it('should create a post', async () => {
    const mockRepository = createMockPostRepository();
    const service = new PostsService(mockRepository);
    
    const result = await service.createPost(mockData);
    expect(result).toBeDefined();
  });
});
```

### Integration Tests
```typescript
// modules/posts/presentation/__tests__/routes.test.ts
describe('POST /api/v1/posts', () => {
  it('should create a post', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/posts',
      payload: mockPostData,
    });
    
    expect(response.statusCode).toBe(201);
  });
});
```

## Common Patterns

### Dependency Injection
```typescript
// Use constructor injection
class PostsService {
  constructor(
    private postRepository: IPostRepository,
    private authorService: AuthorService,
  ) {}
}
```

### Error Handling
```typescript
try {
  await service.createPost(data);
} catch (error) {
  if (error instanceof ValidationError) {
    return reply.status(400).send({ error: error.message });
  }
  throw error;
}
```

### Pagination
```typescript
interface PaginationParams {
  page: number;
  limit: number;
}

async getAll(params: PaginationParams) {
  const skip = (params.page - 1) * params.limit;
  return await this.repository.findAll({ skip, limit: params.limit });
}
```

## Example Modules

Study these existing modules for reference:
- `auth`: Authentication and authorization
- `users`: User management
- `projects`: Project management
- `api-keys`: API key management
