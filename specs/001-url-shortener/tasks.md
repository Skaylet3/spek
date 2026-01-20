---
description: 'Task list for URL Shortener Service implementation'
---

# Tasks: URL Shortener Service

**Input**: Design documents from `/specs/001-url-shortener/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/
**Tests**: OPTIONAL - only included if explicitly requested.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel
- **[Story]**: User Story label (e.g., US1, US2)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create Next.js App Router project structure with src directory
- [x] T002 Initialize TailwindCSS configuration
- [x] T003 Create data directory and initialize empty links.json
- [x] T004 [P] Configure Jest and React Testing Library

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T005 Create Link interface/type in src/models/link.ts
- [x] T006 Implement data access layer (read/write JSON) in src/services/storage.ts
- [x] T007 [P] Create utility for ID generation in src/lib/utils.ts
- [x] T008 [P] Unit test for storage service in tests/unit/storage.test.ts

**Checkpoint**: Foundation ready - storage service can read/write to local JSON file.

## Phase 3: User Story 1 - Create Short Link (Priority: P1) 🎯 MVP

**Goal**: Users can input a URL and receive a shortened version.

**Independent Test**: Enter valid URL -> Click Shorten -> See Short URL.

### Implementation for User Story 1

- [x] T009 [US1] Create API Route Handler for creation in src/app/api/shorten/route.ts
- [x] T010 [P] [US1] Create URL input form component in src/components/UrlForm.tsx
- [x] T011 [US1] Implement main page UI with form in src/app/page.tsx
- [x] T012 [P] [US1] Integration test for creation API in tests/integration/api.test.ts
- [x] T013 [US1] Add client-side validation and error handling in UrlForm.tsx

**Checkpoint**: User Story 1 functional. Can generate links via UI and API.

## Phase 4: User Story 2 - Redirect (Priority: P1)

**Goal**: Short links redirect to original URLs.

**Independent Test**: Visit short link -> Redirected to original URL.

### Implementation for User Story 2

- [x] T014 [US2] Create Dynamic Route Handler for redirect in src/app/[shortId]/route.ts
- [x] T015 [US2] Implement 404 handling for invalid IDs in src/app/[shortId]/route.ts
- [x] T016 [P] [US2] Add redirect test cases to tests/integration/api.test.ts

**Checkpoint**: User Story 2 functional. Short links redirect correctly.

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements and final validation

- [x] T017 Update README.md with run instructions
- [x] T018 Verify all success criteria from spec.md
- [x] T019 Final cleanup of unused files or console logs

## Dependencies & Execution Order

1. **Phase 1 (Setup)**: Blocks everything.
2. **Phase 2 (Foundation)**: Blocks US1 and US2. Depends on Phase 1.
3. **Phase 3 (US1)**: Independent of US2. Depends on Foundation.
4. **Phase 4 (US2)**: Independent of US1 (technically, but needs data to redirect). Depends on Foundation.

## Parallel Opportunities

- **Setup**: T004 (Testing config) can run parallel to T001-T003.
- **Foundation**: T007 (Utils) and T008 (Tests) can run parallel to T006 (Storage).
- **User Stories**: US1 and US2 can theoretically run in parallel after Foundation is complete, as US2 only reads what US1 writes (or what is manually seeded).
- **Within US1**: T010 (Component) and T009 (API) can be parallelized.

## Implementation Strategy

### MVP Delivery

1. Complete Phase 1 & 2.
2. Complete Phase 3 (US1) -> Deliver Link Creation.
3. Complete Phase 4 (US2) -> Deliver Redirection.
4. Polish.
