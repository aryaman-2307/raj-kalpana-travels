import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[600px] md:h-[680px] lg:h-[720px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero-bus.png"
        alt="Raj Kalpana Travels luxury bus on highway"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <svg className="w-4 h-4 text-amber" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-white/90 text-sm font-medium">
                Trusted by 10 Lakh+ travelers
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 font-display">
              Travel comfortably across cities,{' '}
              <span className="text-amber">the Raj Kalpana way.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-8 max-w-xl">
              Safe, affordable, and on-time bus journeys connecting Delhi,
              Lucknow, Varanasi, and 50+ cities across India.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/booking"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-red-accent to-red-dark text-white font-semibold rounded-full hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Find My Bus
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
              >
                Why Raj Kalpana
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
