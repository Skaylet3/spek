import { createClient } from '@vercel/kv';

if (process.env.NODE_ENV === 'production') {
	const requiredEnvVars = [
		'KV_URL',
		'KV_REST_API_URL',
		'KV_REST_API_TOKEN',
		'KV_REST_API_READ_ONLY_TOKEN',
	];
	const missingVars = requiredEnvVars.filter(v => !process.env[v]);

	if (missingVars.length > 0) {
		console.warn(
			`Warning: Missing Vercel KV environment variables: ${missingVars.join(', ')}`,
		);
	}
}

export const kv = createClient({
	url: process.env.KV_REST_API_URL!,
	token: process.env.KV_REST_API_TOKEN!,
});
