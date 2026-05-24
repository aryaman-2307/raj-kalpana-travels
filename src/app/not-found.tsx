import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#F8FAFC]">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#E53935]/10 mb-8">
          <svg className="w-12 h-12 text-[#E53935]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-6xl font-bold font-[family-name:var(--font-plus-jakarta-sans)] text-[#0F2B5B] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#1E293B] mb-4">Page Not Found</h2>
        <p className="text-[#64748B] max-w-md mx-auto mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#E53935] text-white rounded-full font-semibold hover:bg-[#C62828] transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#0F2B5B] text-[#0F2B5B] rounded-full font-semibold hover:bg-[#0F2B5B] hover:text-white transition-colors"
          >
            Book a Bus
          </Link>
        </div>
      </div>
    </section>
  );
}
