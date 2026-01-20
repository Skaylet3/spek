import { createLink } from '@/services/storage';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { url } = await request.json();

		if (!url) {
			return NextResponse.json({ error: 'URL is required' }, { status: 400 });
		}

		// Basic URL validation
		try {
			new URL(url);
		} catch {
			return NextResponse.json(
				{ error: 'Invalid URL format' },
				{ status: 400 },
			);
		}

		const newLink = await createLink(url);

		return NextResponse.json(
			{
				id: newLink.id,
				shortUrl: `/${newLink.id}`,
				originalUrl: newLink.originalUrl,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error('API Error:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
