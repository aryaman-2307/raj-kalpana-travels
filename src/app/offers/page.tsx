import { generatePageMetadata } from '@/lib/seo';
import { OFFERS } from '@/data/offers';

export const metadata = generatePageMetadata(
  'Offers & Discounts — Raj Kalpana Travels',
  'Check out the latest offers, discount codes, and deals on bus ticket bookings with Raj Kalpana Travels.',
  '/offers'
);

export default function OffersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F2B5B] to-[#1a3f7a] text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Offers & Discounts
          </h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Save more on your bus journeys with our exclusive offers and promotional discounts.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-4 text-sm text-[#92400e]">
          <strong>Note:</strong> These are sample promotional offers for display purposes. Actual offers and coupon validation are handled by the backend at the time of booking.
        </div>
      </div>

      {/* Offers Grid */}
      <section className="py-12 md:py-16 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {OFFERS.map((offer) => (
              <article
                key={offer.id}
                className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Discount Badge */}
                <div className="bg-gradient-to-r from-[#E53935] to-[#c62828] text-white px-6 py-3 flex items-center justify-between">
                  <span className="font-bold text-lg">{offer.discount}</span>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-mono px-3 py-1 rounded-lg tracking-wider">
                    {offer.code}
                  </span>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#1E293B] mb-2">
                    {offer.title}
                  </h2>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                    {offer.description}
                  </p>

                  {/* Valid Until */}
                  <div className="flex items-center gap-2 text-sm text-[#64748B] mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>
                      Valid until{' '}
                      {new Date(offer.validUntil).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Terms */}
                  <details className="group">
                    <summary className="text-sm font-medium text-[#0F2B5B] cursor-pointer hover:underline flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="group-open:rotate-90 transition-transform">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      Terms &amp; Conditions
                    </summary>
                    <p className="mt-2 text-xs text-[#64748B] leading-relaxed pl-5">
                      {offer.terms}
                    </p>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#1E293B]">
            Ready to Save on Your Next Trip?
          </h2>
          <p className="mt-3 text-[#64748B] max-w-xl mx-auto">
            Apply an offer code during checkout and enjoy discounted travel.
          </p>
          <a
            href="/booking"
            className="mt-6 inline-block bg-[#E53935] hover:bg-[#c62828] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Book Now
          </a>
        </div>
      </section>
    </>
  );
}
