---
title: Implement MongoDB, PostgreSQL and MySQL adapters with integration tests
labels: enhancement, medium priority
---

**Goal**: Fully implement the remaining database adapters with connection pooling, CRUD, and transaction support, plus add integration tests that run against Docker services.

**Acceptance Criteria**:
- Working `MongoDBAdapter`, `PostgreSQLAdapter`, `MySQLAdapter` implementing `IDatabaseAdapter`
- Integration tests running via `docker-compose` or a CI matrix
- Docs updated in `docs/DATABASE_ADAPTERS.md` with usage examples

**Notes**:
- Use official clients (`mongodb`, `pg`, `mysql2`) and their pooling APIs
- Tests should clean up data and be idempotent
