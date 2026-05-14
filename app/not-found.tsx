import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-arch-black text-center px-4">
      <div className="w-px h-24 bg-grad from-transparent to-arch-gold mx-auto mb-8" style={{ background: 'linear-gradient(to bottom, transparent, #C9A84C)' }} />
      <p className="section-label mb-4">404</p>
      <h1 className="font-display text-7xl md:text-9xl text-arch-cream font-light mb-4">Not Found</h1>
      <p className="text-arch-muted max-w-md mb-10">The page you're looking for doesn't exist or has been moved.</p>
      <Link href="/" className="arch-btn arch-btn-outline">Return Home</Link>
    </div>
  );
}
