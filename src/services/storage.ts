import { generateId } from '@/lib/utils';
import { Link } from '@/models/link';
import * as fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'links.json');

async function ensureDataFile() {
	try {
		await fs.access(DATA_FILE);
	} catch {
		await fs.mkdir(DATA_DIR, { recursive: true });
		await fs.writeFile(DATA_FILE, JSON.stringify([]));
	}
}

export async function getAllLinks(): Promise<Link[]> {
	await ensureDataFile();
	const data = await fs.readFile(DATA_FILE, 'utf-8');
	return JSON.parse(data);
}

export async function getLinkById(id: string): Promise<Link | undefined> {
	const links = await getAllLinks();
	return links.find(link => link.id === id);
}

export async function createLink(originalUrl: string): Promise<Link> {
	const links = await getAllLinks();

	let id = generateId();
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
