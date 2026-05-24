const STATS = [
  { value: '10L+', label: 'Happy Customers' },
  { value: '50+', label: 'Cities Covered' },
  { value: '200+', label: 'Daily Routes' },
  { value: '15+', label: 'Years Experience' },
];

export default function StatsCounter() {
  return (
    <section className="bg-[#0F2B5B] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 300" fill="none" preserveAspectRatio="none">
          <circle cx="100" cy="150" r="200" stroke="white" strokeWidth="0.5" />
          <circle cx="1100" cy="150" r="200" stroke="white" strokeWidth="0.5" />
          <circle cx="600" cy="50" r="300" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-[#F59E0B] font-display">
                {stat.value}
              </p>
              <p className="text-sm uppercase tracking-wider text-white/70 mt-2 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
