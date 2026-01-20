import { kv } from '@/lib/kv';
import { generateId } from '@/lib/utils';
import { Link } from '@/models/link';
import * as fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'links.json');

// Determine if we should use KV or Local Storage
// We default to KV if on Vercel or if KV secrets are present
const isVercel = process.env.VERCEL === '1';
const hasKVSecrets = !!(
	process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);
const useKV = isVercel || hasKVSecrets;

console.log(
	`[Storage Service] Mode: ${useKV ? 'KV (Cloud)' : 'Local (Filesystem)'}`,
);
if (useKV && !hasKVSecrets) {
	console.warn(
		'[Storage Service] CRITICAL: Running on Vercel but KV secrets are missing! Falling back to KV operations which WILL fail.',
	);
}

async function ensureDataFile() {
	if (useKV) return;
	try {
		await fs.access(DATA_FILE);
	} catch {
		try {
			await fs.mkdir(DATA_DIR, { recursive: true });
			await fs.writeFile(DATA_FILE, JSON.stringify([]));
		} catch (err) {
			console.error(
				'[Storage Service] Failed to initialize local storage:',
				err,
			);
		}
	}
}

export async function getAllLinks(): Promise<Link[]> {
	if (useKV) {
		try {
			const keys = await kv.keys('link:*');
			if (keys.length === 0) return [];
			// mget<Link>(...) returns (Link | null)[]
			const links = await kv.mget<Link>(...keys);
			return links.filter((l): l is Link => l !== null);
		} catch (error) {
			console.error('[Storage Service] KV getAllLinks error:', error);
			throw error;
		}
	}

	try {
		await ensureDataFile();
		const data = await fs.readFile(DATA_FILE, 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		console.error('[Storage Service] Local getAllLinks error:', error);
		return [];
	}
}

export async function getLinkById(id: string): Promise<Link | undefined> {
	if (useKV) {
		try {
			const link = await kv.get<Link>(`link:${id}`);
			return link || undefined;
		} catch (error) {
			console.error(`[Storage Service] KV getLinkById(${id}) error:`, error);
			throw error;
		}
	}

	const links = await getAllLinks();
	return links.find(link => link.id === id);
}

export async function createLink(originalUrl: string): Promise<Link> {
	let id = generateId();

	if (useKV) {
		try {
			// Collision handling with kv.exists
			let exists = await kv.exists(`link:${id}`);
			while (exists) {
				id = generateId();
				exists = await kv.exists(`link:${id}`);
			}

			const newLink: Link = {
				id,
				originalUrl,
				createdAt: new Date().toISOString(),
			};

			await kv.set(`link:${id}`, newLink);
			return newLink;
		} catch (error) {
			console.error('[Storage Service] KV createLink error:', error);
			throw error;
		}
	}

	try {
		const links = await getAllLinks();
		// Collision handling
		while (links.some(link => link.id === id)) {
			id = generateId();
		}

		const newLink: Link = {
			id,
			originalUrl,
			createdAt: new Date().toISOString(),
		};

		links.push(newLink);
		await ensureDataFile();
		await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2));

		return newLink;
	} catch (error) {
		console.error('[Storage Service] Local createLink error:', error);
		throw error;
	}
}
