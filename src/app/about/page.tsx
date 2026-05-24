import { generatePageMetadata, generateLocalBusinessJsonLd } from '@/lib/seo';
import { COMPANY_NAME, COMPANY_PHONE, COMPANY_EMAIL, COMPANY_ADDRESS } from '@/lib/constants';

export const metadata = generatePageMetadata(
  'About Us — Raj Kalpana Travels',
  'Learn about Raj Kalpana Travels — our story, mission, fleet, and commitment to safe, comfortable bus travel across North India.',
  '/about'
);

const stats = [
  { label: 'Years of Service', value: '10+' },
  { label: 'Happy Passengers', value: '5,00,000+' },
  { label: 'Routes Covered', value: '25+' },
  { label: 'Buses in Fleet', value: '50+' },
];

const values = [
  {
    title: 'Safety First',
    description: 'Every bus undergoes rigorous maintenance checks. Our trained drivers and GPS-tracked fleet ensure your safety on every journey.',
    icon: 'shield',
  },
  {
    title: 'Customer Comfort',
    description: 'From premium sleeper berths to charging points and WiFi, we invest in amenities that make overnight travel a pleasure.',
    icon: 'heart',
  },
  {
    title: 'Punctuality',
    description: 'We respect your time. Our buses maintain strict schedules with real-time tracking so you always know where your bus is.',
    icon: 'clock',
  },
  {
    title: 'Affordable Fares',
    description: 'Premium bus travel does not have to be expensive. We offer competitive pricing across all routes without compromising quality.',
    icon: 'tag',
  },
];

function IconShield() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconTag() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

const iconMap: Record<string, () => React.JSX.Element> = {
  shield: IconShield,
  heart: IconHeart,
  clock: IconClock,
  tag: IconTag,
};

export default function AboutPage() {
  const jsonLd = generateLocalBusinessJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0F2B5B] to-[#1a3f7a] text-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About {COMPANY_NAME}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Your trusted partner for safe, comfortable, and affordable bus travel across North India since 2014.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F8FAFC] to-transparent" aria-hidden="true" />
      </section>

      {/* Company Story */}
      <section className="py-16 md:py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1E293B]">Our Story</h2>
            <div className="mt-6 space-y-4 text-[#64748B] text-lg leading-relaxed">
              <p>
                {COMPANY_NAME} was founded with a simple vision — to provide passengers across North India with a bus travel experience that is safe, comfortable, and reliable. What started as a small operation with just a few buses running between Delhi and Lucknow has grown into a trusted name serving over 25 routes across Uttar Pradesh, Madhya Pradesh, and beyond.
              </p>
              <p>
                Our founder believed that every passenger, regardless of their budget, deserves a dignified and pleasant journey. That belief continues to guide us as we expand our fleet, upgrade our buses, and adopt new technologies like GPS tracking and online booking to serve you better.
              </p>
              <p>
                From our head office at {COMPANY_ADDRESS}, our dedicated team of professionals works around the clock to ensure that every bus departs on time, every seat is clean, and every passenger reaches their destination safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]"
              >
                <p className="text-3xl md:text-4xl font-bold text-[#0F2B5B]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[#64748B] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E293B]">Our Values</h2>
            <p className="mt-3 text-[#64748B] text-lg max-w-2xl mx-auto">
              These core principles guide everything we do — from how we maintain our buses to how we treat every passenger.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = iconMap[value.icon];
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0F2B5B]/10 text-[#0F2B5B] flex items-center justify-center mb-4">
                    {Icon && <Icon />}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E293B]">Our Fleet</h2>
            <p className="mt-3 text-[#64748B] text-lg max-w-2xl mx-auto">
              We operate a modern fleet of well-maintained buses to suit every travel need and budget.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Bharat Benz Semi Sleeper AC',
                desc: 'Our flagship buses with reclining seats, air conditioning, WiFi, and charging points. Ideal for overnight journeys.',
                features: ['Air Conditioning', 'Reclining Seats', 'WiFi', 'Charging Points'],
              },
              {
                name: 'Air Suspension Premium Sleeper AC',
                desc: 'Premium sleeper berths with individual reading lights, blankets, and pillows. The ultimate overnight comfort.',
                features: ['Sleeper Berths', 'Air Suspension', 'Reading Lights', 'Blankets'],
              },
              {
                name: 'Non-AC Seater/Sleeper',
                desc: 'Affordable and reliable option for shorter routes. Comfortable seating with basic amenities.',
                features: ['Budget Friendly', 'Charging Points', 'Water Bottle', 'GPS Tracking'],
              },
            ].map((bus) => (
              <div
                key={bus.name}
                className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0]"
              >
                <div className="h-40 rounded-xl bg-gradient-to-br from-[#0F2B5B]/10 to-[#0F2B5B]/5 flex items-center justify-center mb-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0F2B5B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8 6v6M15 6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-1.4-1.4-10-2-10H4C3.4 4 2 12.6 2 14c0 .4.1.8.2 1.2.3 1.1.8 2.8.8 2.8h3" />
                    <circle cx="7" cy="18" r="2" />
                    <circle cx="17" cy="18" r="2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1E293B] mb-2">
                  {bus.name}
                </h3>
                <p className="text-[#64748B] text-sm mb-4">{bus.desc}</p>
                <ul className="space-y-1">
                  {bus.features.map((f) => (
                    <li key={f} className="text-sm text-[#1E293B] flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-[#0F2B5B] to-[#1a3f7a] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="mt-3 text-blue-100 text-lg max-w-2xl mx-auto">
            Have questions or need assistance? Our support team is available 24/7.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {COMPANY_PHONE}
            </span>
            <span className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {COMPANY_EMAIL}
            </span>
          </div>
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-block bg-[#E53935] hover:bg-[#c62828] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
