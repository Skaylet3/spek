# Data Model: URL Shortener Service

## Storage Mechanism
Data is stored in a local JSON file, typically located at `data/links.json` (or similar path configurable via env/constants).

## Entity: Link

Represents a shortened URL mapping.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `id` | `string` | Unique identifier (the short code) | Alphanumeric, 6 chars, Unique |
| `originalUrl` | `string` | The destination URL | Valid URL format (http/https) |
| `createdAt` | `string` (ISO 8601) | Timestamp of creation | Valid Date |

## File Structure (JSON)

The JSON file will contain an array of Link objects.

```json
[
  {
    "id": "aB3dE9",
    "originalUrl": "https://www.example.com/very/long/path",
    "createdAt": "2026-01-19T10:00:00Z"
  }
]
```

## Data Access Layer (Service)

The `storage.ts` service will handle:
1.  **Read**: Parse JSON file into memory.
2.  **Write**: Serialize array to JSON file.
3.  **Find**: `getLinkById(id: string): Link | undefined`
4.  **Create**: `createLink(url: string): Link` (handles ID generation and persistence)
