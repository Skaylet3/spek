# Quickstart: URL Shortener

## Prerequisites
- Node.js 18+
- npm or pnpm

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Environment**:
    Ensure `data/` directory exists for storage.
    ```bash
    mkdir -p data
    echo "[]" > data/links.json
    ```

## Running the App

1.  **Development Server**:
    ```bash
    npm run dev
    ```
    Access UI at `http://localhost:3000`.

2.  **Verify Feature**:
    - **Create Link**: Enter `https://example.com` in the input field and click "Shorten".
    - **Redirect**: Click the resulting link (e.g., `http://localhost:3000/AbCdEf`) and verify it goes to example.com.
    - **API Test**:
      ```bash
      curl -X POST http://localhost:3000/api/shorten \
        -H "Content-Type: application/json" \
        -d '{"url": "https://google.com"}'
      ```

## Testing

1.  **Run Tests**:
    ```bash
    npm test
    ```
