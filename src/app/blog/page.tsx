import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generatePageMetadata(
  'Blog — Coming Soon | Raj Kalpana Travels',
  'Our travel blog is coming soon — powered by WordPress. Get ready for tips, guides, and stories to make your bus journey better.',
  '/blog'
);

export const dynamic = 'force-static';

export default function BlogComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0F2B5B] via-[#1A3D7C] to-[#0F2B5B] text-white pt-36 pb-24 relative overflow-hidden flex-1 flex items-center">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#E53935]/5 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* WordPress badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur rounded-full px-5 py-2.5 mb-8 border border-white/20">
            {/* WordPress W logo */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white/80" aria-hidden="true">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 19.542c-5.26 0-9.542-4.282-9.542-9.542 0-5.26 4.282-9.542 9.542-9.542 5.26 0 9.542 4.282 9.542 9.542 0 5.26-4.282 9.542-9.542 9.542zM3.518 12c0 3.843 2.235 7.175 5.482 8.745L4.322 9.13A8.522 8.522 0 003.518 12zm14.829-1.165c0-1.2-.431-2.033-.8-2.679-.49-.797-.951-1.47-.951-2.266 0-.887.674-1.715 1.624-1.715.043 0 .083.005.124.007A8.525 8.525 0 0012 3.458c-2.9 0-5.448 1.487-6.935 3.742.195.006.378.01.535.01.868 0 2.213-.105 2.213-.105.448-.026.5.631.052.683 0 0-.45.053-.951.079l3.026 9.003 1.817-5.45-1.294-3.552c-.448-.026-.872-.079-.872-.079-.448-.026-.396-.71.052-.683 0 0 1.372.105 2.188.105.868 0 2.213-.105 2.213-.105.448-.026.5.631.053.683 0 0-.451.053-.952.079l3.004 8.936.83-2.772c.359-.963.566-1.656.566-2.253z" />
            </svg>
            <span className="text-sm font-semibold text-white/90">Powered by WordPress CMS</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Our Blog is{' '}
            <span className="relative">
              <span className="text-[#F59E0B]">Coming Soon</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 10 C 50 2, 250 2, 298 10"
                  stroke="#F59E0B"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.6"
                />
              </svg>
            </span>
          </h1>

          <p className="text-white/75 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            We are setting up our travel journal — packed with route guides, travel tips,
            destination stories, and safety advice for every bus traveler.
          </p>

          {/* What's coming */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-14">
            {[
              { icon: '🗺️', title: 'Route Guides', desc: 'Detailed guides for every major bus route we operate' },
              { icon: '💡', title: 'Travel Tips', desc: 'Smart advice for comfortable and safe bus journeys' },
              { icon: '📍', title: 'Destinations', desc: 'Explore top places to visit across North India' },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/15 text-left"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-[#E53935] text-white rounded-full font-bold text-sm hover:bg-[#C62828] transition-colors"
            >
              ← Back to Home
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 text-white rounded-full font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Meanwhile section */}
      <div className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#94A3B8] text-sm font-semibold uppercase tracking-widest mb-3">In the meantime</p>
          <h2 className="text-2xl font-bold text-[#1E293B] mb-8">Need help planning your journey?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'View Schedules',
                desc: 'See all available routes and timings',
                href: '/schedules',
                color: 'bg-[#0F2B5B]',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'FAQs',
                desc: 'Answers to common travel questions',
                href: '/faqs',
                color: 'bg-[#E53935]',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                title: 'Contact Us',
                desc: 'Our team is available 24/7',
                href: '/contact',
                color: 'bg-[#D97706]',
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex flex-col items-center p-6 rounded-2xl border border-[#E2E8F0] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span className={`${item.color} text-white p-3 rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </span>
                <h3 className="font-bold text-[#1E293B] mb-1">{item.title}</h3>
                <p className="text-[#64748B] text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
