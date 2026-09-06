import { ROUTES } from '@/data/routes';
import { ROUTE_FAQS } from '@/data/route-faqs';
import type { Route, RouteService, RouteFaq } from '@/types';

/**
 * A route is "documented" when it has real inventory and SEO content behind it.
 * Only documented routes are indexable and listed in the sitemap — an undocumented
 * route still renders (so internal links never 404) but is set to noindex.
 */
export function isDocumented(route: Route): boolean {
  return Boolean(route.popular && route.services?.length && route.description && (ROUTE_FAQS[route.slug]?.length ?? 0) >= 4);
}

export const documentedRoutes = ROUTES.filter(isDocumented);
export const popularRoutes = documentedRoutes;

export function getRoute(slug: string): Route | undefined {
  return ROUTES.find((r) => r.slug === slug);
}

/** The same journey in the opposite direction, if we run it. */
export function reverseRoute(route: Route): Route | undefined {
  return ROUTES.find((r) => r.fromSlug === route.toSlug && r.toSlug === route.fromSlug);
}

export function routesFrom(citySlug: string): Route[] {
  return ROUTES.filter((r) => r.fromSlug === citySlug);
}

export function routesTo(citySlug: string): Route[] {
  return ROUTES.filter((r) => r.toSlug === citySlug);
}

/** Lowest fare across every service on the route. */
export function lowestFare(route: Route): number {
  if (route.services?.length) return Math.min(...route.services.map((s) => s.price));
  return route.price;
}

export function formatFare(rupees: number): string {
  return `₹${rupees.toLocaleString('en-IN')}`;
}

/** Services sorted by departure time, earliest first. */
export function sortedServices(route: Route): RouteService[] {
  return [...(route.services ?? [])].sort((a, b) => a.departureTime.localeCompare(b.departureTime));
}

/** Minutes in an "8h 30m" duration string, for the "fastest" badge. */
export function durationMinutes(duration: string): number {
  const h = /(\d+)\s*h/.exec(duration);
  const m = /(\d+)\s*m/.exec(duration);
  return (h ? +h[1] : 0) * 60 + (m ? +m[1] : 0);
}

/** "22:30" -> "10:30 PM". Times are stored 24h and displayed 12h. */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

/**
 * Related routes for internal linking: the reverse direction first, then other
 * routes out of the origin, then other routes into the destination.
 */
export function relatedRoutes(route: Route, limit = 6): Route[] {
  const reverse = reverseRoute(route);
  const pool = [
    ...(reverse ? [reverse] : []),
    ...routesFrom(route.fromSlug),
    ...routesTo(route.toSlug),
    ...routesFrom(route.toSlug),
  ];
  const seen = new Set([route.slug]);
  const out: Route[] = [];
  for (const r of pool) {
    if (seen.has(r.slug)) continue;
    seen.add(r.slug);
    out.push(r);
    if (out.length >= limit) break;
  }
  return out;
}

/** FAQs for a route. Feeds both the accordion and FAQPage structured data. */
export function faqsFor(slug: string): RouteFaq[] {
  return ROUTE_FAQS[slug] ?? [];
}
