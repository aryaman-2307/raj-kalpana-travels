import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ROUTES } from '@/data/routes';
import { getRoute, isDocumented, relatedRoutes, lowestFare, formatFare, sortedServices, faqsFor } from '@/lib/routes';
import { generateRouteMetadata, generateRouteJsonLd, generateBreadcrumbJsonLd, generateFAQJsonLd } from '@/lib/seo';
import Timetable from '@/components/routes/Timetable';
import PointsList from '@/components/routes/PointsList';
import RouteFaqs from '@/components/routes/RouteFaqs';
import RouteCard from '@/components/routes/RouteCard';
import BookingPanel from '@/components/routes/BookingPanel';
import MobileBookBar from '@/components/routes/MobileBookBar';

interface RoutePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ROUTES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) return { title: 'Route not found', robots: { index: false, follow: false } };
  return generateRouteMetadata(route);
}

export default async function RouteDetailPage({ params }: RoutePageProps) {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) notFound();

  const documented = isDocumented(route);
  const fare = lowestFare(route);
  const services = sortedServices(route);
  const related = relatedRoutes(route);
  const faqs = faqsFor(route.slug);
  const routeJsonLd = generateRouteJsonLd(route);

  const facts = [
    { label: 'Distance', value: route.distanceKm ? `${route.distanceKm} km` : '—' },
    { label: 'Duration', value: route.duration },
    { label: 'Departures', value: services.length ? `${services.length} nightly` : 'On request' },
    { label: 'Fare from', value: formatFare(fare) },
  ];

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Routes', item: '/routes' },
    { name: `${route.from} to ${route.to}`, item: `/routes/${route.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbJsonLd(breadcrumbs)) }}
      />
      {routeJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(routeJsonLd) }}
        />
      ) : null}
      {faqs.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQJsonLd(faqs)) }}
        />
      ) : null}

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="transition-colors hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/routes" className="transition-colors hover:text-white">Routes</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">{route.from} to {route.to}</li>
            </ol>
          </nav>

          <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            {route.from} to {route.to} Bus
          </h1>
          <p className="mt-2 max-w-2xl text-white/70">
            {route.busType}
            {route.via ? ` · via ${route.via}` : ''}
          </p>

          <dl className="mt-7 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs uppercase tracking-wider text-white/50">{f.label}</dt>
                <dd className="mt-1 font-display text-lg font-bold text-white">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="bg-surface pb-28 md:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_20rem]">
            {/* ─── Main column ─────────────────────────────────────────── */}
            <div className="min-w-0 pt-10">
              {!documented && (
                <div className="mb-8 rounded-2xl border border-amber/30 bg-amber/5 p-5">
                  <p className="font-semibold text-text">Schedule confirmed at booking</p>
                  <p className="mt-1 text-muted">
                    We run this route on request. Call or message us with your travel date and we will confirm the
                    coach, timing and fare.
                  </p>
                </div>
              )}

              <h2 className="mb-5 font-display text-2xl font-bold text-text">
                {route.from} to {route.to} bus timetable
              </h2>
              <Timetable route={route} />
              {services.length > 0 && (
                <p className="mt-3 text-sm text-muted">
                  Fares shown are the lowest berth on a normal weekday; weekend and festival fares may be higher. Times
                  are for the first boarding point.
                </p>
              )}

              {(route.boardingPoints?.length || route.droppingPoints?.length) && (
                <div className="mt-14 grid gap-8 md:grid-cols-2">
                  {route.boardingPoints?.length ? (
                    <div>
                      <h2 className="mb-5 font-display text-2xl font-bold text-text">Boarding in {route.from}</h2>
                      <PointsList
                        points={route.boardingPoints}
                        note="Pick-up times are approximate for the first departure; your ticket shows the exact time for your chosen point."
                      />
                    </div>
                  ) : null}
                  {route.droppingPoints?.length ? (
                    <div>
                      <h2 className="mb-5 font-display text-2xl font-bold text-text">Dropping in {route.to}</h2>
                      <PointsList
                        points={route.droppingPoints}
                        note="Drop times are approximate for the first service of the night."
                      />
                    </div>
                  ) : null}
                </div>
              )}

              {route.description && (
                <div className="mt-14">
                  <h2 className="mb-5 font-display text-2xl font-bold text-text">About this route</h2>
                  {route.highlights?.length ? (
                    <ul className="mb-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {route.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-text">
                          <svg className="mt-1 h-4 w-4 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="max-w-2xl space-y-4 text-[1.0625rem] leading-[1.8] text-muted">
                    {route.description.split(/\n\s*\n/).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-14">
                <h2 className="mb-5 font-display text-2xl font-bold text-text">On board</h2>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {route.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-2.5 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-text">
                      <svg className="h-4 w-4 shrink-0 text-red-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              {faqs.length ? (
                <div className="mt-14">
                  <h2 className="mb-5 font-display text-2xl font-bold text-text">
                    {route.from} to {route.to} bus FAQs
                  </h2>
                  <RouteFaqs faqs={faqs} />
                </div>
              ) : null}
            </div>

            {/* ─── Sidebar ─────────────────────────────────────────────── */}
            <div className="hidden lg:block">
              <div className="pt-10">
                <BookingPanel route={route} />
              </div>
            </div>
          </div>

          {/* ─── Related routes ────────────────────────────────────────── */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 font-display text-2xl font-bold text-text">Related routes</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <RouteCard key={r.slug} route={r} />
                ))}
              </div>
              <p className="mt-6">
                <Link href="/routes" className="inline-flex min-h-11 items-center font-semibold text-navy transition-colors hover:text-red-accent">
                  View all routes →
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>

      <MobileBookBar route={route} />
    </>
  );
}
