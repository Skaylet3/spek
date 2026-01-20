<!--
SYNC IMPACT REPORT
==================
Version: New -> 1.0.0
Principles Modified:
- [NEW] Minimalist Core
- [NEW] Stack Compliance
- [NEW] Local Data Persistence
- [NEW] Simplicity & Architecture

Templates Status:
- .specify/templates/plan-template.md: ✅
- .specify/templates/spec-template.md: ✅
- .specify/templates/tasks-template.md: ✅

Follow-up:
- None
-->
# Gem Link Shortener Constitution

## Core Principles

### I. Minimalist Core
The service MUST focus solely on link shortening and redirection. Features like user accounts, complex analytics, or link expiration are strictly out of scope unless this constitution is amended. This ensures the project remains lightweight and focused on its primary utility.

### II. Stack Compliance
Development MUST use Next.js, TailwindCSS, and TypeScript. No external UI component libraries (e.g., Material UI, Chakra, Radix) are permitted without an amendment. Standard Next.js patterns (App Router preferred) should be followed.

### III. Local Data Persistence
To maintain zero operational overhead, data MUST be stored in a local JSON file. No external database connections (PostgreSQL, MongoDB, Redis, etc.) are permitted. Data access logic MUST be isolated in a dedicated service to allow for potential future migration, but the current implementation remains file-based.

### IV. Simplicity & Architecture
The architecture MUST be simple. Avoid over-engineering or complex patterns (like strict Domain-Driven Design layers) where direct logic suffices. Code should be easy to read and modify. Files should be organized intuitively within the standard Next.js project structure.

## Governance

### Amendment Process
This constitution supersedes all other practices. Any changes to the core principles (stack, storage, scope) require a formal amendment to this document, a version bump, and team ratification.

### Compliance
All architectural decisions, PRs, and code reviews must verify compliance with these principles. Complexity must be justified against Principle IV.

**Version**: 1.0.0 | **Ratified**: 2026-01-19 | **Last Amended**: 2026-01-19