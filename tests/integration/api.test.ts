import { GET } from '@/app/[shortId]/route';
import { POST } from '@/app/api/shorten/route';
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

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'links.json');

describe('API Integration', () => {
	beforeEach(async () => {
		await fs.mkdir(DATA_DIR, { recursive: true });
		await fs.writeFile(DATA_FILE, JSON.stringify([]));
	});

	it('should shorten a valid URL', async () => {
		const mockRequest = {
			json: async () => ({ url: 'https://example.com' }),
		} as any;

		const response = await POST(mockRequest);
		expect(response.status).toBe(201);

		const data = await response.json();
		expect(data.id).toBeDefined();
		expect(data.originalUrl).toBe('https://example.com');
	});

	it('should redirect for a valid ID', async () => {
		const link = {
			id: 'test12',
			originalUrl: 'https://example.com',
			createdAt: new Date().toISOString(),
		};
		await fs.writeFile(DATA_FILE, JSON.stringify([link]));

		const mockRequest = {} as any;
		const params = { shortId: 'test12' };

		const response = await GET(mockRequest, { params });
		expect([307, 308, 302, 303]).toContain(response.status);
		expect(response.headers.get('location')).toMatch(
			/^https:\/\/example\.com\/?$/,
		);
	});

	it('should return 404 for non-existent ID', async () => {
		const mockRequest = {} as any;
		const params = { shortId: 'nonexistent' };

		const response = await GET(mockRequest, { params });
		expect(response.status).toBe(404);
	});
});
