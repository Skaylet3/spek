# Implementation Plan: URL Shortener Service

**Branch**: `001-url-shortener` | **Date**: 2026-01-19 | **Spec**: [specs/001-url-shortener/spec.md](../spec.md)
**Input**: Feature specification from `/specs/001-url-shortener/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command.

## Summary

Implement a minimalist URL shortener using Next.js App Router. The service will accept a long URL via a text input, generate a unique short ID, store the mapping in a local JSON file, and redirect users when they access the short URL.

## Technical Context

**Language/Version**: TypeScript 5+ (Node.js 18+)
**Primary Dependencies**: Next.js 14+ (App Router), TailwindCSS
**Storage**: Local file system (JSON)
**Testing**: Jest + React Testing Library
**Target Platform**: Web (Next.js server-side & client-side)
**Project Type**: Web Application
**Performance Goals**: <2s UI latency, fast redirects
**Constraints**: No external database, no user accounts
**Scale/Scope**: Small scale, single-file persistence

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Minimalist Core**: PASS. Focused solely on shortening and redirecting.
- **Stack Compliance**: PASS. Uses Next.js, TailwindCSS, TypeScript.
- **Local Data Persistence**: PASS. Uses local JSON file for storage.
- **Simplicity & Architecture**: PASS. Simple App Router structure with Route Handlers.

## Project Structure

### Documentation (this feature)

```text
specs/001-url-shortener/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
# Next.js App Router Structure
src/
├── app/
│   ├── api/
│   │   └── shorten/
│   │       └── route.ts   # POST: Create short link
│   ├── [shortId]/
│   │   └── route.ts       # GET: Redirect logic
│   ├── page.tsx           # UI: Form to input URL
│   └── layout.tsx         # Root layout
├── components/
│   └── UrlForm.tsx        # Client component for input
├── services/
│   └── storage.ts         # Data access layer (JSON file ops)
├── models/
│   └── link.ts            # Types/Interfaces
└── lib/
    └── utils.ts           # Helper functions (ID generation)

tests/
├── integration/
│   └── api.test.ts
└── unit/
    └── storage.test.ts
```

**Structure Decision**: Standard Next.js App Router project with `src/` directory. API routes are co-located in `app/api`. Dynamic route `[shortId]` handles redirects. Data logic isolated in `services/`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |