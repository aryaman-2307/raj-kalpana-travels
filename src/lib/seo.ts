import type { Metadata } from 'next';
import type { Route } from '@/types';
import { lowestFare, formatFare, formatTime, sortedServices, isDocumented } from './routes';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rajkalpanatravels.com';

export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  noIndex = false
): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Raj Kalpana Travels Pvt. Ltd.',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Raj Kalpana Travels Pvt. Ltd.',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'Online bus ticket booking and bus operator services across India.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ground Floor, Shop No. 52, Gokhle Market, Tis Hazari',
      addressLocality: 'Delhi',
      addressRegion: 'Delhi',
      postalCode: '110054',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9355777632',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
  };
}

export function generateLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Raj Kalpana Travels Pvt. Ltd.',
    url: BASE_URL,
    telephone: '+91-9355777632',
    email: 'Info@rajkalpanatravels.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ground Floor, Shop No. 52, Gokhle Market, Tis Hazari',
      addressLocality: 'Delhi',
      addressRegion: 'Delhi',
      postalCode: '110054',
      addressCountry: 'IN',
    },
    priceRange: '₹₹',
    openingHours: 'Mo-Su 00:00-23:59',
  };
}

export function generateFAQJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBlogPostJsonLd(post: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  coverImage?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Raj Kalpana Travels Pvt. Ltd.',
    },
    url: `${BASE_URL}/blog/${post.slug}`,
    image: post.coverImage || `${BASE_URL}/og-image.png`,
  };
}

// ─── Route pages ─────────────────────────────────────────────────────────────

/**
 * Title and description for a route page.
 *
 * NOTE (Bitla): the brand is appended by the `title.template` in app/layout.tsx.
 * Never include "Raj Kalpana Travels" in a page title here or it renders twice.
 * Target under 60 characters so Google does not truncate it.
 */
export function generateRouteMetadata(route: Route): Metadata {
  const services = sortedServices(route);
  const fare = formatFare(lowestFare(route));
  const first = services[0];
  const documented = isDocumented(route);

  const title = documented
    ? `${route.from} to ${route.to} Bus | AC Sleeper from ${fare}`
    : `${route.from} to ${route.to} Bus | Schedule on Request`;

  const description = first
    ? `${route.from} to ${route.to} bus: ${services.length} departure${services.length > 1 ? 's' : ''} nightly from ${formatTime(first.departureTime)}, ${route.duration} journey, fares from ${fare}. Boarding at ${route.boardingPoints?.[0]?.name ?? route.from}. Book online.`
    : `${route.from} to ${route.to} bus by Raj Kalpana Travels. ${route.distanceKm ? `${route.distanceKm} km, ` : ''}${route.duration} on an AC sleeper coach. Schedule confirmed at booking — call +91 9355777632.`;

  return generatePageMetadata(title, description, `/routes/${route.slug}`, !documented);
}

/** BreadcrumbList for any page with a trail. */
export function generateBreadcrumbJsonLd(crumbs: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${BASE_URL}${c.item}`,
    })),
  };
}

/**
 * BusTrip with an Offer carrying the real lowest fare. The Offer is what can
 * surface a price in search results, so it must never carry a placeholder.
 */
export function generateRouteJsonLd(route: Route) {
  // A route without verified inventory must not publish a price to Google.
  if (!isDocumented(route)) return null;

  const services = sortedServices(route);
  const first = services[0];
  const fare = lowestFare(route);

  return {
    '@context': 'https://schema.org',
    '@type': 'BusTrip',
    name: `${route.from} to ${route.to} bus`,
    url: `${BASE_URL}/routes/${route.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Raj Kalpana Travels Pvt. Ltd.',
      url: BASE_URL,
      telephone: '+91-9355777632',
    },
    departureBusStop: {
      '@type': 'BusStation',
      name: route.boardingPoints?.[0]?.name ?? route.from,
      address: { '@type': 'PostalAddress', addressLocality: route.from, addressCountry: 'IN' },
    },
    arrivalBusStop: {
      '@type': 'BusStation',
      name: route.droppingPoints?.[route.droppingPoints.length - 1]?.name ?? route.to,
      address: { '@type': 'PostalAddress', addressLocality: route.to, addressCountry: 'IN' },
    },
    ...(first && { departureTime: first.departureTime, arrivalTime: first.arrivalTime }),
    offers: {
      '@type': 'Offer',
      price: fare,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/routes/${route.slug}`,
    },
  };
}
