import { generatePageMetadata } from '@/lib/seo';
import { TESTIMONIALS } from '@/data/testimonials';

export const metadata = generatePageMetadata(
  'Testimonials — Raj Kalpana Travels',
  'Read what our passengers say about their travel experience with Raj Kalpana Travels. Real reviews from real travellers.',
  '/testimonials'
);

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={star <= rating ? '#F59E0B' : 'none'}
          stroke={star <= rating ? '#F59E0B' : '#E2E8F0'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F2B5B] to-[#1a3f7a] text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            What Our Passengers Say
          </h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Real reviews from real travellers who chose Raj Kalpana Travels for their journeys across North India.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12 md:py-16 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <article
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-shadow flex flex-col"
              >
                {/* Quote Icon */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#E2E8F0" aria-hidden="true" className="mb-4 flex-shrink-0">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>

                {/* Comment */}
                <p className="text-[#1E293B] text-sm leading-relaxed flex-grow">
                  {testimonial.comment}
                </p>

                {/* Rating */}
                <div className="mt-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Author */}
                <div className="mt-4 flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0F2B5B] to-[#1a3f7a] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                    aria-hidden="true"
                  >
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1E293B] text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[#64748B]">
                      {testimonial.location} · {new Date(testimonial.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
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
            Ready to Experience the Difference?
          </h2>
          <p className="mt-3 text-[#64748B] max-w-xl mx-auto">
            Book your next journey with Raj Kalpana Travels and see why thousands of passengers trust us.
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
