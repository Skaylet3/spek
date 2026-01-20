# Research: Vercel Persistence Support

## Decision 1: Storage Layer Abstraction

**Decision**: Refactor `storage.ts` to use a provider pattern or environment-based switching.
**Rationale**: Allows local development to continue using `links.json` (as per the constitution for local dev) while using Vercel KV in production.
**Alternatives considered**: Switching entirely to KV even for local. Rejected to keep local setup zero-dependency (no need for local Redis).

## Decision 2: Vercel KV Integration

**Decision**: Use `@vercel/kv` package.
**Rationale**: Official Vercel SDK for Redis, handles authentication via environment variables (`KV_URL`, `KV_REST_API_URL`, etc.) automatically.
**Alternatives considered**: `ioredis`. Rejected because `@vercel/kv` is optimized for serverless and easy to configure in the Vercel dashboard.

## Decision 3: Migration Strategy

**Decision**: One-time migration script triggered via a manual command or an initialization check.
**Rationale**: Since the volume of data is small, a simple script that reads `links.json` and performs `kv.set` for each link is sufficient.
**Alternatives considered**: Automated migration on every start. Rejected as it adds unnecessary overhead to serverless cold starts.

## Decision 4: Redirection Logic

**Decision**: Use `kv.hgetall` or `kv.get` depending on data structure.
**Rationale**: `kv.get(shortId)` is the fastest way to retrieve the original URL.
**Alternatives considered**: Storing all links in one large hash. Rejected due to potential size limits and performance as the number of links grows.
