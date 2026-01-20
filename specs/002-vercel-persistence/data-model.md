# Data Model: Vercel Persistence Support

## Entities

### Link

Represents a shortened URL mapping.

**Redis Key Strategy**: `link:{id}` (String)

**Fields**:

- `id`: Unique short code (e.g., `a7b2c`) - **Stored as part of the key**
- `originalUrl`: The target URL (string) - **Stored as the value (JSON string or object)**
- `createdAt`: ISO 8601 timestamp (string)

**Example Value**:

```json
{
	"id": "a7b2c",
	"originalUrl": "https://example.com/very/long/path",
	"createdAt": "2026-01-20T18:42:58Z"
}
```

## Operations

1. **Create**: `SET link:{id} {JSON_STRING}`
2. **Retrieve**: `GET link:{id}`
3. **Check Existence**: `EXISTS link:{id}` (used for collision detection during generation)
