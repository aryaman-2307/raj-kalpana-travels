const ROUTES = [
  {
    from: 'Delhi',
    to: 'Lucknow',
    price: '₹899',
    duration: '8h 30m',
    buses: 12,
  },
  {
    from: 'Lucknow',
    to: 'Delhi',
    price: '₹899',
    duration: '8h 30m',
    buses: 12,
  },
  {
    from: 'Delhi',
    to: 'Varanasi',
    price: '₹1,299',
    duration: '12h',
    buses: 8,
  },
  {
    from: 'Delhi',
    to: 'Agra',
    price: '₹499',
    duration: '4h',
    buses: 15,
  },
  {
    from: 'Delhi',
    to: 'Kanpur',
    price: '₹799',
    duration: '7h',
    buses: 10,
  },
  {
    from: 'Delhi',
    to: 'Ujjain',
    price: '₹1,499',
    duration: '14h',
    buses: 5,
  },
];

export default function TopRoutes() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="uppercase tracking-wider text-xs font-semibold text-red-accent">
            Top Routes
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text mt-2 font-display">
            Popular bus routes.
          </h2>
          <p className="text-muted mt-3 max-w-2xl mx-auto">
            Explore our most-booked routes with daily departures and affordable fares.
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ROUTES.map((route) => (
            <div
              key={`${route.from}-${route.to}`}
              className="bg-white rounded-3xl border border-[#E2E8F0] p-6 hover:border-[#E53935] hover:shadow-xl transition-all duration-300 group"
            >
              {/* Bus Count Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-navy/5 text-navy text-xs font-semibold rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  {route.buses} buses
                </span>
              </div>

              {/* Route */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xl font-bold text-text font-display">{route.from}</span>
                <div className="flex items-center gap-1 text-muted">
                  <div className="w-2 h-2 rounded-full bg-red-accent" />
                  <div className="w-8 h-px bg-border" />
                  <svg className="w-4 h-4 text-red-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="w-8 h-px bg-border" />
                  <div className="w-2 h-2 rounded-full bg-navy" />
                </div>
                <span className="text-xl font-bold text-text font-display">{route.to}</span>
              </div>

              {/* Price & Duration */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                <div>
                  <p className="text-xs text-muted mb-0.5">Starting from</p>
                  <p className="text-2xl font-extrabold text-red-accent font-display">{route.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted mb-0.5">Duration</p>
                  <p className="text-sm font-semibold text-text flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {route.duration}
                  </p>
                </div>
              </div>

              {/* Book Now */}
              <a
                href={`/booking?from=${route.from}&to=${route.to}`}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-accent to-red-dark text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Book Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* View All Routes */}
        <div className="text-center mt-10">
          <a
            href="/schedules"
            className="inline-flex items-center gap-2 text-navy font-semibold hover:text-red-accent transition-colors duration-200"
          >
            View All Routes
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
