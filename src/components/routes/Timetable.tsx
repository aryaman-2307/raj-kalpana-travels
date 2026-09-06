import Link from 'next/link';
import type { Route } from '@/types';
import { sortedServices, durationMinutes, formatFare, formatTime, lowestFare } from '@/lib/routes';
import { COMPANY_PHONE } from '@/lib/constants';

/**
 * Every coach on this exact origin-destination pair.
 *
 * Cards on mobile, table on desktop — a horizontally scrolling table is the
 * single worst pattern on a phone and this page is mostly read on phones.
 */
export default function Timetable({ route }: { route: Route }) {
  const services = sortedServices(route);

  if (services.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface p-6">
        <p className="font-semibold text-text">Schedule confirmed at booking</p>
        <p className="mt-1.5 text-muted">
          Departure time, coach and fare for {route.from} to {route.to} are confirmed when you book. Call{' '}
          <a href={`tel:+91${COMPANY_PHONE}`} className="font-semibold text-red-accent hover:underline">
            +91 {COMPANY_PHONE}
          </a>{' '}
          or message us on WhatsApp with your travel date.
        </p>
      </div>
    );
  }

  const cheapest = lowestFare(route);
  const quickest = Math.min(...services.map((s) => durationMinutes(s.duration)));
  const many = services.length > 1;

  const badgeFor = (price: number, duration: string) => {
    if (many && price === cheapest) return { label: 'Lowest fare', cls: 'bg-green-50 text-green-700' };
    if (many && durationMinutes(duration) === quickest) return { label: 'Fastest', cls: 'bg-amber/10 text-amber' };
    return null;
  };

  const bookHref = `/booking?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`;

  return (
    <>
      {/* Mobile */}
      <ul className="space-y-4 md:hidden">
        {services.map((s) => {
          const badge = badgeFor(s.price, s.duration);
          return (
            <li key={s.name + s.departureTime} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-text">{s.name}</p>
                  <p className="mt-0.5 max-w-[15rem] text-sm text-muted">{s.busType}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-xl font-extrabold text-red-accent">{formatFare(s.price)}</p>
                  {badge && (
                    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${badge.cls}`}>
                      {badge.label}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="text-center">
                  <p className="font-display text-lg font-bold leading-none text-text">{formatTime(s.departureTime)}</p>
                  <p className="mt-1 text-xs text-muted">{route.from}</p>
                </div>
                <div className="flex flex-1 items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-red-accent" />
                  <span className="h-px flex-1 bg-border" />
                  <span className="whitespace-nowrap text-xs font-medium text-muted">{s.duration}</span>
                  <span className="h-px flex-1 bg-border" />
                  <span className="h-2 w-2 shrink-0 rounded-full bg-navy" />
                </div>
                <div className="text-center">
                  <p className="font-display text-lg font-bold leading-none text-text">{formatTime(s.arrivalTime)}</p>
                  <p className="mt-1 text-xs text-muted">{route.to}</p>
                </div>
              </div>

              <Link
                href={bookHref}
                data-track="book_now_click"
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-red-accent to-red-dark py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-red-500/25"
              >
                Book this bus
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Desktop */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border md:block">
        <table className="w-full text-left">
          <caption className="sr-only">
            {route.from} to {route.to} bus timetable
          </caption>
          <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
            <tr>
              <th scope="col" className="px-4 py-3.5 font-semibold">Service</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">Departs</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">Duration</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">Arrives</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">Fare from</th>
              <th scope="col" className="px-4 py-3.5" aria-label="Book" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {services.map((s) => {
              const badge = badgeFor(s.price, s.duration);
              return (
                <tr key={s.name + s.departureTime} className="transition-colors hover:bg-surface/70">
                  <td className="px-4 py-4 align-top">
                    <p className="whitespace-nowrap font-semibold text-text">{s.name}</p>
                    <p className="mt-0.5 max-w-[15rem] text-sm text-muted">{s.busType}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 align-top font-display font-bold text-text">{formatTime(s.departureTime)}</td>
                  <td className="whitespace-nowrap px-4 py-4 align-top text-sm text-muted">{s.duration}</td>
                  <td className="whitespace-nowrap px-4 py-4 align-top font-display font-bold text-text">{formatTime(s.arrivalTime)}</td>
                  <td className="whitespace-nowrap px-4 py-4 align-top">
                    <span className="font-display font-extrabold text-red-accent">{formatFare(s.price)}</span>
                    {badge && (
                      <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${badge.cls}`}>
                        {badge.label}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right align-top">
                    <Link
                      href={bookHref}
                      data-track="book_now_click"
                      className="inline-flex rounded-lg bg-gradient-to-r from-red-accent to-red-dark px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-red-500/25"
                    >
                      Book
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
