## Summary

This PR implements the Supabase adapter with basic CRUD operations, adds unit tests for the adapter and configuration, and sets up CI and repo hygiene files.

## Changes

- Implemented `SupabaseAdapter` (`src/infrastructure/database/adapters/SupabaseAdapter.ts`)
- Added unit tests for the adapter (`src/infrastructure/database/adapters/SupabaseAdapter.test.ts`)
- Added minimal config test (`src/config/config.test.ts`)
- Added `.gitattributes`, `.eslintignore`, `.prettierignore` to enforce LF and ignore node_modules
- Added GitHub Actions workflow `.github/workflows/ci.yml` to run lint → build → test
- Added `tsconfig.eslint.json` and updated ESLint config to include test files

## Validation

- All local tests pass (`npm test`) ✅
- Linting runs without errors (only minor warnings remain) ✅

## Checklist
- [x] Add implementation
- [x] Add tests
- [x] Add CI workflow
- [x] Documentation and templates updated

## Notes
- The Supabase adapter implements a small subset of behaviors (simple SELECT/insert/update/delete patterns) and is designed to be extended.
- Lint warnings: stray `console` in `src/index.ts` and a couple of `any` usages in tests/adapter; recommend addressing in follow-up PR.

Closes: (create related issues and link them here after review)
