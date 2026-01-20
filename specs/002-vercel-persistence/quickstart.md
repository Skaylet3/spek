# Quickstart: Vercel Persistence Support

## Setup

1. **Provision Vercel KV**:
   - Go to your Vercel Dashboard.
   - Select the project.
   - Go to "Storage" tab.
   - Create a New KV database.
   - Connect it to your project environment.

2. **Local Development**:
   - Run `npm install @vercel/kv`.
   - The application will continue to use `data/links.json` by default when `KV_URL` is not set.

3. **Migration**:
   - To migrate local links to production KV:
     ```bash
     npx ts-node src/scripts/migrate.ts
     ```
     _(Note: Requires KV environment variables to be set in your terminal or .env.local)_

4. **Testing**:
   - Run `npm test` to ensure existing logic is preserved.
   - Integration tests will be updated to mock the KV store.
