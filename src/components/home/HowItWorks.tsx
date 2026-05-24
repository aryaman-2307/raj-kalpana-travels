const STEPS = [
  {
    step: '01',
    title: 'Search Your Route',
    description: 'Enter your departure city, destination, and travel date to explore all available buses.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Choose Your Seat',
    description: 'Pick your preferred seat from the interactive seat map — window, aisle, or sleeper.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Pay Securely',
    description: 'Complete your booking with UPI, credit card, net banking, or digital wallets.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Travel Happy',
    description: 'Receive your e-ticket instantly and enjoy a safe, comfortable journey to your destination.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="uppercase tracking-wider text-xs font-semibold text-red-accent">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text mt-2 font-display">
            Book a bus in four easy steps.
          </h2>
          <p className="text-muted mt-3 max-w-2xl mx-auto">
            From searching routes to boarding the bus — we make every step simple.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="relative bg-white rounded-3xl border border-[#E2E8F0] p-7 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Step Number (faded, top-right) */}
              <span className="absolute top-4 right-5 text-6xl font-extrabold text-navy/5 font-display select-none leading-none">
                {item.step}
              </span>

              {/* Icon */}
              <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-[#E53935]/10 text-red-accent mb-5 group-hover:bg-red-accent group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-text mb-2 font-display">
                {item.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
