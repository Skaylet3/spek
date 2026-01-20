# Tasks: Vercel Persistence Support

**Input**: Design documents from `/specs/002-vercel-persistence/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Install dependencies `@vercel/kv` and `ts-node` (for migration) in `package.json`
- [ ] T002 [P] Create KV client initialization in `src/lib/kv.ts`
- [ ] T003 [P] Add environment variable validation for `KV_URL` and `KV_REST_API_URL`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Refactor `src/services/storage.ts` to support both local filesystem and Vercel KV via environment detection
- [ ] T005 Implement collision detection using `kv.exists` in `src/services/storage.ts`
- [ ] T006 [P] Create migration script template in `src/scripts/migrate.ts`

**Checkpoint**: Foundation ready - storage layer is now capable of handling either local or cloud data.

---

## Phase 3: User Story 1 - Reliable URL Shortening in Production (Priority: P1) 🎯 MVP

**Goal**: Enable URL shortening in Vercel environment without 500 errors.

**Independent Test**: Set `KV_URL` and `KV_REST_API_URL` environment variables, then use the app to shorten a URL. Verify the record is created in the KV store and not written to the local filesystem.

### Implementation for User Story 1

- [ ] T007 [US1] Update `createLink` in `src/services/storage.ts` to use `kv.set` when in production
- [ ] T008 [US1] Update `getAllLinks` in `src/services/storage.ts` to use `kv.keys` and `kv.mget` (or similar) when in production
- [ ] T009 [US1] Verify `src/app/api/shorten/route.ts` works correctly with the abstraction
- [ ] T010 [US1] Implement one-time data migration logic in `src/scripts/migrate.ts`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently in a cloud context.

---

## Phase 4: User Story 2 - Persistent Redirection (Priority: P1)

**Goal**: Ensure redirected links work across serverless function restarts.

**Independent Test**: visit `/[shortId]` for a link created in the KV store. Verify redirection to the original URL.

### Implementation for User Story 2

- [ ] T011 [US2] Update `getLinkById` in `src/services/storage.ts` to use `kv.get` for fast retrieval
- [ ] T012 [US2] Verify `src/app/[shortId]/route.ts` works correctly with the KV-backed retrieval
- [ ] T013 [US2] Add error handling for "Link not found" scenarios in KV

**Checkpoint**: Redirection is now robust across serverless scaling and restarts.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T014 [P] Update `README.md` with Vercel deployment and KV configuration steps
- [ ] T015 Run `src/scripts/migrate.ts` to ensure local data is synced to the new cloud store (if environment is ready)
- [ ] T016 [P] Remove `data/links.json` from production build process or ignore it in KV mode
- [ ] T017 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on T001, T002.
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion.
- **User Story 2 (Phase 4)**: Depends on Phase 2 completion.
- **Polish (Final Phase)**: Depends on Phase 3 and 4.

### Parallel Opportunities

- T002 and T003 can be done in parallel.
- T014 and T016 can be done in parallel.
- T011 and T012 can be started alongside Phase 3 once T004 is ready (Foundational completion).

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

The most critical part is fixing the 500 error and ensuring redirects work.

1. Complete Phase 1 and 2.
2. Complete Phase 3 (Shortening).
3. Complete Phase 4 (Redirection).
4. Run migration.

### Incremental Delivery

1. **Foundational Readiness**: Refactor storage but keep it pointing to local files by default.
2. **Shortening Fix**: Enable KV path for creation.
3. **Redirection Fix**: Enable KV path for retrieval.
4. **Data Sync**: Run migration to preserve existing links.
