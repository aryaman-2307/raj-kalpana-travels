const OFFERS = [
  {
    title: 'First Ride Discount',
    discount: '10% OFF',
    gradient: 'from-[#E53935] to-[#0F2B5B]',
    description: 'New to Raj Kalpana? Get 10% off on your first booking. Use code FIRST10 at checkout.',
    code: 'FIRST10',
  },
  {
    title: 'App Booking Bonus',
    discount: '₹100 OFF',
    gradient: 'from-[#0F2B5B] to-[#1A3D7C]',
    description: 'Download our app and book your next trip to get an instant ₹100 discount on any route.',
    code: 'APP100',
  },
  {
    title: 'Festival Special',
    discount: '15% OFF',
    gradient: 'from-[#F59E0B] to-[#E53935]',
    description: 'Celebrate the season with 15% off on all routes during the festive period. Limited time offer!',
    code: 'FEST15',
  },
];

export default function OffersPreview() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="uppercase tracking-wider text-xs font-semibold text-red-accent">
            Deals & Offers
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text mt-2 font-display">
            Special Offers
          </h2>
          <p className="text-muted mt-3 max-w-2xl mx-auto">
            Grab exclusive discounts and save more on your next bus journey.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFERS.map((offer) => (
            <div
              key={offer.code}
              className="rounded-2xl overflow-hidden border border-[#E2E8F0] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Top Section — Gradient */}
              <div className={`bg-gradient-to-r ${offer.gradient} p-6 md:p-7 text-white relative overflow-hidden`}>
                {/* Decorative circles */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5" />

                <div className="relative">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    {offer.discount}
                  </span>
                  <h3 className="text-xl font-bold font-display">{offer.title}</h3>
                </div>
              </div>

              {/* Bottom Section — White */}
              <div className="bg-white p-6">
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {offer.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border border-dashed rounded-lg text-xs font-mono font-bold text-navy">
                    {offer.code}
                  </span>
                  <a
                    href="/booking"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-red-accent hover:text-red-dark transition-colors"
                  >
                    View Details
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
