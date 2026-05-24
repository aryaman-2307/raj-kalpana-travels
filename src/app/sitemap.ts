import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/wordpress';
import { ROUTES } from '@/data/routes';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rajkalpanatravels.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    '', '/booking', '/schedules', '/gallery', '/about', '/contact',
    '/offers', '/testimonials', '/faqs', '/careers', '/blog',
    '/privacy-policy', '/terms-and-conditions', '/cancellation-refund-policy',
    '/track-shipment', '/feedback',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path === '/booking' ? 0.9 : 0.7,
  }));

  // Route detail pages
  const routeEntries: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: `${BASE_URL}/routes/${route.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Blog posts
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogEntries = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));
  } catch {
    // If WordPress is not available, skip blog entries
  }

  return [...staticEntries, ...routeEntries, ...blogEntries];
}
