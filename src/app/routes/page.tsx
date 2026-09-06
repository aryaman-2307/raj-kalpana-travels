import Link from 'next/link';
import type { Metadata } from 'next';
import { ROUTES } from '@/data/routes';
import { popularRoutes, isDocumented, lowestFare, formatFare } from '@/lib/routes';
import { generatePageMetadata, generateBreadcrumbJsonLd } from '@/lib/seo';
import RouteCard from '@/components/routes/RouteCard';

export const metadata: Metadata = generatePageMetadata(
  'All Bus Routes | Delhi, Lucknow, Varanasi, Indore',
  'Every route Raj Kalpana Travels operates, with nightly departure times, journey duration and fares from ₹500. Delhi to Lucknow, Varanasi, Indore, Kanpur, Ujjain, Agra and more.',
  '/routes'
);

/** Groups routes by origin city so the hub reads as a network, not a flat list. */
function groupByOrigin() {
  const groups = new Map<string, typeof ROUTES>();
  for (const r of ROUTES) {
    const list = groups.get(r.from) ?? [];
    list.push(r);
    groups.set(r.from, list);
  }
  return [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
}

export default function RoutesHubPage() {
  const groups = groupByOrigin();
  const others = ROUTES.filter((r) => !isDocumented(r));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbJsonLd([
              { name: 'Home', item: '/' },
              { name: 'Routes', item: '/routes' },
            ])
          ),
        }}
      />

      <div className="bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="transition-colors hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">Routes</li>
            </ol>
          </nav>
          <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Bus routes we operate</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            {ROUTES.length} routes across Delhi, Uttar Pradesh and Madhya Pradesh. Fares from{' '}
            {formatFare(Math.min(...popularRoutes.map(lowestFare)))} on Bharat Benz 2+1 AC sleeper coaches.
          </p>
        </div>
      </div>

      <section className="bg-surface py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-2xl font-bold text-text">Popular routes</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {popularRoutes.map((r) => (
              <RouteCard key={r.slug} route={r} />
            ))}
          </div>

          <h2 className="mb-6 mt-16 font-display text-2xl font-bold text-text">Every route by origin city</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map(([city, list]) => (
              <div key={city} className="rounded-2xl border border-border bg-white p-6">
                <h3 className="font-display text-lg font-bold text-navy">From {city}</h3>
                <ul className="mt-3 space-y-1">
                  {list.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/routes/${r.slug}`}
                        className="flex min-h-[44px] items-center justify-between gap-3 rounded-lg px-2 py-2 text-[15px] transition-colors hover:bg-surface"
                      >
                        <span className="text-text">
                          {r.from} to {r.to}
                        </span>
                        <span className="shrink-0 text-sm font-semibold text-red-accent">
                          {isDocumented(r) ? formatFare(lowestFare(r)) : 'On request'}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {others.length > 0 && (
            <p className="mt-10 max-w-3xl text-sm text-muted">
              Routes marked &ldquo;on request&rdquo; are operated to order — call{' '}
              <a href="tel:+919355777632" className="font-semibold text-navy hover:underline">
                +91 9355777632
              </a>{' '}
              and we will confirm the coach, timing and fare for your date.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
