import type { Metadata } from 'next';

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
