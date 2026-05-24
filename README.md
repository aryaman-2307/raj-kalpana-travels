# Raj Kalpana Travels — Next.js Website

A production-quality, modern bus travel booking website for **Raj Kalpana Travels Pvt. Ltd.** built with Next.js 15, TypeScript, and Tailwind CSS.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 15** (App Router) | Framework — SSR, SSG, ISR, API routes |
| **TypeScript** | Type safety throughout |
| **Tailwind CSS v4** | Styling with custom design tokens |
| **Zod** | Form & API validation |
| **WordPress REST API** | Headless CMS for blog content only |

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd raj-kalpana-travels

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Type | Description |
|----------|------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Public | Base URL of the website |
| `WORDPRESS_API_URL` | Server-only | WordPress REST API base URL |

> ⚠️ **Security**: Never prefix private credentials with `NEXT_PUBLIC_`. Only `NEXT_PUBLIC_SITE_URL` should be public. Payment secrets, database URLs, JWT secrets, and WordPress admin credentials must remain server-side.

## WordPress Blog Integration

The blog section uses WordPress as a **headless CMS**:

1. **Install WordPress** at your preferred location:
   - `https://blog.rajkalpanatravels.com`
   - or `https://www.rajkalpanatravels.com/blog-admin`
   - or any separate hosting panel

2. **Set the environment variable**:
   ```
   WORDPRESS_API_URL=https://blog.rajkalpanatravels.com
   ```

3. **How it works**:
   - Next.js fetches posts from WordPress REST API
   - Blog listing: `GET ${WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed`
   - Single post: `GET ${WORDPRESS_API_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`
   - ISR revalidates every hour (3600s)
   - If WordPress is unavailable, mock blog data is displayed

4. **Security**:
   - WordPress admin credentials are never exposed to the frontend
   - All WordPress HTML content is sanitized via `SafeHtml` component
   - `WORDPRESS_API_URL` is a server-only variable

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API route handlers
│   ├── blog/              # Blog pages (WordPress integration)
│   ├── routes/[slug]/     # Dynamic route detail pages
│   ├── sitemap.ts         # Dynamic XML sitemap
│   ├── robots.ts          # robots.txt configuration
│   ├── not-found.tsx      # Custom 404 page
│   ├── error.tsx          # Error boundary
│   └── loading.tsx        # Loading skeleton
├── components/
│   ├── layout/            # TopContactBar, Navbar, MobileMenu, Footer
│   └── home/              # All homepage section components
├── lib/
│   ├── validators/        # Zod schemas for all forms
│   ├── wordpress.ts       # WordPress REST API client
│   ├── safe-html.tsx      # HTML sanitizer for WordPress content
│   ├── safe-redirect.ts   # Open redirect prevention
│   ├── seo.ts             # SEO metadata & JSON-LD generators
│   └── constants.ts       # Company info, navigation links
├── data/                  # Mock data (routes, cities, FAQs, etc.)
└── types/                 # TypeScript interfaces
```

## Pages

### Public Pages
| Route | Description |
|-------|-------------|
| `/` | Home page with 13 sections |
| `/booking` | Full-page bus search |
| `/search-results` | Search results with filters |
| `/schedules` | All routes with pagination |
| `/routes/[slug]` | Route detail page |
| `/gallery` | Photo gallery |
| `/about` | About the company |
| `/contact` | Contact form & info |
| `/offers` | Special offers |
| `/testimonials` | Customer testimonials |
| `/faqs` | FAQ accordion |
| `/careers` | Job listings |
| `/blog` | Blog listing (WordPress) |
| `/blog/[slug]` | Blog post detail |
| `/track-shipment` | Shipment tracking |
| `/feedback` | Feedback form |

### Private Pages (noindex)
| Route | Description |
|-------|-------------|
| `/customer-login` | Customer login |
| `/agent-login` | Agent login |
| `/agent-registration` | Agent registration |
| `/manage-bookings` | Booking lookup |
| `/ticket-details` | Ticket details |
| `/booking-confirm` | Booking confirmation |
| `/booking-cancel` | Booking cancellation |
| `/refund-status` | Refund status lookup |
| `/confirm-phone-booking` | Phone booking confirmation |

### Policy Pages
| Route | Description |
|-------|-------------|
| `/privacy-policy` | Privacy policy |
| `/terms-and-conditions` | Terms & conditions |
| `/cancellation-refund-policy` | Cancellation & refund policy |

## Security

### Implemented
- ✅ Content Security Policy (CSP) headers
- ✅ HSTS with preload
- ✅ X-Frame-Options: DENY (clickjacking prevention)
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Permissions-Policy (camera, microphone, geolocation disabled)
- ✅ Zod validation on all forms (client + server)
- ✅ HTML sanitization for WordPress content
- ✅ Safe redirect helper (open redirect prevention)
- ✅ No sensitive data in URLs
- ✅ No sensitive console logging
- ✅ Server-only environment variables for secrets

### Backend Responsibilities (Not implemented in frontend)
- 🔲 Authentication (JWT/sessions via HttpOnly cookies)
- 🔲 Authorization (role verification server-side)
- 🔲 Payment processing & verification
- 🔲 Price/availability verification
- 🔲 Rate limiting on form submissions
- 🔲 CAPTCHA for public forms
- 🔲 Database operations
- 🔲 Email notifications

> ⚠️ **Important**: The frontend does not verify prices, seat availability, payment success, or user roles. All business-critical decisions must be validated server-side.

## Performance

### Optimizations
- Server Components by default (reduced client JS)
- Client Components only for interactive elements
- `next/image` with proper width/height/sizes
- `next/font` for Google Fonts (no layout shift)
- ISR for blog pages
- Static generation for marketing pages
- Lazy-loaded gallery images
- No heavy animation libraries
- Pagination for route listings

### Lighthouse Targets
| Metric | Target |
|--------|--------|
| Performance | 90+ |
| Accessibility | 95+ |
| SEO | 95+ |
| Best Practices | 95+ |

## SEO

- ✅ Unique title & description per page
- ✅ Open Graph & Twitter Card metadata
- ✅ Canonical URLs
- ✅ Dynamic XML sitemap (`/sitemap.xml`)
- ✅ `robots.txt` (private pages disallowed)
- ✅ JSON-LD structured data (Organization, LocalBusiness, FAQPage, BlogPosting)
- ✅ Semantic HTML (`header`, `nav`, `main`, `section`, `footer`)
- ✅ Heading hierarchy (single `h1` per page)
- ✅ Alt text on all images

## Accessibility

- ✅ Semantic HTML elements
- ✅ All forms have labels
- ✅ Keyboard-accessible mobile menu
- ✅ Visible focus states
- ✅ `aria-live` for form messages
- ✅ Color contrast compliance
- ✅ Skip-to-content via `main` landmark

## Deployment Checklist

1. [ ] Set all environment variables
2. [ ] Configure WordPress (if using blog)
3. [ ] Run `npm run build` — verify no errors
4. [ ] Test all 28 pages render correctly
5. [ ] Verify security headers in response
6. [ ] Run Lighthouse audit
7. [ ] Test mobile responsiveness
8. [ ] Test keyboard navigation
9. [ ] Verify sitemap.xml and robots.txt
10. [ ] Set up SSL certificate
11. [ ] Configure CDN for static assets
12. [ ] Set up error monitoring (Sentry, etc.)

## License

Proprietary — © 2025 Raj Kalpana Travels Pvt. Ltd.
