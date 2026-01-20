'use client';

import { clsx } from 'clsx';
import { Check, Copy, Link as LinkIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
	return twMerge(clsx(inputs));
}

export default function UrlForm() {
	const [url, setUrl] = useState('');
	const [shortened, setShortened] = useState<{
		id: string;
		shortUrl: string;
	} | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		setShortened(null);

		try {
			const response = await fetch('/api/shorten', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Something went wrong');
			}

			setShortened(data);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	const copyToClipboard = () => {
		if (!shortened) return;
		const fullUrl = `${window.location.origin}${shortened.shortUrl}`;
		navigator.clipboard.writeText(fullUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className='w-full max-w-xl mx-auto space-y-6'>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div className='relative group'>
					<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
						<LinkIcon className='h-5 w-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors' />
					</div>
					<input
						type='url'
						required
						placeholder='Paste your long URL here...'
						className='block w-full pl-10 pr-3 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all backdrop-blur-sm'
						value={url}
						onChange={e => setUrl(e.target.value)}
					/>
				</div>

				<button
					type='submit'
					disabled={isLoading}
					className='w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-2xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2'
				>
					{isLoading ? (
						<Loader2 className='h-5 w-5 animate-spin' />
					) : (
						'Shorten URL'
					)}
				</button>
			</form>

			{error && (
				<div className='p-4 bg-red-900/20 border border-red-900/50 rounded-xl text-red-400 text-sm animate-in fade-in slide-in-from-top-2'>
					{error}
				</div>
			)}

			{shortened && (
				<div className='p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl space-y-4 animate-in zoom-in-95 duration-300'>
					<div className='flex items-center justify-between'>
						<h3 className='text-sm font-medium text-zinc-400'>
							Your shortened link:
						</h3>
					</div>
					<div className='flex flex-col sm:flex-row gap-3'>
						<div className='flex-1 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-blue-400 break-all'>
							{`${typeof window !== 'undefined' ? window.location.origin : ''}${shortened.shortUrl}`}
						</div>
						<button
							onClick={copyToClipboard}
							className='px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2'
						>
							{copied ? (
								<>
									<Check className='h-4 w-4 text-green-500' />
									<span>Copied!</span>
								</>
							) : (
								<>
									<Copy className='h-4 w-4' />
									<span>Copy</span>
								</>
							)}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
