const TESTIMONIALS = [
  {
    quote: 'Booked the Delhi to Lucknow sleeper and it was incredibly comfortable. The bus was clean, on time, and the staff was very courteous. Will definitely book again!',
    name: 'Ankit Sharma',
    location: 'New Delhi',
    rating: 5,
  },
  {
    quote: 'The online booking process was super easy. I loved the seat selection feature — got a window seat on the upper deck. Great value for money!',
    name: 'Priya Gupta',
    location: 'Lucknow',
    rating: 5,
  },
  {
    quote: 'Have been traveling with Raj Kalpana for over 3 years now. Their consistency in service quality is what keeps me coming back. Highly recommended!',
    name: 'Rajesh Verma',
    location: 'Varanasi',
    rating: 5,
  },
  {
    quote: 'The live tracking feature is a game changer. My family could track exactly where the bus was. The journey from Delhi to Agra was smooth and comfortable.',
    name: 'Sneha Patel',
    location: 'Agra',
    rating: 4,
  },
  {
    quote: 'Best bus service in North India, no doubt. Air conditioning worked perfectly, blankets were clean, and we reached Kanpur right on time.',
    name: 'Vikram Singh',
    location: 'Kanpur',
    rating: 5,
  },
  {
    quote: 'I was nervous about night travel but the CCTV cameras, verified driver, and 24/7 helpline gave me complete peace of mind. Thank you, Raj Kalpana!',
    name: 'Meera Joshi',
    location: 'Prayagraj',
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-[#F59E0B]' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="uppercase tracking-wider text-xs font-semibold text-red-accent">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text mt-2 font-display">
            What Travelers Say
          </h2>
          <p className="text-muted mt-3 max-w-2xl mx-auto">
            Don&apos;t just take our word for it — hear from travelers who have experienced the Raj Kalpana difference.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-soft hover:-translate-y-1 hover:shadow-card transition-all duration-300"
            >
              {/* Quote Icon */}
              <svg className="w-8 h-8 text-red-accent/20 mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
              </svg>

              {/* Quote Text */}
              <p className="text-text text-sm leading-relaxed mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Star Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Author */}
              <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-text text-sm">{testimonial.name}</p>
                    <p className="text-[#64748B] text-xs">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
