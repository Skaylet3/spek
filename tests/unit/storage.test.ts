import { createLink, getAllLinks, getLinkById } from '@/services/storage';
import fs from 'fs/promises';
import path from 'path';

jest.mock('@vercel/kv', () => ({
	createClient: jest.fn(() => ({
		get: jest.fn(),
		set: jest.fn(),
		exists: jest.fn(),
		keys: jest.fn(),
		mget: jest.fn(),
	})),
}));

// We'll use a specific test file instead of mocking fs
const TEST_DATA_DIR = path.join(process.cwd(), 'data');
const TEST_DATA_FILE = path.join(TEST_DATA_DIR, 'links.json');

describe('storage service', () => {
	beforeAll(async () => {
		// Ensure data directory exists
		await fs.mkdir(TEST_DATA_DIR, { recursive: true });
	});

	beforeEach(async () => {
		// Reset the test file before each test
		await fs.writeFile(TEST_DATA_FILE, JSON.stringify([]));
	});

	afterAll(async () => {
		// Clean up
		// In a real scenario we might want to delete the file,
		// but for now we'll just leave it or let the next run handle it.
	});

	it('should create and retrieve a link', async () => {
		const originalUrl = 'https://example.com';
		const newLink = await createLink(originalUrl);

		expect(newLink.originalUrl).toBe(originalUrl);
		expect(newLink.id).toBeDefined();
		expect(newLink.id.length).toBe(6);

		const retrieved = await getLinkById(newLink.id);
		expect(retrieved).toEqual(newLink);
	});

	it('should return all links', async () => {
		await createLink('https://a.com');
		await createLink('https://b.com');

		const links = await getAllLinks();
		expect(links).toHaveLength(2);
	});
});
