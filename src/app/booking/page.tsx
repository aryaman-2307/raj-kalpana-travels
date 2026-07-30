import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';
import SearchWidget from '@/components/home/SearchWidget';

export const metadata = generatePageMetadata(
  'Book Bus Tickets Online | Raj Kalpana Travels',
  'Book your bus ticket online with Raj Kalpana Travels. Search live buses, check seat availability, and confirm your booking across 50+ cities.',
  '/booking'
);

const popularRoutes = [
  { from: 'Delhi', to: 'Lucknow', fromId: '14', toId: '26' },
  { from: 'Delhi', to: 'Varanasi', fromId: '14', toId: '56' },
  { from: 'Delhi', to: 'Agra', fromId: '14', toId: '2' },
  { from: 'Delhi', to: 'Gorakhpur', fromId: '14', toId: '19' },
  { from: 'Lucknow', to: 'Delhi', fromId: '26', toId: '14' },
  { from: 'Lucknow', to: 'Varanasi', fromId: '26', toId: '56' },
  { from: 'Delhi', to: 'Kanpur', fromId: '14', toId: '24' },
  { from: 'Varanasi', to: 'Delhi', fromId: '56', toId: '14' },
];

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Live Seat Availability',
    desc: 'Real-time data directly from our booking system.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Secure Booking',
    desc: 'Your payment and personal data are fully protected.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
    title: 'Instant E-Ticket',
    desc: 'Get your confirmed ticket via SMS, email & WhatsApp.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Easy Cancellation',
    desc: 'Cancel your booking anytime as per our refund policy.',
  },
];

export default function BookingPage() {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0F2B5B] via-[#1A3D7C] to-[#0F2B5B] text-white pt-36 pb-32 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/40 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-semibold text-green-400">Live Booking Now Available</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Book Your Bus Ticket <br className="hidden md:block" />
            <span className="text-[#F59E0B]">Online in Seconds</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
            Search live buses, pick your seat, and confirm your booking instantly across 50+ cities.
          </p>
        </div>
      </div>

      {/* Search Widget floats over hero */}
      <SearchWidget />

      {/* Features */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-lg transition-shadow text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0F2B5B]/10 text-[#0F2B5B] mb-4">
                {f.icon}
              </div>
              <h3 className="font-bold text-[#1E293B] mb-1">{f.title}</h3>
              <p className="text-[#64748B] text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Popular Routes */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#1E293B] mb-6 text-center">Popular Routes</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {popularRoutes.map((r, i) => {
              const params = new URLSearchParams({
                fromId: r.fromId,
                toId: r.toId,
                fromName: r.from,
                toName: r.to,
                date: today,
              });
              return (
                <Link
                  key={i}
                  href={`/search-results?${params.toString()}`}
                  className="group flex items-center justify-between px-4 py-3 bg-[#F8FAFC] hover:bg-[#0F2B5B] rounded-xl border border-[#E2E8F0] hover:border-[#0F2B5B] transition-all duration-200"
                >
                  <span className="text-sm font-semibold text-[#1E293B] group-hover:text-white transition-colors">
                    {r.from} → {r.to}
                  </span>
                  <svg className="w-4 h-4 text-[#0F2B5B] group-hover:text-white transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Help section */}
        <div className="mt-8 bg-[#0F2B5B] rounded-2xl p-8 text-white text-center">
          <p className="text-white/60 text-sm mb-2">Need help with your booking?</p>
          <a href="tel:+919355777632" className="text-3xl font-extrabold text-[#F59E0B] hover:text-white transition-colors">
            +91 93557 77632
          </a>
          <p className="text-white/50 text-sm mt-2">Available 24 hours, 7 days a week</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/manage-bookings" className="px-6 py-3 bg-white/10 rounded-full font-semibold text-sm hover:bg-white/20 transition-colors border border-white/20">
              Manage My Booking
            </Link>
            <Link href="/contact" className="px-6 py-3 bg-white/10 rounded-full font-semibold text-sm hover:bg-white/20 transition-colors border border-white/20">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
