import { createClient } from '@vercel/kv';
import * as dotenv from 'dotenv';
import * as fs from 'fs/promises';
import path from 'path';
import { Link } from '../models/link';

// Load .env.local if it exists
dotenv.config({ path: '.env.local' });

const DATA_FILE = path.join(process.cwd(), 'data', 'links.json');

async function migrate() {
	console.log('🚀 Starting migration...');

	const kvUrl = process.env.KV_REST_API_URL;
	const kvToken = process.env.KV_REST_API_TOKEN;

	if (!kvUrl || !kvToken) {
		console.error(
			'❌ Error: KV_REST_API_URL or KV_REST_API_TOKEN environment variables are missing.',
		);
		process.exit(1);
	}

	const kv = createClient({
		url: kvUrl,
		token: kvToken,
	});

	try {
		const data = await fs.readFile(DATA_FILE, 'utf-8');
		const links: Link[] = JSON.parse(data);

		console.log(`found ${links.length} links in local storage.`);

		for (const link of links) {
			process.stdout.write(`Migrating link:${link.id}... `);
			await kv.set(`link:${link.id}`, link);
			console.log('✅');
		}

		console.log('\n✨ Migration completed successfully!');
	} catch (error) {
		if ((error as any).code === 'ENOENT') {
			console.log('ℹ️ No local links.json found. Nothing to migrate.');
		} else {
			console.error('❌ Migration failed:', error);
		}
	}
}

migrate();
