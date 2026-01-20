# Implementation Plan: Vercel Persistence Support

**Branch**: `002-vercel-persistence` | **Date**: 2026-01-20 | **Spec**: [/specs/002-vercel-persistence/spec.md](/specs/002-vercel-persistence/spec.md)
**Input**: Feature specification from `/specs/002-vercel-persistence/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command.

## Summary

Implement persistent cloud storage for the URL shortener using Vercel KV (Redis) to resolve 500 errors in production environments where the local filesystem is read-only. The solution includes migrating existing data from `links.json` to the cloud store.

## Technical Context

**Language/Version**: TypeScript 5+ (Node.js 18+)
**Primary Dependencies**: Next.js 14+ (App Router), TailwindCSS, `@vercel/kv`
**Storage**: Vercel KV (Redis)
**Testing**: Jest + React Testing Library
**Target Platform**: Vercel (Serverless)
**Project Type**: Web Application
**Performance Goals**: <2s UI latency, <500ms redirect latency
**Constraints**: Read-only filesystem in production (Vercel)
**Scale/Scope**: Small scale, persistent mappings

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **Minimalist Core**: PASS. Focused solely on fixing persistence for the core feature.
- **Stack Compliance**: PASS. Uses Next.js, TailwindCSS, TypeScript. Adding `@vercel/kv` for cloud support.
- **Local Data Persistence**: **VIOLATION**. Principle III requires local JSON.
- **Simplicity & Architecture**: PASS. Direct integration with `@vercel/kv` maintains simplicity.

## Project Structure

### Documentation (this feature)

```text
specs/002-vercel-persistence/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── [shortId]/
│   │   └── route.ts       # Updated to use KV for redirects
│   └── api/
│       └── shorten/
│           └── route.ts   # Updated to use KV for creation
├── services/
│   └── storage.ts         # Abstraction layer updated to support both Local and KV
├── lib/
│   └── kv.ts              # Vercel KV client initialization
├── scripts/
│   └── migrate.ts         # Migration script (Local -> KV)
└── models/
    └── link.ts            # (Existing)
```

**Structure Decision**: Standard Next.js App Router structure. We will enhance the `storage.ts` service to detect the environment and toggle between local storage (for development) and Vercel KV (for production).

## Complexity Tracking

| Violation              | Why Needed                                                             | Simpler Alternative Rejected Because                                                              |
| ---------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Local Data Persistence | Fix 500 errors on Vercel deployment where the filesystem is read-only. | Using `tmp` storage rejected because it is ephemeral and not persistent across function restarts. |
