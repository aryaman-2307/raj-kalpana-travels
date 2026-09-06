import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generatePageMetadata(
  'Book Bus Tickets | Raj Kalpana Travels',
  'Book your bus ticket with Raj Kalpana Travels. Chat with us on WhatsApp for instant booking across 50+ cities.',
  '/booking'
);

export const dynamic = 'force-static';

const WHATSAPP_NUMBER = '919355777632';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hello! I would like to book a bus ticket with Raj Kalpana Travels. Please help me with available buses, timings, and fares.'
);
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const popularRoutes = [
  { from: 'Delhi', to: 'Lucknow' },
  { from: 'Delhi', to: 'Varanasi' },
  { from: 'Delhi', to: 'Agra' },
  { from: 'Delhi', to: 'Gorakhpur' },
  { from: 'Lucknow', to: 'Delhi' },
  { from: 'Lucknow', to: 'Varanasi' },
  { from: 'Delhi', to: 'Kanpur' },
  { from: 'Varanasi', to: 'Delhi' },
];

const steps = [
  {
    step: '01',
    title: 'Send your details on WhatsApp',
    desc: 'Tell us your departure city, destination, and travel date.',
  },
  {
    step: '02',
    title: 'We share available buses',
    desc: 'Our team will send you all available buses, timings, and seat prices.',
  },
  {
    step: '03',
    title: 'Confirm your seat',
    desc: 'Choose your preferred bus and seat type. We block it for you instantly.',
  },
  {
    step: '04',
    title: 'Pay and get your ticket',
    desc: 'Pay via UPI / bank transfer. Your confirmed e-ticket is sent back on WhatsApp.',
  },
];

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#0F2B5B] via-[#1A3D7C] to-[#0F2B5B] text-white pt-36 pb-28 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#25D366]/20 border border-[#25D366]/40 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="text-sm font-semibold text-[#25D366]">Online Booking via WhatsApp</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Book Your Bus Ticket <br className="hidden md:block" />
            <span className="text-[#F59E0B]">Instantly on WhatsApp</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Our online booking system is being upgraded. Until then, chat with our team on
            WhatsApp for fast, easy, and secure ticket booking across 50+ cities.
          </p>

          {/* Primary WhatsApp CTA */}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:bg-[#1ebe5d] hover:scale-105 active:scale-95 transition-all duration-300"
            style={{ boxShadow: '0 8px 40px rgba(37,211,102,0.5)' }}
          >
            {/* WhatsApp icon */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Chat & Book on WhatsApp
          </a>

          <p className="mt-5 text-white/50 text-sm">
            Available 24/7 · Instant response · Secure booking
          </p>
        </div>
      </div>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-[#E53935] text-xs font-semibold uppercase tracking-widest mb-3">Simple & Fast</p>
          <h2 className="text-3xl font-bold text-[#1E293B]">How to Book in 4 Easy Steps</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <span className="text-5xl font-extrabold text-[#E2E8F0] block mb-4 leading-none">
                {s.step}
              </span>
              <h3 className="font-bold text-[#1E293B] mb-2 leading-snug">{s.title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Popular Routes */}
        <div className="mt-16 bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#1E293B] mb-6 text-center">Popular Routes — Ask for Prices</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {popularRoutes.map((r, i) => {
              const msg = encodeURIComponent(
                `Hello! I want to book a bus from ${r.from} to ${r.to}. Please share available buses, timings, and prices.`
              );
              return (
                <a
                  key={i}
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-4 py-3 bg-[#F8FAFC] hover:bg-[#25D366] rounded-xl border border-[#E2E8F0] hover:border-[#25D366] transition-all duration-200"
                >
                  <span className="text-sm font-semibold text-[#1E293B] group-hover:text-white transition-colors">
                    {r.from} → {r.to}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors flex-shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              );
            })}
          </div>
        </div>

        {/* Alternative contact */}
        <div className="mt-8 bg-[#0F2B5B] rounded-2xl p-8 text-white text-center">
          <p className="text-white/60 text-sm mb-2">Prefer to call us directly?</p>
          <a
            href="tel:+919355777632"
            className="text-3xl font-extrabold text-[#F59E0B] hover:text-white transition-colors"
          >
            +91 93557 77632
          </a>
          <p className="text-white/50 text-sm mt-2">Available 24 hours, 7 days a week</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/schedules"
              className="px-6 py-3 bg-white/10 rounded-full font-semibold text-sm hover:bg-white/20 transition-colors border border-white/20"
            >
              View All Schedules
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white/10 rounded-full font-semibold text-sm hover:bg-white/20 transition-colors border border-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
