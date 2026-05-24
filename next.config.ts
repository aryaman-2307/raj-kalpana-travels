import type { NextConfig } from 'next';

/**
 * Security Headers
 * ─────────────────────────────────────────────────────────────────────────────
 * Applied to every route via next.config.ts headers().
 * IMPORTANT: Keep these headers in sync with any future API or CDN changes.
 *
 * TO ADD WORDPRESS BLOG LATER:
 *   1. Add your WordPress domain to img-src and connect-src below.
 *   2. Set WORDPRESS_API_URL in your environment variables.
 *   3. No other changes needed — the /lib/wordpress.ts client is already built.
 *
 * TO ADD BOOKING API LATER:
 *   1. Add your GDS/payment gateway domain to connect-src.
 *   2. If the gateway loads external scripts, add their domain to script-src.
 */

const WORDPRESS_DOMAIN = process.env.WORDPRESS_API_URL
  ? new URL(process.env.WORDPRESS_API_URL).hostname
  : null;

const wpImgSrc = WORDPRESS_DOMAIN ? ` https://${WORDPRESS_DOMAIN}` : '';
const wpConnectSrc = WORDPRESS_DOMAIN ? ` https://${WORDPRESS_DOMAIN}` : '';

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      // Only allow resources from own origin by default
      "default-src 'self'",

      // Scripts: self + Next.js inline bootstrap chunk (nonce-less approach)
      // NOTE: 'unsafe-inline' is required for Next.js inline scripts.
      // Do NOT add 'unsafe-eval' — it is a major XSS vulnerability.
      "script-src 'self' 'unsafe-inline'",

      // Styles: allow inline (Next.js CSS-in-JS) + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

      // Fonts: self + Google Fonts CDN
      "font-src 'self' data: https://fonts.gstatic.com",

      // Images: self, data URIs (base64), blob (local previews), WordPress images
      `img-src 'self' data: blob: https://*.rajkalpanatravels.com${wpImgSrc}`,

      // Fetch/XHR: self + own API subdomain + WordPress REST API (if configured)
      `connect-src 'self' https://*.rajkalpanatravels.com${wpConnectSrc}`,

      // No iframes allowed (prevents clickjacking)
      "frame-ancestors 'none'",

      // Restrict base tag to self (prevents base-tag injection)
      "base-uri 'self'",

      // Forms can only POST to own origin
      "form-action 'self'",

      // Block all plugins (Flash, Silverlight, etc.)
      "object-src 'none'",

      // Upgrade HTTP to HTTPS automatically
      'upgrade-insecure-requests',
    ].join('; '),
  },
  {
    // HSTS — force HTTPS for 2 years, include subdomains, enable browser preload list
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    // Prevent the page from being loaded in an iframe (clickjacking protection)
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    // Prevent MIME-type sniffing attacks
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    // Only send full referrer to same origin; only origin to HTTPS cross-origin
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    // Disable access to sensitive browser APIs
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    // Prevent cross-site scripting via document.domain
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  images: {
    // Allowed remote image domains
    remotePatterns: [
      // WordPress blog images (when connected later)
      {
        protocol: 'https',
        hostname: '**.rajkalpanatravels.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
    // Disable external image optimization for security
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
  },

  // Disable the X-Powered-By: Next.js header (reduces attack surface)
  poweredByHeader: false,

  // Strict mode for React — helps catch bugs early
  reactStrictMode: true,
};

export default nextConfig;
