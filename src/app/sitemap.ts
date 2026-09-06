import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/wordpress';
import { documentedRoutes } from '@/lib/routes';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rajkalpanatravels.com';

/**
 * Only pages that are genuinely indexable belong here.
 *
 * Two rules worth keeping (both were broken before):
 *  1. Route pages are included only when `isDocumented` — a route with no real
 *     inventory or content is noindex, and a noindex URL in a sitemap is a
 *     contradiction Google reports as an error.
 *  2. Blog posts are included only when the CMS actually returns them. Listing
 *     posts that render "Post Not Found" creates soft 404s.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: { path: string; priority: number; freq: 'daily' | 'weekly' | 'monthly' }[] = [
    { path: '', priority: 1, freq: 'daily' },
    { path: '/routes', priority: 0.9, freq: 'weekly' },
    { path: '/booking', priority: 0.9, freq: 'weekly' },
    { path: '/schedules', priority: 0.7, freq: 'weekly' },
    { path: '/about', priority: 0.6, freq: 'monthly' },
    { path: '/contact', priority: 0.6, freq: 'monthly' },
    { path: '/gallery', priority: 0.5, freq: 'monthly' },
    { path: '/offers', priority: 0.6, freq: 'weekly' },
    { path: '/testimonials', priority: 0.5, freq: 'monthly' },
    { path: '/faqs', priority: 0.6, freq: 'monthly' },
    { path: '/careers', priority: 0.4, freq: 'monthly' },
    { path: '/blog', priority: 0.6, freq: 'weekly' },
    { path: '/privacy-policy', priority: 0.3, freq: 'monthly' },
    { path: '/terms-and-conditions', priority: 0.3, freq: 'monthly' },
    { path: '/cancellation-refund-policy', priority: 0.4, freq: 'monthly' },
    { path: '/track-shipment', priority: 0.4, freq: 'monthly' },
    { path: '/feedback', priority: 0.3, freq: 'monthly' },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map(({ path, priority, freq }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }));

  const routeEntries: MetadataRoute.Sitemap = documentedRoutes.map((route) => ({
    url: `${BASE_URL}/routes/${route.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogEntries = posts
      .filter((post) => post?.slug)
      .map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }));
  } catch {
    // CMS unavailable at build time — ship the sitemap without blog URLs rather
    // than listing posts that would render as soft 404s.
  }

  return [...staticEntries, ...routeEntries, ...blogEntries];
}
