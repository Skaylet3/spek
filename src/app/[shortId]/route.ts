import { getLinkById } from '@/services/storage';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: { shortId: string } },
) {
	const { shortId } = params;

	if (!shortId) {
		return NextResponse.json({ error: 'ID is required' }, { status: 400 });
	}

	const link = await getLinkById(shortId);

	if (!link) {
		// Redirect to home or show 404
		// According to spec: Redirect users when they access the short URL.
		// If not found, we can show a 404 page or redirect to home with error.
		return new NextResponse('Link not found', { status: 404 });
	}

	return NextResponse.redirect(link.originalUrl);
}
