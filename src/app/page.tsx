import UrlForm from '@/components/UrlForm';
import { Sparkles } from 'lucide-react';

export default function Home() {
	return (
		<main className='min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center p-6'>
			{/* Background Gradients */}
			<div className='absolute top-0 left-0 w-full h-full overflow-hidden -z-10'>
				<div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full' />
				<div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full' />
			</div>

			<div className='w-full max-w-4xl mx-auto text-center space-y-12'>
				{/* Hero Section */}
				<div className='space-y-4'>
					<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500'>
						<Sparkles className='h-3 w-3 text-blue-500' />
						<span>Modern URL shortening</span>
					</div>
					<h1 className='text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500'>
						Linkly
					</h1>
					<p className='text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed'>
						Shorten your long, messy links into clean, shareable URLs in
						seconds. Built for speed and simplicity.
					</p>
				</div>

				{/* Main Action */}
				<div className='animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150'>
					<UrlForm />
				</div>

				{/* Footer */}
				<footer className='pt-12 text-zinc-600 text-sm'>
					<p>© 2026 Linkly. All rights preserved (locally).</p>
				</footer>
			</div>
		</main>
	);
}
