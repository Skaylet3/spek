# API Contract: URL Shortener

## POST /api/shorten

Creates a new short URL.

### Request

- **Method**: `POST`
- **Body**:
  ```json
  {
  	"url": "string (required, must be a valid URL)"
  }
  ```

### Response (201 Created)

- **Body**:
  ```json
  {
  	"id": "string",
  	"shortUrl": "string",
  	"originalUrl": "string"
  }
  ```

### Response (400 Bad Request)

- **Body**:
  ```json
  {
  	"error": "Invalid URL"
  }
  ```

## GET /[shortId]

Redirects to the original URL.

### Parameters

- `shortId`: The unique short code.

### Response (302 Found)

- **Header**: `Location: [originalUrl]`

### Response (404 Not Found)

- **Body**:
  ```json
  {
  	"error": "Link not found"
  }
  ```
