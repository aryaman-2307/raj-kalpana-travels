import { notFound } from 'next/navigation';
import {
  getBlogPosts,
  getBlogPostBySlug,
  getRelatedPosts,
  estimateReadingTime,
  getCategoryGradient,
} from '@/lib/blog';
import { generateBlogPostJsonLd } from '@/lib/seo';
import SafeHtml from '@/lib/safe-html';
import Link from 'next/link';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rajkalpanatravels.com';
  return {
    title: `${post.title} | Blog | Raj Kalpana Travels`,
    description: post.excerpt,
    alternates: { canonical: `${baseUrl}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `${baseUrl}/blog/${post.slug}`,
    },
  };
}

// Fully static — data is local
export const dynamic = 'force-static';

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.categories);
  const readTime = estimateReadingTime(post.content);
  const gradient = getCategoryGradient(post.categories);
  const jsonLd = generateBlogPostJsonLd(post);

  // Extract headings from content for table of contents
  const headingRegex = /<h2[^>]*>(.*?)<\/h2>/gi;
  const headings: string[] = [];
  let match;
  while ((match = headingRegex.exec(post.content)) !== null) {
    headings.push(match[1]);
  }

  // Total article count for breadcrumb
  const totalPosts = allPosts.length;
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < totalPosts - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#F8FAFC]">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div
          className={`bg-gradient-to-br ${gradient} text-white pt-32 pb-16 relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5 pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-white/80 line-clamp-1">{post.title}</span>
            </nav>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-5">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                {/* Author icon */}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                {/* Calendar icon */}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </span>
              <span className="flex items-center gap-2">
                {/* Clock icon */}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readTime} min read
              </span>
            </div>
          </div>
        </div>

        {/* ── Body Layout ───────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* ── Article Content ─────────────────────────────────────── */}
            <div>
              {/* Excerpt / pull quote */}
              <blockquote className="border-l-4 border-[#E53935] bg-white rounded-r-2xl px-6 py-5 mb-8 shadow-sm">
                <p className="text-[#475569] text-lg italic leading-relaxed">{post.excerpt}</p>
              </blockquote>

              {/* Article body */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 md:p-12 shadow-sm">
                <SafeHtml
                  html={post.content}
                  className="prose prose-lg prose-slate max-w-none
                    prose-headings:font-extrabold prose-headings:text-[#1E293B]
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-[#E2E8F0] prose-h2:pb-3
                    prose-p:text-[#475569] prose-p:leading-relaxed
                    prose-a:text-[#E53935] prose-a:no-underline hover:prose-a:underline
                    prose-ul:text-[#475569] prose-li:my-1
                    prose-strong:text-[#1E293B]
                    prose-blockquote:border-l-[#E53935] prose-blockquote:text-[#64748B]"
                />
              </div>

              {/* Share row */}
              <div className="mt-8 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[#475569] font-semibold">Found this article helpful? Share it!</p>
                <div className="flex gap-3">
                  {[
                    {
                      label: 'WhatsApp',
                      href: `https://wa.me/?text=${encodeURIComponent(post.title + ' — rajkalpanatravels.com/blog/' + post.slug)}`,
                      bg: 'bg-[#25D366]',
                      icon: (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Twitter / X',
                      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent('https://www.rajkalpanatravels.com/blog/' + post.slug)}`,
                      bg: 'bg-black',
                      icon: (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      ),
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${s.bg} text-white px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity`}
                      aria-label={`Share on ${s.label}`}
                    >
                      {s.icon}
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Prev / Next Navigation */}
              {(prevPost || nextPost) && (
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className="group bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <p className="text-xs text-[#94A3B8] font-semibold mb-2 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous Article
                      </p>
                      <p className="text-[#1E293B] font-semibold text-sm line-clamp-2 group-hover:text-[#0F2B5B] transition-colors">
                        {prevPost.title}
                      </p>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextPost ? (
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="group bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-right"
                    >
                      <p className="text-xs text-[#94A3B8] font-semibold mb-2 flex items-center justify-end gap-1">
                        Next Article
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </p>
                      <p className="text-[#1E293B] font-semibold text-sm line-clamp-2 group-hover:text-[#0F2B5B] transition-colors">
                        {nextPost.title}
                      </p>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              )}
            </div>

            {/* ── Sidebar ─────────────────────────────────────────────── */}
            <aside className="space-y-6 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pb-4">
              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wider mb-4">
                    In This Article
                  </h3>
                  <ol className="space-y-2">
                    {headings.map((heading, idx) => (
                      <li key={idx}>
                        <span className="flex gap-3 text-sm text-[#64748B] hover:text-[#0F2B5B] transition-colors leading-snug cursor-pointer">
                          <span className="text-[#E53935] font-bold flex-shrink-0 mt-0.5">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: heading.replace(/<[^>]+>/g, ''),
                            }}
                          />
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Book a Ticket CTA */}
              <div className="bg-gradient-to-br from-[#0F2B5B] to-[#1A3D7C] rounded-2xl p-6 text-white shadow-lg">
                <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-wider mb-3">
                  Ready to Travel?
                </p>
                <h3 className="text-xl font-bold mb-3">Book Your Bus Ticket Now</h3>
                <p className="text-white/70 text-sm mb-5">
                  Comfortable AC buses. Online seat selection. Instant confirmation.
                </p>
                <Link
                  href="/booking"
                  className="block w-full text-center bg-[#E53935] hover:bg-[#C62828] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  Search Buses →
                </Link>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wider mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-5">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.id}
                        href={`/blog/${related.slug}`}
                        className="group flex gap-3 items-start"
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex-shrink-0 bg-gradient-to-br ${getCategoryGradient(related.categories)}`}
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#1E293B] line-clamp-2 group-hover:text-[#0F2B5B] transition-colors leading-snug">
                            {related.title}
                          </p>
                          <p className="text-xs text-[#94A3B8] mt-1">
                            {estimateReadingTime(related.content)} min read
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to Blog */}
              <Link
                href="/blog"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-[#E2E8F0] text-[#475569] font-semibold text-sm hover:border-[#0F2B5B] hover:text-[#0F2B5B] transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to All Articles
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
