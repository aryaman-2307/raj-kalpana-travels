import Link from 'next/link';
import type { Route } from '@/types';
import { lowestFare, formatFare } from '@/lib/routes';
import { COMPANY_PHONE } from '@/lib/constants';

/** Sticky booking bar on route pages, mobile only. */
export default function MobileBookBar({ route }: { route: Route }) {
  const fare = lowestFare(route);
  const waText = encodeURIComponent(
    `Hi, I want to book ${route.from} to ${route.to}. Please share available buses, seats and fares.`
  );
  return (
    <>
      {/* The global WhatsApp float sits in the same corner as this bar. */}
      <style>{`@media (max-width: 767px) { [data-wa-float] { display: none; } }`}</style>
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-4px_20px_-6px_rgba(0,0,0,0.15)] backdrop-blur md:hidden">
      <div className="flex items-center gap-2.5">
        <div className="shrink-0">
          <p className="text-[11px] leading-none text-muted">from</p>
          <p className="font-display text-lg font-extrabold leading-tight text-red-accent">{formatFare(fare)}</p>
        </div>
        <Link
          href={`/booking?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`}
          data-track="book_now_click"
          className="flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-red-accent to-red-dark px-3 py-2.5 text-sm font-semibold text-white"
        >
          Book now
        </Link>
        <a
          href={`https://wa.me/91${COMPANY_PHONE}?text=${waText}`}
          data-track="whatsapp_click"
          rel="noopener"
          aria-label={`Enquire about ${route.from} to ${route.to} on WhatsApp`}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#25D366] text-white"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
          </svg>
        </a>
        <a
          href={`tel:+91${COMPANY_PHONE}`}
          data-track="call_click"
          aria-label={`Call +91 ${COMPANY_PHONE}`}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border text-navy"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        </a>
      </div>
    </div>
    </>
  );
}
