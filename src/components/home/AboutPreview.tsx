export default function AboutPreview() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Image Placeholder */}
          <div className="relative">
            <div className="relative h-[400px] md:h-[460px] rounded-3xl overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy">
              {/* Decorative pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="0.5" />
                  <circle cx="200" cy="200" r="120" stroke="white" strokeWidth="0.5" />
                  <circle cx="200" cy="200" r="90" stroke="white" strokeWidth="0.5" />
                  <circle cx="200" cy="200" r="60" stroke="white" strokeWidth="0.5" />
                </svg>
              </div>
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-20 h-20 text-white/30 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <p className="text-white/40 text-sm font-medium">Our Fleet</p>
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-4 md:right-6 bg-white rounded-2xl shadow-elevated p-5 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-text font-display">4.8/5</p>
                  <p className="text-xs text-muted">from 24,300+ reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Text Content */}
          <div>
            <span className="uppercase tracking-wider text-xs font-semibold text-red-accent">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text mt-3 mb-5 leading-tight font-display">
              A travel company built around comfort, care and clockwork.
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Since our inception, Raj Kalpana Travels has been committed to making
              bus travel safe, affordable, and enjoyable for millions of passengers.
              With a fleet of well-maintained buses and a team of experienced
              professionals, we connect cities across North India with punctuality
              and care that our travelers trust.
            </p>

            {/* Bullet Points */}
            <ul className="space-y-3 mb-8">
              {[
                'RTO-certified fleet with regular safety inspections',
                'Experienced drivers with 10+ years on the road',
                'Real-time tracking and 24/7 customer support',
                'Transparent pricing with no hidden charges',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-text text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-navy to-navy-light text-white font-semibold rounded-full hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Read Our Story
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
