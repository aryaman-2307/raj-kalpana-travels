/**
 * Blog data access layer — powered by static Next.js data.
 *
 * This replaces the WordPress REST API integration for now.
 * When WordPress is ready, simply swap the import in blog pages to
 * use '@/lib/wordpress' instead of '@/lib/blog' and the function
 * signatures are identical.
 */

import type { BlogPost } from '@/types';
import { BLOG_POSTS } from '@/data/blog';

export type { BlogPost };

/**
 * Fetch all blog posts — sorted by date descending (newest first).
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Fetch a single blog post by slug.
 * Returns null if not found.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}

/**
 * Fetch all unique categories across all posts.
 */
export async function getBlogCategories(): Promise<string[]> {
  const all = BLOG_POSTS.flatMap((p) => p.categories);
  return Array.from(new Set(all)).sort();
}

/**
 * Fetch posts filtered by a specific category.
 */
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  if (category === 'All') return posts;
  return posts.filter((p) => p.categories.includes(category));
}

/**
 * Fetch related posts (same category, excluding current post) — up to 3.
 */
export async function getRelatedPosts(
  currentSlug: string,
  categories: string[]
): Promise<BlogPost[]> {
  return BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.categories.some((c) => categories.includes(c))
  )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
}

/**
 * Estimate reading time for a blog post (average 200 words per minute).
 */
export function estimateReadingTime(content: string): number {
  const wordCount = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Map of category to a tailwind-compatible gradient so each category has a colour.
 */
export const CATEGORY_GRADIENTS: Record<string, string> = {
  'Travel Tips': 'from-[#0F2B5B] to-[#1A3D7C]',
  'Travel Guide': 'from-[#1A3D7C] to-[#1D6FA4]',
  Routes: 'from-[#1D6FA4] to-[#0F2B5B]',
  Safety: 'from-[#C62828] to-[#E53935]',
  Booking: 'from-[#D97706] to-[#F59E0B]',
  Tips: 'from-[#D97706] to-[#D97706]',
  Company: 'from-[#0F2B5B] to-[#E53935]',
  Services: 'from-[#1A3D7C] to-[#C62828]',
  Destinations: 'from-[#1D6FA4] to-[#D97706]',
};

export function getCategoryGradient(categories: string[]): string {
  for (const cat of categories) {
    if (CATEGORY_GRADIENTS[cat]) return CATEGORY_GRADIENTS[cat];
  }
  return 'from-[#0F2B5B] to-[#1A3D7C]';
}
