import Link from 'next/link';
import { popularRoutes } from '@/lib/routes';
import RouteCard from '@/components/routes/RouteCard';

/**
 * Popular routes on the homepage.
 *
 * Cards link to /routes/<slug> — the page built to rank — not straight into the
 * booking flow. Those route pages are otherwise orphaned: the sitemap is the
 * only other way to reach them, which is how the old site lost this traffic.
 *
 * Data comes from lib/routes so the homepage, the routes hub and the route page
 * can never disagree about a fare again.
 */
export default function TopRoutes() {
  const routes = popularRoutes.slice(0, 6);

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-red-accent">Top Routes</span>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-text md:text-4xl">Popular bus routes</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Nightly departures, live fares and boarding points for the corridors we run most.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => (
            <RouteCard key={route.slug} route={route} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/routes"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl px-5 py-3 font-semibold text-navy transition-colors duration-200 hover:bg-surface hover:text-red-accent"
          >
            View all routes
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
