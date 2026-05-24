const GALLERY_ITEMS = [
  {
    label: 'Bus Exterior',
    gradient: 'from-navy via-navy-light to-blue-500',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    label: 'Sleeper Interior',
    gradient: 'from-red-accent to-red-dark',
    span: '',
  },
  {
    label: 'Premium Seats',
    gradient: 'from-amber to-orange-500',
    span: '',
  },
  {
    label: 'On-Board Entertainment',
    gradient: 'from-emerald-500 to-teal-600',
    span: '',
  },
  {
    label: 'Clean Washroom',
    gradient: 'from-purple-500 to-indigo-600',
    span: '',
  },
  {
    label: 'Boarding Point',
    gradient: 'from-cyan-500 to-blue-600',
    span: '',
  },
];

export default function GalleryPreview() {
  return (
    <section className="py-20 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="uppercase tracking-wider text-xs font-semibold text-red-accent">
            Gallery
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text mt-2 font-display">
            Step inside the journey.
          </h2>
          <p className="text-muted mt-3 max-w-2xl mx-auto">
            Take a look at our fleet, interiors, and the travel experience we offer.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl overflow-hidden group cursor-pointer ${item.span}`}
            >
              <div
                className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-500 relative`}
              >
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="relative text-center">
                  <svg className="w-8 h-8 text-white/60 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                  <span className="text-white font-semibold text-sm drop-shadow-lg">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3 border-2 border-navy text-navy font-semibold rounded-full hover:bg-navy hover:text-white transition-all duration-300"
          >
            View Full Gallery
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
