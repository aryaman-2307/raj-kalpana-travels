import Link from 'next/link';
import type { Route } from '@/types';
import { lowestFare, formatFare, formatTime, sortedServices } from '@/lib/routes';

/**
 * Route card used on the homepage, the routes hub and the related-routes rail.
 * The whole card links to /routes/<slug> — the page Google should rank — rather
 * than jumping straight into the booking flow.
 */
export default function RouteCard({ route }: { route: Route }) {
  const fare = lowestFare(route);
  const services = sortedServices(route);
  const first = services[0];
  const count = services.length;

  return (
    <Link
      href={`/routes/${route.slug}`}
      className="group flex flex-col rounded-3xl border border-border bg-white p-6 transition-all duration-300 hover:border-red-accent hover:shadow-xl"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-navy">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
          {count > 0 ? `${count} ${count === 1 ? 'bus' : 'buses'} nightly` : 'On request'}
        </span>
        {route.distanceKm && <span className="text-xs font-medium text-muted">{route.distanceKm} km</span>}
      </div>

      <div className="mb-5 flex items-center gap-3">
        <span className="font-display text-xl font-bold text-text">{route.from}</span>
        <div className="flex items-center gap-1 text-muted">
          <div className="h-2 w-2 rounded-full bg-red-accent" />
          <div className="h-px w-6 bg-border" />
          <svg className="h-4 w-4 text-red-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div className="h-px w-6 bg-border" />
          <div className="h-2 w-2 rounded-full bg-navy" />
        </div>
        <span className="font-display text-xl font-bold text-text">{route.to}</span>
      </div>

      <div className="mt-auto flex items-end justify-between border-t border-border pt-4">
        <div>
          <p className="mb-0.5 text-xs text-muted">Starting from</p>
          <p className="font-display text-2xl font-extrabold text-red-accent">{formatFare(fare)}</p>
          {first && <p className="mt-0.5 text-xs text-muted">First bus {formatTime(first.departureTime)}</p>}
        </div>
        <div className="text-right">
          <p className="mb-0.5 text-xs text-muted">Duration</p>
          <p className="text-sm font-semibold text-text">{route.duration}</p>
        </div>
      </div>

      <span className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-accent to-red-dark px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/25">
        View times &amp; fares
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </span>
    </Link>
  );
}
