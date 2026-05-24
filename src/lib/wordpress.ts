import type { BlogPost } from '@/types';

/**
 * WordPress REST API integration for headless blog.
 *
 * SETUP INSTRUCTIONS:
 * 1. Install WordPress at your chosen domain (e.g., https://blog.rajkalpanatravels.com)
 * 2. Set WORDPRESS_API_URL in your .env.local file (server-only, no NEXT_PUBLIC_ prefix)
 * 3. Enable the WordPress REST API (enabled by default in WP 4.7+)
 * 4. Optionally install "WP REST API" plugins for extended functionality
 *
 * The API endpoints used:
 *   GET ${WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed           → List posts
 *   GET ${WORDPRESS_API_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed → Single post by slug
 *
 * SECURITY: WORDPRESS_API_URL is a server-only env variable.
 * Do NOT prefix it with NEXT_PUBLIC_ or expose admin credentials.
 */

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

// ─── Mock blog data (used when WordPress is not configured) ──────────────────

const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'top-10-bus-travel-tips',
    title: 'Top 10 Tips for a Comfortable Overnight Bus Journey',
    excerpt: 'Planning an overnight bus trip? Here are our top tips for making your journey as comfortable as possible, from choosing the right seat to packing essentials.',
    content: '<p>Traveling by bus overnight can be a comfortable and affordable way to cover long distances. Whether you are traveling from Delhi to Lucknow or from Varanasi to Indore, these tips will help you make the most of your journey.</p><h2>1. Choose a Sleeper Bus</h2><p>If available on your route, always opt for a sleeper bus for overnight travel. The flat berth allows you to lie down and get proper rest.</p><h2>2. Carry a Light Blanket</h2><p>AC buses can get chilly at night. While most premium operators like Raj Kalpana Travels provide blankets, carrying a light shawl is always a good idea.</p><h2>3. Pack Smart</h2><p>Keep your essentials in a small bag that you can access easily—phone charger, water bottle, earphones, and any medication you might need.</p><h2>4. Download Entertainment</h2><p>Download movies, music, or podcasts before your trip. While many buses offer WiFi, it may not always be reliable on highways.</p><h2>5. Arrive at the Boarding Point Early</h2><p>Reach your boarding point at least 15 minutes before departure. This gives you time to settle in without rushing.</p>',
    coverImage: '',
    author: 'Raj Kalpana Travels',
    date: '2025-05-10',
    categories: ['Travel Tips'],
  },
  {
    id: '2',
    slug: 'delhi-to-lucknow-travel-guide',
    title: 'Delhi to Lucknow by Bus: A Complete Travel Guide',
    excerpt: 'Everything you need to know about traveling from Delhi to Lucknow by bus — routes, timings, bus types, and what to expect on the journey.',
    content: '<p>The Delhi to Lucknow route is one of the most popular intercity bus routes in North India. Covering approximately 550 kilometers, the journey typically takes 8-10 hours by bus.</p><h2>Route Overview</h2><p>Most buses from Delhi to Lucknow travel via the Lucknow-Agra Expressway, which has significantly reduced travel time. The expressway is well-maintained and offers a smooth ride.</p><h2>Bus Types Available</h2><p>Raj Kalpana Travels operates several bus types on this route including Bharat Benz Semi Sleeper AC and Air Suspension Premium Sleeper AC buses.</p><h2>Best Time to Travel</h2><p>Overnight buses departing between 8 PM and 11 PM are the most popular choice, as you can sleep through the journey and arrive fresh in the morning.</p>',
    coverImage: '',
    author: 'Raj Kalpana Travels',
    date: '2025-04-28',
    categories: ['Travel Guide', 'Routes'],
  },
  {
    id: '3',
    slug: 'benefits-of-online-bus-booking',
    title: 'Why You Should Book Your Bus Tickets Online',
    excerpt: 'Gone are the days of standing in long queues at bus stations. Discover the many benefits of booking your bus tickets online with Raj Kalpana Travels.',
    content: '<p>Online bus booking has revolutionized the way we travel. Here are the key benefits of booking your bus tickets online with Raj Kalpana Travels.</p><h2>Convenience</h2><p>Book from anywhere, anytime. Whether you are at home, at work, or on the go, you can book your bus tickets in just a few clicks.</p><h2>Compare Options</h2><p>See all available buses, departure times, bus types, and prices in one place. Choose the option that best suits your schedule and budget.</p><h2>Secure Payments</h2><p>Pay securely using UPI, credit/debit cards, net banking, or digital wallets. All transactions are encrypted for your safety.</p><h2>Instant Confirmation</h2><p>Get your e-ticket instantly via SMS and email. No need to carry a printed ticket — just show your m-ticket on your phone.</p>',
    coverImage: '',
    author: 'Raj Kalpana Travels',
    date: '2025-04-15',
    categories: ['Tips', 'Booking'],
  },
  {
    id: '4',
    slug: 'safety-measures-on-our-buses',
    title: 'Safety First: How Raj Kalpana Travels Keeps You Safe',
    excerpt: 'Learn about the comprehensive safety measures we implement across our fleet to ensure every journey is safe and secure.',
    content: '<p>At Raj Kalpana Travels, passenger safety is our top priority. Here is how we ensure your journey is safe from start to finish.</p><h2>GPS-Monitored Fleet</h2><p>Every bus in our fleet is equipped with GPS tracking. Our control room monitors all buses 24/7, and you can track your bus live during the journey.</p><h2>Speed Governors</h2><p>All our buses are fitted with speed governors that limit the maximum speed, ensuring safe driving at all times.</p><h2>Trained Drivers</h2><p>Our drivers undergo rigorous training and regular health checkups. They are experienced in long-distance and night driving.</p><h2>Regular Maintenance</h2><p>Our buses undergo scheduled maintenance and safety inspections. Tyres, brakes, and mechanical systems are checked before every trip.</p>',
    coverImage: '',
    author: 'Raj Kalpana Travels',
    date: '2025-03-20',
    categories: ['Safety', 'Company'],
  },
];

// ─── WordPress API Types ─────────────────────────────────────────────────────

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    author?: Array<{ name: string }>;
    'wp:featuredmedia'?: Array<{ source_url: string }>;
  };
}

function wpPostToBlogPost(wp: WPPost): BlogPost {
  return {
    id: String(wp.id),
    slug: wp.slug,
    title: wp.title.rendered,
    excerpt: wp.excerpt.rendered.replace(/<[^>]*>/g, '').trim(),
    content: wp.content.rendered,
    coverImage: wp._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    author: wp._embedded?.author?.[0]?.name || 'Raj Kalpana Travels',
    date: wp.date.split('T')[0],
    categories: [],
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Fetch all blog posts. Uses WordPress REST API if configured,
 * otherwise returns mock data.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!WORDPRESS_API_URL) {
    // WordPress not configured — return mock data
    return MOCK_POSTS;
  }

  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed&per_page=20&orderby=date&order=desc`,
      { next: { revalidate: 3600 } } // ISR: revalidate every hour
    );

    if (!res.ok) {
      console.error('WordPress API error:', res.status);
      return MOCK_POSTS; // Fallback to mock data
    }

    const posts: WPPost[] = await res.json();
    return posts.map(wpPostToBlogPost);
  } catch {
    // Network error — fallback to mock data
    return MOCK_POSTS;
  }
}

/**
 * Fetch a single blog post by slug. Uses WordPress REST API if configured,
 * otherwise searches mock data.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!WORDPRESS_API_URL) {
    return MOCK_POSTS.find((p) => p.slug === slug) || null;
  }

  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return MOCK_POSTS.find((p) => p.slug === slug) || null;
    }

    const posts: WPPost[] = await res.json();
    if (posts.length === 0) {
      return MOCK_POSTS.find((p) => p.slug === slug) || null;
    }

    return wpPostToBlogPost(posts[0]);
  } catch {
    return MOCK_POSTS.find((p) => p.slug === slug) || null;
  }
}
