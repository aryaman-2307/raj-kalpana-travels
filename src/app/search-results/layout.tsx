import type { Metadata } from 'next';

/**
 * Internal search results are an unbounded parameter space (from × to × date).
 * They must never be indexed — the route pages under /routes/<slug> are the
 * pages built to rank. Also disallowed in robots.ts.
 */
export const metadata: Metadata = {
  title: 'Search results',
  robots: { index: false, follow: true },
};

export default function SearchResultsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
