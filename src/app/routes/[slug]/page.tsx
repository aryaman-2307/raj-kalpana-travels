import { notFound } from 'next/navigation';
import { ROUTES } from '@/data/routes';
import Link from 'next/link';
import type { Metadata } from 'next';

interface RoutePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ROUTES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = ROUTES.find((r) => r.slug === slug);
  if (!route) return { title: 'Route Not Found' };
  return {
    title: `${route.from} to ${route.to} Bus — ₹${route.price} | Raj Kalpana Travels`,
    description: `Book ${route.busType} bus from ${route.from} to ${route.to}. Departure ${route.departureTime}, arrival ${route.arrivalTime}. Duration ${route.duration}. Starting at ₹${route.price}.`,
  };
}

export default async function RouteDetailPage({ params }: RoutePageProps) {
  const { slug } = await params;
  const route = ROUTES.find((r) => r.slug === slug);
  if (!route) notFound();

  return (
    <section className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-gradient-to-br from-[#0F2B5B] to-[#1A3D7C] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-4">
            <Link href="/" className="hover:text-white">Home</Link> / <Link href="/schedules" className="hover:text-white">Schedules</Link> / <span className="text-white">{route.from} to {route.to}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-plus-jakarta-sans)]">
            {route.from} → {route.to}
          </h1>
          <p className="mt-2 text-white/70">{route.busType}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Journey Details */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8">
              <h2 className="text-xl font-bold text-[#1E293B] mb-6">Journey Details</h2>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#1E293B]">{route.departureTime}</p>
                  <p className="text-sm text-[#64748B] mt-1">{route.from}</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-[#64748B] font-medium">{route.duration}</span>
                  <div className="w-full border-t-2 border-dashed border-[#E2E8F0]" />
                  <svg className="w-5 h-5 text-[#E53935]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#1E293B]">{route.arrivalTime}</p>
                  <p className="text-sm text-[#64748B] mt-1">{route.to}</p>
                </div>
              </div>
            </div>

            {/* Bus Info */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8">
              <h2 className="text-xl font-bold text-[#1E293B] mb-4">Bus Information</h2>
              <p className="text-[#64748B] mb-4">
                <span className="font-semibold text-[#1E293B]">Bus Type:</span> {route.busType}
              </p>
              <p className="text-[#64748B] mb-2 font-semibold text-[#1E293B]">Amenities:</p>
              <div className="flex flex-wrap gap-2">
                {route.amenities.map((a) => (
                  <span key={a} className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E2E8F0] text-[#1E293B] text-sm px-3 py-1.5 rounded-full">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center sticky top-24">
              <p className="text-sm text-[#64748B] mb-1">Starting from</p>
              <p className="text-4xl font-bold text-[#E53935]">₹{route.price}</p>
              <p className="text-xs text-[#64748B] mt-1 mb-6">per seat</p>
              <Link
                href={`/booking?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`}
                className="block w-full py-3 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all text-center"
              >
                Book This Route
              </Link>
              <p className="text-xs text-[#64748B] mt-4">
                {/* NOTE: Prices are display-only mock data. Real prices must come from backend. */}
                Prices may vary based on date and availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
