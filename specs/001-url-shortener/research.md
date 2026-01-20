# Research & Decisions: URL Shortener Service

**Feature**: URL Shortener
**Date**: 2026-01-19

## Decision 1: Application Architecture
- **Decision**: Next.js App Router
- **Rationale**: Mandated by user and Constitution. Provides unified framework for both frontend UI and backend API routes/redirects.
- **Alternatives Considered**: 
    - *Express.js + React*: Rejected due to Constitution and extra complexity of separate backend.
    - *Next.js Pages Router*: Rejected in favor of modern App Router standards.

## Decision 2: Data Storage
- **Decision**: Local JSON File (`data/links.json`)
- **Rationale**: Mandated by user for zero-overhead persistence. Sufficient for single-instance minimalist prototype.
- **Alternatives Considered**:
    - *SQLite*: Rejected (Constitution: Local Data Persistence as JSON).
    - *PostgreSQL/Redis*: Rejected (Constitution: Minimalist Core, no external DB).

## Decision 3: Short ID Generation
- **Decision**: 6-character random alphanumeric string (A-Z, a-z, 0-9).
- **Rationale**: Sufficient entropy (~56 billion combinations) for a small-scale service. Simple to implement.
- **Collision Handling**: Check existence before saving; retry if collision (unlikely at small scale).

## Decision 4: Redirect Implementation
- **Decision**: Route Handler (`app/[shortId]/route.ts`)
- **Rationale**: Allows server-side redirection using `NextResponse.redirect()`. This is cleaner and performant compared to rendering a React component that triggers a client-side redirect. It effectively acts as a dynamic API endpoint.
