import { kv } from '@/lib/kv';
import { generateId } from '@/lib/utils';
import { Link } from '@/models/link';
import * as fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'links.json');

const isProduction =
	process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

async function ensureDataFile() {
	if (isProduction) return;
	try {
		await fs.access(DATA_FILE);
	} catch {
		await fs.mkdir(DATA_DIR, { recursive: true });
		await fs.writeFile(DATA_FILE, JSON.stringify([]));
	}
}

export async function getAllLinks(): Promise<Link[]> {
	if (isProduction) {
		const keys = await kv.keys('link:*');
		if (keys.length === 0) return [];
		const links = await kv.mget<Link[]>(...keys);
		return links.filter((l): l is Link => l !== null);
	}

	await ensureDataFile();
	const data = await fs.readFile(DATA_FILE, 'utf-8');
	return JSON.parse(data);
}

export async function getLinkById(id: string): Promise<Link | undefined> {
	if (isProduction) {
		const link = await kv.get<Link>(`link:${id}`);
		return link || undefined;
	}

	const links = await getAllLinks();
	return links.find(link => link.id === id);
}

export async function createLink(originalUrl: string): Promise<Link> {
	let id = generateId();

	if (isProduction) {
		// Collision handling with kv.exists
		while (await kv.exists(`link:${id}`)) {
			id = generateId();
		}

		const newLink: Link = {
			id,
			originalUrl,
			createdAt: new Date().toISOString(),
		};

		await kv.set(`link:${id}`, newLink);
		return newLink;
	}

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
	await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2));

	return newLink;
}
