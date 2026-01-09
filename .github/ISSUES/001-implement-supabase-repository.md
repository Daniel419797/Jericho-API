---
title: Implement platform Supabase repository and wire to auth
labels: enhancement, high priority
---

**Goal**: Implement a repository that uses `SupabaseAdapter` for platform data (users, projects, api-keys) and wire it to the `auth` module so registration/login persists to Supabase.

**Acceptance Criteria**:
- A `SupabaseUserRepository` implementing `IUserRepository` exists
- `auth` module uses the repository for register/login flows
- Unit tests for user registration and login (>80% coverage for auth service)
- Integration test (mock/simulated Supabase) verifying persistence

**Notes**:
- Use the existing `SupabaseAdapter` client
- Add env var docs in `.env.example` for SUPABASE_* values
