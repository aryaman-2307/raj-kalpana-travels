import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rajkalpanatravels.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/customer-login',
          '/agent-login',
          '/agent-registration',
          '/manage-bookings',
          '/ticket-details',
          '/booking-confirm',
          '/booking-cancel',
          '/refund-status',
          '/confirm-phone-booking',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
