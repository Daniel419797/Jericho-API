---
title: Add CI coverage upload and formatting checks to CI workflow
labels: ci, medium priority
---

**Goal**: Enhance the `CI` workflow to include code coverage collection (lcov), upload coverage reports, and enforce formatting checks (Prettier) so PRs must pass format checks.

**Acceptance Criteria**:
- CI job uploads coverage artifacts (lcov) and fails if coverage drops below a threshold (configurable)
- CI runs `npm run format:check` and fails if formatting issues are present
- Optionally add a status check for code coverage

**Notes**:
- Use `actions/upload-artifact` for coverage
- Consider using `codecov` or `coveralls` integration later
