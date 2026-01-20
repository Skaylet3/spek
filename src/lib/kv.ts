import { createClient } from '@vercel/kv';

const kvUrl = process.env.KV_REST_API_URL;
const kvToken = process.env.KV_REST_API_TOKEN;

// In a real Vercel environment, these should be present if the KV db is linked.
// We use a fallback empty string or ! to satisfy types, but but the service check
// in storage.ts will warn if these are actually missing in production.
export const kv = createClient({
	url: kvUrl || '',
	token: kvToken || '',
});
