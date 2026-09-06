# Raj Kalpana Travels — implementation handover for Bitla

**Audience:** the Bitla developer rebuilding these pages inside the Bitla platform.
**Status of this repository:** design and specification reference. Not a deployable site.
**Reference commit date:** 3 September 2026. Live site: `https://www.rajkalpanatravels.com`.

You can see the layout and the copy by opening the pages in this repo. What you
cannot see by looking is the part that decides whether these pages rank: canonical
tags, noindex rules, structured data, the sitemap rule, internal linking, the
booking hand-off URL, performance budgets and analytics events. That is what this
document is for. Everything below is stated so it can be implemented without
talking to us.

---

> ## ⚠ Read this first — what in here is real and what is sample data
>
> **Every departure time, arrival time, duration and fare in this repository is a
> read-only snapshot of your live inventory taken on 3 September 2026.** It is
> there so the pages look and measure like the real thing. It is **not** a data
> source and it must not be shipped as static content.
>
> | Must be fetched from Bitla in real time | Copy as-is (static content) |
> |---|---|
> | Departure and arrival times | Route slugs and URLs |
> | Journey duration | Page copy: `description`, `highlights` |
> | Fares, and the `Offer` price in structured data | FAQs (`src/data/route-faqs.ts`) |
> | Coach / bus type per service | Boarding and dropping **point names** (after operations confirms them) |
> | Seat availability | `distanceKm`, `via`, `keywords` |
> | Which services run on a given date | Section order, layout, metadata templates |
>
> In short: **`services[]` is live, everything else is content.** See §4 for the
> field-by-field rule and the empty-inventory fallback.
>
> Two more things in here are deliberately unfinished and must not ship as they
> are: boarding/dropping points are researched but unconfirmed (every marketed
> route carries `pointsNeedVerification: true`), and there are no real
> photographs. See §13.

---

## 1. What this repository is

This is a Next.js 15 (App Router) build of the Raj Kalpana Travels marketing site.
It will **not** go live. Bitla owns the booking engine, the payment gateway and
checkout, and an external site cannot use that payment flow. So the repo exists as
a reference implementation: Bitla reproduces its design, layout, URL structure,
content model, metadata, structured data and internal linking inside the Bitla
platform, and checkout stays exactly where it is today.

**What Bitla is expected to copy**

| Area | Copy from | Notes |
|---|---|---|
| Page layout and section order | `src/app/routes/[slug]/page.tsx`, `src/app/routes/page.tsx` | Section order matters for SEO, not just looks — see §5 |
| URL structure | §2 of this document | The single biggest change from the live site |
| Content model | `src/types/index.ts`, `src/data/routes.ts` | Especially `services[]` — see §4 |
| Metadata | `src/lib/seo.ts`, `src/app/layout.tsx` | Title/description templates and canonicals — see §6 |
| Structured data | `src/lib/seo.ts` | BreadcrumbList, FAQPage, BusTrip+Offer, Organization — see §7 |
| Internal linking | `src/components/routes/RouteCard.tsx`, `src/components/home/TopRoutes.tsx` | Route cards must link to route pages — see §9 |
| Analytics events | `data-track` attributes in `src/components/routes/*` | See §12 |

**What Bitla keeps**

Search, seat map, passenger details, payment, ticketing, cancellation, refunds.
Nothing in this repo replaces any of that. The route pages hand off into Bitla
search with a URL — see §10.

**What is deliberately not finished here**

Photography, confirmed boarding/dropping points, and live fares. See §13.

---

## 2. URL structure

Lowercase, hyphenated, no trailing slash, no query strings on indexable pages,
`https://www.` host throughout.

| Page type | URL pattern | Indexable | Source in repo |
|---|---|---|---|
| Home | `/` | Yes | `src/app/page.tsx` |
| Routes hub | `/routes` | Yes | `src/app/routes/page.tsx` |
| Route page | `/routes/<from>-to-<to>` | Only when documented (§4) | `src/app/routes/[slug]/page.tsx` |
| Internal search results | `/search-results?...` | **Never** | `src/app/search-results/layout.tsx` |
| Booking entry | `/booking` | Yes | `src/app/booking/page.tsx` |
| Schedules | `/schedules` | Yes | `src/app/schedules/page.tsx` |
| Static content | `/about`, `/contact`, `/gallery`, `/offers`, `/testimonials`, `/faqs`, `/careers` | Yes | `src/app/*` |
| Policies | `/privacy-policy`, `/terms-and-conditions`, `/cancellation-refund-policy` | Yes | `src/app/*` |
| Blog | `/blog`, `/blog/<slug>` | Yes, if the post exists | `src/app/blog/*` |
| Account and transaction | `/customer-login`, `/agent-login`, `/agent-registration`, `/manage-bookings`, `/ticket-details`, `/booking-confirm`, `/booking-cancel`, `/refund-status`, `/confirm-phone-booking` | No — disallowed | `src/app/robots.ts` |

### The route URL rule

```
/routes/delhi-to-lucknow
/routes/lucknow-to-delhi
/routes/delhi-to-varanasi
/routes/varanasi-to-delhi
```

Pattern: `/routes/{fromSlug}-to-{toSlug}`, lowercase, words hyphenated.

**One page per direction.** Delhi to Lucknow and Lucknow to Delhi are two separate
pages with separate content, separate timetables, separate FAQs and separate
canonicals. They are different searches with different intent and different
departure times. Do not canonicalise one to the other, and do not build a single
"Delhi–Lucknow" page serving both.

The 29 route slugs in `src/data/routes.ts` are the authoritative list. Do not
invent alternative spellings; do not create `/route/`, `/bus/`, `/delhi-lucknow`
or `/routes/delhi-lucknow-bus` variants alongside these.

### Internal search

Internal search results live at `/search-results` and take `from`/`to`/`date`
parameters. That is an unbounded parameter space (origin × destination × date)
and must never be indexed. It is `noindex, follow` via
`src/app/search-results/layout.tsx` **and** `Disallow: /search-results` in
`src/app/robots.ts`. Keep both. The pages built to rank are `/routes/<slug>`.

---

## 3. Migration and redirects from the current site

The live site already ranks — it is position 1 for `raj kalpana travels delhi to
lucknow` and it has eight indexed blog posts. **Every URL below changes in this
redesign.** A launch without a redirect map throws away whatever authority those
URLs have accumulated, and it is not recoverable afterwards by adding the
redirects late.

Everything in this section was verified against the live site on 3 September 2026.

### What is live today

| Pattern | Example | Count |
|---|---|---|
| Route directory pages | `/routes-directory/Delhi-to-Lucknow/` | ~843 origin–destination pairs linked from `/schedules.html` |
| Legacy route alias | `/online-bus-tickets/Delhi-to-Lucknow` | redirects to the routes-directory URL |
| Static pages | `/about-us.html`, `/schedules.html`, `/contact.html`, `/gallery.html`, `/faqs.html`, `/offers.html`, `/testimonials.html`, `/careers.html`, `/feedback.html`, `/privacy-policy.html`, `/terms-and-conditions.html`, `/refund-status.html`, `/sitemap.html`, `/journey-insights.html` | 14 |
| Blog posts | `/delhi-to-lucknow-by-bus-routes-timings-and-tips.html` and 7 others, all `.html` at the root, indexed from `/journey-insights.html` | 8 |
| Transactional | `/manage-bookings.html`, `/agent-registration.html`, `/confirm-phone-booking.html`, `/booking-confirm.html`, `/booking-cancel.html`, `/ticket-details.html` | 6 |

### Three duplication problems to resolve at the same time

These exist on the live site now. Migrating without fixing them carries the
duplication into the new URLs.

**1. Case variants both resolve.** `/routes-directory/Delhi-to-Lucknow/` and
`/routes-directory/delhi-to-lucknow/` both return **200**, and each canonicalises
to *itself*. Two URLs, one page, no winner.

**2. Trailing slash is inconsistent with the canonical.** Those URLs are served
with a trailing slash but their `<link rel="canonical">` omits it — the canonical
points at a URL different from the one being served.

**3. `.html` and extensionless both resolve for some pages.** `/schedules` and
`/schedules.html` both return **200**, each self-canonical. The live `sitemap.xml`
lists the extensionless form (`http://www.rajkalpanatravels.com/schedules`) while
the site's own navigation links to the `.html` form — so the sitemap and the
internal links disagree about which URL is real. The live sitemap also uses
`http://`, not `https://`, on all 21 entries.

The new structure resolves all three by rule: **lowercase, no trailing slash, no
extension, `https://www.` host, one canonical form per page.**

### Redirect map

All redirects are **301 (permanent)**, one hop, no chains.

| From (live) | To (new) |
|---|---|
| `/routes-directory/{From}-to-{To}/` — any case, with or without trailing slash | `/routes/{from}-to-{to}` lowercased |
| `/online-bus-tickets/{From}-to-{To}` | `/routes/{from}-to-{to}` lowercased |
| `/online-bus-tickets` | `/routes` |
| `/schedules.html`, `/schedules` | `/schedules` |
| `/about-us.html`, `/about-us` | `/about` |
| `/contact.html` | `/contact` |
| `/gallery.html` | `/gallery` |
| `/faqs.html` | `/faqs` |
| `/offers.html` | `/offers` |
| `/testimonials.html` | `/testimonials` |
| `/careers.html` | `/careers` |
| `/feedback.html` | `/feedback` |
| `/privacy-policy.html` | `/privacy-policy` |
| `/terms-and-conditions.html` | `/terms-and-conditions` |
| `/refund-status.html` | `/refund-status` |
| `/journey-insights.html` | `/blog` |
| `/sitemap.html` | `/routes` (it was a link directory; the hub replaces it) |
| `/{post-slug}.html` (the 8 blog posts) | `/blog/{post-slug}` — see below |
| `/manage-bookings.html` and other transactional `.html` | their new equivalents, then `Disallow` |
| `http://` anything | `https://` same path |
| non-`www` anything | `www` same path |
| any trailing-slash variant | the no-slash form |

### The 843 stop-pair URLs

`/schedules.html` links roughly 843 origin–destination combinations, including
pairs like `Mathura-to-Dabra` and `Dholpur-to-Datia`. Almost all of them are
intermediate stop permutations rather than marketed routes, and each is a thin
near-duplicate.

Do **not** create 843 pages under `/routes/`. Map them like this:

- A pair that matches one of the marketed route slugs → 301 to that
  `/routes/{slug}` page.
- Any other pair → 301 to the `/routes` hub, **or** to the parent route page it is
  a stop on, if that mapping is known. One destination, chosen deliberately; do
  not 301 all 843 to the homepage, which Google treats as a soft 404.

### The 8 blog posts

Two of them target priority route queries directly:

```
/delhi-to-lucknow-by-bus-routes-timings-and-tips.html
/why-more-travelers-are-choosing-delhi-to-lucknow-buses-for-comfortable-intercity-travel.html
/delhi-to-varanasi-by-bus-sleeper-coach-guide-timings-and-fare.html
```

Those three now compete with `/routes/delhi-to-lucknow` and
`/routes/delhi-to-varanasi` for the same query. Two options, both acceptable, but
pick one per post and do not leave them competing:

- **Merge** — fold anything useful into the route page and 301 the post to it.
  This is the right call for the two Delhi–Lucknow posts, which are largely the
  same content as the new route page.
- **Keep and differentiate** — move to `/blog/{slug}` and rewrite so the post
  answers a different question than the route page (a packing guide, a seat guide,
  a city guide), linking to the route page rather than duplicating it.

The remaining five (`5-things-to-carry-for-your-overnight-bus-journey`,
`how-to-choose-the-best-sleeper-bus-for-long-journeys-in-india`,
`why-bus-safety-features-matter-…`,
`top-5-bus-routes-from-delhi-affordable--comfortable-options`,
`planning-a-spiritual-trip-book-delhi-to-rishikesh-buses-online-with-ease`) do not
compete with a route page — move them to `/blog/{slug}` with a 301 and keep them.

Note the double hyphen in `top-5-bus-routes-from-delhi-affordable--comfortable-options`;
keep the source slug exactly as-is on the left side of the redirect.

### Migration rules

1. **301, not 302.** A 302 does not pass authority and Google may keep the old URL
   indexed indefinitely.
2. **One hop.** `.html` → new URL directly. Never `.html` → extensionless →
   lowercase → final.
3. **Keep the redirects for at least 12 months.** Do not clean them up at the next
   release.
4. **Every old URL gets a destination.** If there is no equivalent, 301 to the
   nearest hub — `/routes` for a route, `/blog` for a post. A 404 is acceptable
   only for a URL that never should have existed.
5. **Update the internal links too.** Redirects are for external links and Google;
   internal navigation should point at the final URL directly.
6. Submit the new `sitemap.xml` in Search Console on launch day and keep the old
   sitemap accessible for a few weeks so Google recrawls the old URLs and sees the
   301s.

### Scope note: city pages are not in this build

`fromSlug` and `toSlug` exist on every route and the hub groups by origin city, so
`/city/{slug}` pages ("Buses from Lucknow", office address, all routes in and out,
`LocalBusiness` schema) are a natural next phase. **They are deliberately not part
of this handover.** Do not build them speculatively — the URL shape is reserved
and the specification will follow once Google Business Profiles are live for the
Delhi, Lucknow, Varanasi and Indore offices.

### `/schedules` versus `/routes`

Both exist and they are not the same page. `/routes` is the SEO hub: marketed
routes as cards, then every route grouped by origin, linking to `/routes/{slug}`.
`/schedules` is the operational timetable view. Keep `/schedules` indexable, but
it must link **to** the route pages rather than duplicating their content, and it
must not be a second list of 843 links.

---

## 4. Route data model

Defined in `src/types/index.ts`. Data lives in `src/data/routes.ts` (29 routes).

### `Route`

| Field | Type | Required | Meaning |
|---|---|---|---|
| `id` | `string` | Yes | Internal id, e.g. `route-001` |
| `slug` | `string` | Yes | URL segment, e.g. `delhi-to-lucknow` |
| `from` / `to` | `string` | Yes | Display city names, e.g. `Delhi`, `Lucknow` |
| `fromSlug` / `toSlug` | `string` | Yes | Lowercase city slugs, used for cross-linking |
| `departureTime` / `arrivalTime` | `string` | Yes | 24h `HH:MM`, the headline service |
| `duration` | `string` | Yes | e.g. `8h 00m` |
| `busType` | `string` | Yes | e.g. `Bharat Benz Semi Sleeper/Sleeper AC (2+1)` |
| `amenities` | `string[]` | Yes | Rendered as the "On board" grid |
| `price` | `number` | Yes | Fallback lowest fare in INR |
| `available` | `boolean` | Yes | Operating flag |
| `distanceKm` | `number` | SEO | Road distance, shown in the fact strip |
| `via` | `string` | SEO | Highways used, e.g. `Yamuna Expressway · Agra–Lucknow Expressway` |
| `services` | `RouteService[]` | SEO | **Every coach on this exact pair.** Drives the timetable |
| `boardingPoints` | `RoutePoint[]` | SEO | Pick-up points in the origin city |
| `droppingPoints` | `RoutePoint[]` | SEO | Drop points in the destination city |
| `pointsNeedVerification` | `boolean` | — | `true` = points are researched, not confirmed. See §13 |
| `description` | `string` | SEO | 140–200 words, exactly two paragraphs separated by a blank line |
| `highlights` | `string[]` | SEO | 4–6 one-line facts, each under 90 characters |
| `keywords` | `string[]` | — | Target queries. Documentation for writers, never output to the page |
| `popular` | `boolean` | SEO | Marketed route: full content, sitemap entry, homepage placement |

### `RouteService` — why this field exists

```ts
interface RouteService {
  name: string;          // "Delhi-Lucknow 104"
  departureTime: string; // "22:30", 24h
  arrivalTime: string;   // "06:30"
  duration: string;      // "8h 00m"
  busType: string;
  price: number;         // lowest berth fare in INR, normal weekday
}
```

This is the difference between a page that ranks and a page that does not.
`delhi-to-lucknow` has **six** services between 21:30 and 23:50 at fares from ₹699
to ₹4,999. A single `departureTime` and a single `price` on the route cannot
produce:

- a **timetable** of every coach (`src/components/routes/Timetable.tsx`), which is
  the content people actually search for and the reason they stay on the page;
- the **"Lowest fare"** badge — `lowestFare()` takes `Math.min` across
  `services[].price`;
- the **"Fastest"** badge — `durationMinutes()` parses `"8h 30m"` and takes the
  minimum across services;
- an honest **"6 departures nightly"** count in the fact strip, the route card and
  the meta description;
- a `BusTrip` **Offer** price that matches what a user sees on arrival.

If Bitla's route model has one departure per row, aggregate the rows for an
origin-destination pair into one page with N services. Do not create one page per
coach — that produces six near-duplicate pages competing with each other.

### `RoutePoint`

```ts
interface RoutePoint { name: string; landmark: string; time: string; }
```

Presets live in `src/data/route-points.ts` as `CITY_POINTS`, keyed by city slug,
each with an `offsetMin` from the first departure of the night. `addMinutes()`
recalculates the displayed time per service and wraps past midnight.

### `isDocumented()` — the gate on indexability

`src/lib/routes.ts`:

```ts
export function isDocumented(route: Route): boolean {
  return Boolean(
    route.popular &&
    route.services?.length &&
    route.description &&
    (ROUTE_FAQS[route.slug]?.length ?? 0) >= 4
  );
}
```

A route is indexable and appears in the sitemap **only** when all four hold:

1. `popular: true`
2. a non-empty `services` array
3. a `description`
4. at least 4 FAQs in `src/data/route-faqs.ts`

Everything else still **renders** — so internal links never 404 and a customer who
lands there gets a working page with a "Schedule confirmed at booking" panel and a
phone number — but is served `noindex`. Currently 12 of 29 routes pass; the other
17 do not.

`documentedRoutes` and `popularRoutes` in `src/lib/routes.ts` are both
`ROUTES.filter(isDocumented)`. The homepage, the routes hub and the sitemap all
read from those, so the three can never disagree about a fare again.

### Fares and times are a snapshot, not a source

The services, times and fares in `src/data/routes.ts` were **read off the live
Bitla inventory on 3 September 2026**. They are correct as a design reference and
nothing more.

**In production these must be sourced from the booking system, not hard-coded.**
A page that advertises ₹699 while the search returns ₹1,299 is worse than a page
with no price: it loses the booking and, if the price is in `Offer` structured
data, it earns a Google Merchant-style price mismatch. Fares change by date, day
of week and season. Render the lowest available fare for the next N days from live
inventory, or render a fare band, but do not paste a number into a template.

### Field by field: what is live, what is content

The `Route` object mixes two very different kinds of data and they have different
lifecycles. Getting this split wrong in either direction is a problem: hard-code
the live half and you publish stale prices; try to generate the content half from
the booking system and you get the thin, auto-generated pages the current site
already has.

| Field | Kind | In production |
|---|---|---|
| `slug`, `from`, `to`, `fromSlug`, `toSlug` | Content | Static. These are URLs — never change them without a 301. |
| `services[]` — `departureTime`, `arrivalTime`, `duration`, `busType`, `price` | **Live** | Fetch per route from the booking system. Everything the timetable, the fact strip, the "lowest fare / fastest" badges and the `Offer` price render comes from here. |
| `distanceKm`, `via` | Content | Static. Road distance and the highways used do not change per booking. |
| `description`, `highlights` | Content | Static, written per route. Do not template these from the data — a generated paragraph is what makes a page thin. |
| `boardingPoints[]`, `droppingPoints[]` — names and landmarks | Content | Static, once operations confirms them. |
| `boardingPoints[]`, `droppingPoints[]` — `time` | **Live** | Derived from the actual departure of the service the passenger picked. In this repo they are computed offsets (`src/data/route-points.ts`); in production they should come from the service. |
| `amenities` | Content | Static per coach type. |
| FAQs (`src/data/route-faqs.ts`) | Content | Static, hand-written. Answers quote fares and times, so **review them whenever the schedule changes** — a stale FAQ answer can surface directly in Google via `FAQPage`. |
| `keywords` | Content | Documentation for whoever writes the copy. Not rendered. |
| `popular`, and the `isDocumented()` result | Content | Static editorial decision: is this route marketed or not. |

### When live inventory returns nothing for a route

This will happen — a route sells out, a service is suspended, a seasonal route is
out of season. The page must degrade, not break:

1. Render the page normally. Do **not** 404 and do **not** redirect. The URL must
   stay stable or you lose the ranking you built.
2. Replace the timetable with the "Schedule confirmed at booking" panel already in
   `src/components/routes/Timetable.tsx` (the `services.length === 0` branch),
   which shows the phone number and a WhatsApp link instead.
3. Drop `Offer` from the `BusTrip` structured data entirely. An `Offer` with no
   real price is worse than no `Offer` — see §7.
4. Fall back to the generic title (`{From} to {To} Bus | Schedule on Request`)
   rather than advertising a fare you cannot honour.
5. Leave the page indexable **only** if it still has its content half — the
   description, the FAQs and the boarding points. A page that has lost both its
   inventory and its content should go `noindex` until one comes back.

---

## 5. Route page template

Section order, top to bottom. This order is not cosmetic — the timetable is the
answer to the query and belongs above the prose, and the FAQs must be in the DOM
for `FAQPage` markup to be valid.

| # | Section | Server-rendered? | Component |
|---|---|---|---|
| 1 | Breadcrumb nav (Home / Routes / {From} to {To}) | **Yes** | inline in `page.tsx` |
| 2 | H1 — `{From} to {To} Bus` | **Yes** | inline |
| 3 | Sub-line: `busType` · via `{via}` | **Yes** | inline |
| 4 | Fact strip: Distance, Duration, Departures, Fare from | **Yes** | inline `<dl>` |
| 5 | Timetable of **all** services | **Yes** | `src/components/routes/Timetable.tsx` |
| 6 | Boarding points in `{From}` | **Yes** | `src/components/routes/PointsList.tsx` |
| 7 | Dropping points in `{To}` | **Yes** | `PointsList.tsx` |
| 8 | About this route — highlights list, then two-paragraph description | **Yes** | inline |
| 9 | On board — amenities grid | **Yes** | inline |
| 10 | FAQs | **Yes** (accordion may be client-side, the text must not be) | `src/components/routes/RouteFaqs.tsx` |
| 11 | Related routes — reverse direction first | **Yes** | `src/components/routes/RouteCard.tsx` |
| 12 | Sticky booking panel, desktop only | **Yes** | `src/components/routes/BookingPanel.tsx` |
| 13 | Sticky book bar, mobile only | **Yes** | `src/components/routes/MobileBookBar.tsx` |

### Server-rendered, not injected

Everything in the table above ships in the initial HTML response. In particular
the **timetable, boarding and dropping points, description, highlights, FAQ text
and related-route links** must be in the HTML that arrives from the server. If any
of that is fetched by client JavaScript after load, it is unreliable for indexing,
it delays LCP, and it makes the FAQ and BusTrip markup inconsistent with the
rendered page — which Google treats as a structured-data violation, not a warning.

Client-side behaviour is fine for: expanding and collapsing the FAQ accordion,
the seat map, and anything after the user clicks Book.

### H1 rule

```
Correct:   Delhi to Lucknow Bus
Correct:   Lucknow to Delhi Bus
Wrong:     Delhi → Lucknow
Wrong:     Delhi - Lucknow Bus Service | Raj Kalpana Travels
```

The H1 is exactly `{From} to {To} Bus`. Never an arrow character. Nobody searches
for "Delhi → Lucknow"; a large number of people search for "delhi to lucknow bus".
The arrow may appear in decorative card graphics (it does in `RouteCard.tsx`), but
never in the H1, the `<title>`, or a breadcrumb label.

### Timetable behaviour

`Timetable.tsx` renders **cards on mobile and a table on desktop**. Do not ship a
horizontally scrolling table to phones — most of this traffic is mobile. Services
are sorted by `departureTime` ascending via `sortedServices()`. Badges appear only
when a route has more than one service: `Lowest fare` on the minimum
`services[].price`, `Fastest` on the minimum `durationMinutes(duration)`.

When `services` is empty the component renders a "Schedule confirmed at booking"
panel with the phone number instead of an empty table.

Below the timetable, keep the disclosure line: fares are the lowest berth on a
normal weekday, weekend and festival fares may be higher, times are for the first
boarding point.

---

## 6. Metadata rules

This is where the current live site is measurably broken. Read this section
closely.

### The brand is appended once, by the template

`src/app/layout.tsx`:

```ts
export const metadata: Metadata = {
  title: {
    template: '%s | Raj Kalpana Travels',
    default: 'Raj Kalpana Travels Pvt. Ltd. — Your Destination Partner',
  },
  ...
};
```

Every child page supplies only the distinctive part of the title. The layout adds
` | Raj Kalpana Travels`.

**A page title must never contain "Raj Kalpana Travels" itself.** If it does, the
brand renders twice. The live site currently ships titles ending
`... | Raj Kalpana Travels | Raj Kalpana Travels`. That wastes roughly 22
characters of a ~60 character budget, pushes the words people actually search for
out of the visible title, and reads as broken.

```
Wrong (title in the page):   Delhi to Lucknow Bus | Raj Kalpana Travels
Renders as:                  Delhi to Lucknow Bus | Raj Kalpana Travels | Raj Kalpana Travels

Right (title in the page):   Delhi to Lucknow Bus | AC Sleeper from ₹699
Renders as:                  Delhi to Lucknow Bus | AC Sleeper from ₹699 | Raj Kalpana Travels
```

This is not hypothetical: it is what the production site does today, on every
page, and it is the metadata bug Bitla must not carry across. This repo follows
the rule throughout — the homepage calls
`generatePageMetadata('Online Bus Ticket Booking | AC Sleeper Buses', …, '/')` in
`src/app/page.tsx`, which supplies no brand of its own and picks up a
self-referencing canonical from the same helper.

### Route page title and description

From `generateRouteMetadata()` in `src/lib/seo.ts`:

```
// documented route (has real inventory)
title       = `${route.from} to ${route.to} Bus | AC Sleeper from ${fare}`

// undocumented route (no verified inventory)
title       = `${route.from} to ${route.to} Bus | Schedule on Request`

description = `${from} to ${to} bus: ${N} departures nightly from ${firstDeparture},
               ${duration} journey, fares from ${fare}. Boarding at ${firstBoardingPoint}.
               Book online.`
```

Worked examples — `delhi-to-lucknow` (documented) and `delhi-to-etawah` (not):

```
Title:       Delhi to Lucknow Bus | AC Sleeper from ₹699
Description: Delhi to Lucknow bus: 6 departures nightly from 9:30 PM, 8h 00m journey,
             fares from ₹699. Boarding at Mori Gate Office. Book online.

Title:       Delhi to Etawah Bus | Schedule on Request
```

A route with no verified inventory never advertises a fare it cannot honour —
not in the title, not in the description, and not in structured data (§7).

When a route has no `services`, the description falls back to:

```
`${from} to ${to} bus by Raj Kalpana Travels. ${distanceKm} km, ${duration} on an
AC sleeper coach. Schedule confirmed at booking — call +91 9355777632.`
```

Fares come from `lowestFare()` and are formatted by `formatFare()` as
`₹1,23,456` (Indian digit grouping, `toLocaleString('en-IN')`). Times are stored
24h and displayed 12h by `formatTime()`.

### Length

Keep the title, **including the appended brand**, under about 60 characters. The
` | Raj Kalpana Travels` suffix is 22 characters, so the page-supplied part has
roughly 38 to work with. `Delhi to Lucknow Bus | AC Sleeper from ₹699` plus the
suffix is 65 — acceptable, because Google truncates from the right and the
route pair, which is what matters, is at the front. Order matters more than the
count: never put the brand or a generic word before the city pair.

Descriptions: 150–160 characters, one sentence of fact plus one call to action.

### Canonicals

Every indexable page needs a **self-referencing canonical** on the `https://www.`
host. From `generatePageMetadata()`:

```html
<link rel="canonical" href="https://www.rajkalpanatravels.com/routes/delhi-to-lucknow" />
```

Rules:

- Absolute URL, `https`, `www`, no trailing slash, no query string, no fragment.
- The canonical points at itself, not at `/routes` and not at the reverse direction.
- Pick one host and 301 everything else to it: `http://` → `https://`,
  non-`www` → `www`, any trailing-slash variant → the no-slash form. One hop, not
  a chain.
- `/search-results` gets no canonical worth having — it is `noindex` and
  disallowed. Do not canonicalise it to the homepage; that is a common and useless
  pattern.

**One host, spelled one way, in every place that emits a URL.** In this repo that
means `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts` and
`metadataBase` in `src/app/layout.tsx` all carry
`https://www.rajkalpanatravels.com`. Canonicals are emitted as absolute URLs, but
relative Open Graph image paths resolve against `metadataBase`, so a non-`www`
value there would advertise OG images on a different origin than the canonical
beside them. Keep all four in agreement.

### Open Graph and Twitter

`generatePageMetadata()` emits `og:title`, `og:description`, `og:url`,
`og:site_name` (`Raj Kalpana Travels Pvt. Ltd.`), `og:locale` (`en_IN`),
`og:type` (`website`), and `twitter:card` = `summary_large_image`. Mirror the
page title and description, do not re-append the brand.

---

## 7. Structured data

All JSON-LD is generated in `src/lib/seo.ts` and emitted as
`<script type="application/ld+json">` in the server-rendered HTML.

| Page type | Required schema | Generator |
|---|---|---|
| Documented route page | `BreadcrumbList` + `FAQPage` + `BusTrip` with `Offer` | `generateBreadcrumbJsonLd`, `generateFAQJsonLd`, `generateRouteJsonLd` |
| Undocumented route page | `BreadcrumbList` only | — |
| Routes hub `/routes` | `BreadcrumbList` | `generateBreadcrumbJsonLd` |
| Sitewide (root layout) | `Organization` | `generateOrganizationJsonLd` |
| Contact / about | `TravelAgency` (LocalBusiness) | `generateLocalBusinessJsonLd` |
| Blog post | `BlogPosting` | `generateBlogPostJsonLd` |

### BusTrip with Offer

```json
{
  "@context": "https://schema.org",
  "@type": "BusTrip",
  "name": "Delhi to Lucknow bus",
  "url": "https://www.rajkalpanatravels.com/routes/delhi-to-lucknow",
  "provider": {
    "@type": "Organization",
    "name": "Raj Kalpana Travels Pvt. Ltd.",
    "url": "https://www.rajkalpanatravels.com",
    "telephone": "+91-9355777632"
  },
  "departureBusStop": {
    "@type": "BusStation",
    "name": "Mori Gate Office",
    "address": { "@type": "PostalAddress", "addressLocality": "Delhi", "addressCountry": "IN" }
  },
  "arrivalBusStop": {
    "@type": "BusStation",
    "name": "Alambagh Office",
    "address": { "@type": "PostalAddress", "addressLocality": "Lucknow", "addressCountry": "IN" }
  },
  "departureTime": "21:30",
  "arrivalTime": "05:30",
  "offers": {
    "@type": "Offer",
    "price": 699,
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.rajkalpanatravels.com/routes/delhi-to-lucknow"
  }
}
```

`departureBusStop` is the first boarding point, `arrivalBusStop` the last dropping
point, `departureTime`/`arrivalTime` come from the earliest service, and `price` is
`lowestFare()` across `services[]`.

### The Offer rule

**An `Offer` must never carry a placeholder price.** The `Offer` is what can
surface a fare in a search result. If it says ₹699 and the booking flow says
₹1,299, that is a price mismatch against a live user — bad for conversion and a
structured-data violation.

Therefore: **emit `BusTrip`+`Offer` only on documented routes.** On a route with
no real inventory, emit `BreadcrumbList` and nothing else.

This is implemented here, and the shape is worth reproducing exactly. The gate is
the first statement in `generateRouteJsonLd()` in `src/lib/seo.ts`:

```ts
export function generateRouteJsonLd(route: Route) {
  // A route without verified inventory must not publish a price to Google.
  if (!isDocumented(route)) return null;
  ...
}
```

and `src/app/routes/[slug]/page.tsx` assigns the result once, then renders the
script tag only when it is non-null:

```tsx
const routeJsonLd = generateRouteJsonLd(route);
...
{routeJsonLd ? (
  <script type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(routeJsonLd) }} />
) : null}
```

The gate lives in the generator rather than in the page, so a new call site cannot
publish a `BusTrip` by accident. `BreadcrumbList` is still emitted on every route
page; the 17 undocumented routes publish no price to Google at all.

### FAQPage

Built by `generateFAQJsonLd()` from `ROUTE_FAQS[slug]` in
`src/data/route-faqs.ts` (6 questions per documented route, 72 in total). The
answer text in the markup must be **byte-identical to the visible answer** on the
page, and the FAQ must be visible without a click to reveal content that is not in
the DOM. Emit it only when `faqs.length > 0`.

### BreadcrumbList

Three levels on a route page, matching the visible breadcrumb exactly:

```
Home (/)  →  Routes (/routes)  →  Delhi to Lucknow (/routes/delhi-to-lucknow)
```

`generateBreadcrumbJsonLd()` prefixes each `item` with the base URL and numbers
`position` from 1.

---

## 8. Indexing rules

| URL / group | Status | Enforced by |
|---|---|---|
| `/`, `/routes`, `/booking`, `/schedules`, `/about`, `/contact`, `/gallery`, `/offers`, `/testimonials`, `/faqs`, `/careers`, `/blog`, policies, `/track-shipment`, `/feedback` | `index, follow` + canonical + in sitemap | `src/app/sitemap.ts` |
| Route page passing `isDocumented()` (12 today) | `index, follow` + canonical + in sitemap, priority 0.8 | `generateRouteMetadata`, `sitemap.ts` |
| Route page failing `isDocumented()` (17 today) | `noindex, nofollow`, renders normally, **not** in sitemap | `generateRouteMetadata(route)` passes `!documented` |
| `/search-results` | `noindex, follow` **and** `Disallow` | `search-results/layout.tsx` + `robots.ts` |
| `/api/` | `Disallow` | `robots.ts` |
| `/customer-login`, `/agent-login`, `/agent-registration`, `/manage-bookings`, `/ticket-details`, `/booking-confirm`, `/booking-cancel`, `/refund-status`, `/confirm-phone-booking` | `Disallow` | `robots.ts` |

### robots.txt

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /search-results
Disallow: /customer-login
Disallow: /agent-login
Disallow: /agent-registration
Disallow: /manage-bookings
Disallow: /ticket-details
Disallow: /booking-confirm
Disallow: /booking-cancel
Disallow: /refund-status
Disallow: /confirm-phone-booking

Sitemap: https://www.rajkalpanatravels.com/sitemap.xml
```

### The sitemap rule

**A `noindex` URL must never appear in the sitemap.** It is a direct
contradiction — the sitemap says "index this", the page says "do not" — and
Search Console reports it as an error against the whole sitemap, not just that
URL. `src/app/sitemap.ts` therefore maps over `documentedRoutes`, not `ROUTES`.

The same rule applies to disallowed URLs, redirecting URLs and 404s. A sitemap
should contain only URLs that return 200, are self-canonical, and are indexable.

### Soft 404s in the blog

Four blog URLs in the current live sitemap render a "Post Not Found" page with
**HTTP status 200**. That is a soft 404: Google fetches a page that says the
content does not exist while the server says everything is fine, and it counts
against crawl quality across the site.

Two fixes, both needed:

1. A missing post must return a real **HTTP 404** status with the not-found page.
   In this repo `src/app/blog/[slug]/page.tsx` calls `notFound()` when the post is
   missing, which produces a genuine 404.
2. The sitemap must only list posts the CMS actually returns. `src/app/sitemap.ts`
   wraps `getBlogPosts()` in a `try/catch` and ships **without** blog URLs if the
   CMS is unavailable at build time, rather than listing posts that would render
   as soft 404s.

If a post was deleted deliberately and has an obvious successor, 301 it. If not,
let it 404 and drop it from the sitemap. Do not redirect every dead post to the
blog index — that is another soft 404 in a different costume.

---

## 9. Internal linking

**This is the single highest-value fix in the whole document.** Nothing else here
matters if the route pages cannot be reached.

### The current bug

On the live site, the homepage "Popular bus routes" cards link straight into the
booking flow:

```
Live (wrong):  /booking?from=Delhi&to=Lucknow
Required:      /routes/delhi-to-lucknow
```

The consequence: the route pages are **orphaned**. No page on the site links to
them, so the sitemap is the only route in. Google treats a page nothing links to
as a page nothing vouches for, and orphaned pages accumulate almost no internal
authority no matter how good their content is. The route pages are the pages built
to rank, and they are currently unreachable by a crawler following links.

### Required linking

1. **Every route card links to `/routes/<slug>`.** Homepage, routes hub and the
   related-routes rail all use the same component,
   `src/components/routes/RouteCard.tsx`, whose entire card is a `Link` to
   `/routes/${route.slug}` with the CTA "View times & fares". The booking CTAs
   (`BookingPanel`, `MobileBookBar`, the per-service Book buttons in `Timetable`)
   are what go into the booking flow — that is the correct division: cards to
   content, buttons to checkout.

2. **There must be a `/routes` hub.** `src/app/routes/page.tsx` shows documented
   routes as cards, then **every** route grouped by origin city with the fare or
   "On request" beside each. That hub is what links the 17 undocumented routes,
   so they are crawlable and useful to a customer even though they are `noindex`.

3. **Route pages cross-link.** `relatedRoutes()` in `src/lib/routes.ts` builds the
   rail in a deliberate order:
   1. the **reverse direction** first (`reverseRoute()` — Delhi→Lucknow links to
      Lucknow→Delhi),
   2. then other routes out of the origin (`routesFrom(fromSlug)`),
   3. then other routes into the destination (`routesTo(toSlug)`),
   4. then other routes out of the destination,
   deduplicated, capped at 6, followed by a "View all routes →" link to `/routes`.

4. **Navigation.** `Routes` is in the main nav and in the footer quick links
   (`NAV_LINKS`, `FOOTER_QUICK_LINKS` in `src/lib/constants.ts`).

### Anchor text

Use the route pair: "Delhi to Lucknow", "Delhi to Lucknow bus". Not "click here",
not "book now", not "read more". The related-routes rail and the hub's per-city
lists both use the `{from} to {to}` form.

---

## 10. Booking hand-off

Route pages are content. The moment the user commits, they go to Bitla search.
This is the URL shape taken from the live Bitla site:

```
https://www.rajkalpanatravels.com/search-results
  ?from={fromId}
  &fromCity={From}
  &to={toId}
  &toCity={To}
  &depart={YYYY-MM-DD}
  &pre_postpone=true
```

Worked example — Delhi to Lucknow, departing 12 September 2026:

```
https://www.rajkalpanatravels.com/search-results?from=1&fromCity=Delhi&to=46&toCity=Lucknow&depart=2026-09-12&pre_postpone=true
```

### City IDs

These are Bitla's real IDs, from the live site. Use these, not the operator's
internal numbering and not anything in this repo's mock data.

| City | ID |
|---|---|
| Delhi | 1 |
| Kanpur | 17 |
| Agra | 21 |
| Lucknow | 46 |
| Ujjain | 69 |
| Indore | 70 |
| Chhatarpur | 73 |
| Varanasi | 83 |

### Two live bugs not to reproduce

**1. The date is hard-coded at build time.** The current sample builds the search
link with `date=2026-07-30` baked in. Every visitor gets the same fixed date,
which is in the past for anyone arriving after it, so the search returns nothing
and the user leaves.

`depart` must be **computed per request in `Asia/Kolkata`** — the operator's
timezone, not the server's and not the browser's. A server in UTC rolls the date
over at 05:30 IST, so five and a half hours of Indian evening traffic gets
yesterday's date. Default to today in IST; if the page is served after the last
departure of the night, default to tomorrow.

```
depart = today in Asia/Kolkata, formatted YYYY-MM-DD
```

**2. The city IDs are invented.** The current sample sends `fromId=14&toId=26` for
Delhi→Lucknow. Those are not Bitla's IDs — Delhi is 1 and Lucknow is 46. The
search either errors or returns the wrong pair. Every route page must carry the
correct pair of Bitla IDs, stored against the route, not guessed.

Also note the parameter names differ between the two systems: Bitla's live search
uses `from`/`to`/`fromCity`/`toCity`/`depart`, while this repo's internal mock at
`src/app/search-results/page.tsx` reads `fromId`/`toId`/`fromName`/`toName`/`date`.
Bitla's names are the ones that matter — the mock is scaffolding.

### CTAs that must carry the hand-off

Every one of these, on every route page:

- each service row's Book button (`src/components/routes/Timetable.tsx`, both the
  mobile card and the desktop table)
- the desktop sticky panel's primary button (`BookingPanel.tsx`)
- the mobile sticky bar's Book now button (`MobileBookBar.tsx`)

The WhatsApp and call CTAs beside them prefill a message naming the route
(`Hi, I want to book {From} to {To}. Please share available buses, seats and
fares.`) and dial `+91 9355777632`.

---

## 11. Performance budget

Numbers to hit in the Bitla stack. These are targets, not a list of fixes to this
repository — Bitla rebuilds in its own platform, so what matters is the budget,
not our implementation of it.

### Measured on the current live sample

| Measurement | Current |
|---|---|
| Webfonts | 178 KB across 4 files, 2 families |
| Hero image | JPEG/PNG, not AVIF/WebP; not marked `priority` although it is the LCP element |
| Optimised image caching | `cache-control: max-age=0, must-revalidate` |
| JavaScript | ~165 KB compressed |

### Targets

| Metric | Target |
|---|---|
| Total webfont payload | **under 80 KB** |
| Font families | 2 maximum, `font-display: swap`, `latin` subset only, self-hosted, preloaded |
| Render-blocking third-party | **none** — no synchronous third-party script in `<head>` |
| LCP | **under 2.5 s** on a mid-range 4G phone |
| CLS | **under 0.1** |
| INP | under 200 ms |
| Hero image | preloaded, served as **AVIF or WebP**, explicit `width`/`height`, `fetchpriority="high"` / `priority` |
| Image cache TTL | **at least 30 days** (`cache-control: public, max-age=2592000, immutable`) |
| Popups / interstitials | **none on first load** — no newsletter modal, no offer overlay, no app-install banner |

Notes:

- The four-file, two-family, 178 KB font load is the cheapest win. Two families at
  three or four weights, `latin` subset, self-hosted and preloaded, comes in well
  under 80 KB.
- `max-age=0, must-revalidate` on optimised images means every image is
  revalidated on every navigation. Optimised image derivatives are
  content-addressed and immutable — cache them for at least 30 days.
- LCP on a route page is the hero block. Reserve its space with explicit
  dimensions so the fact strip below does not shift, which is where CLS comes from.
- The sticky mobile book bar is fixed-position and must not push content: reserve
  its height with padding on the page container
  (`pb-28 md:pb-16` in `src/app/routes/[slug]/page.tsx`) rather than letting it
  overlay the last section.
- An interstitial on first load on mobile is treated as an intrusive interstitial
  by Google and suppresses the mobile ranking of the page it covers.

### Fonts: how this repo gets under the budget

Implemented in `src/app/layout.tsx`, and the cheapest of these wins to copy. Both
families load through `next/font/google`, which fetches the font files at build
time and serves them from the site's own origin — so there is no runtime request
to `fonts.googleapis.com` and no render-blocking third-party stylesheet in
`<head>`.

```ts
const inter = Inter({ subsets: ['latin'], weight: ['400', '600'], display: 'swap' });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['700', '800'], display: 'swap' });
```

Only the weights actually used are requested: Inter 400/600 for body text, Plus
Jakarta Sans 700/800 for display headings. That is **4 faces, down from 7**. Every
unused weight is another file on the critical path, and with the `latin`-only
subset and `display: 'swap'` this is what takes the live sample's 178 KB across
4 files under the 80 KB target.

If the Bitla stack has no equivalent of `next/font`, do the same by hand:
self-host the four `.woff2` files, declare them in `@font-face` with
`font-display: swap`, and preload the two used above the fold
(`<link rel="preload" as="font" type="font/woff2" crossorigin>`). Do not link
`fonts.googleapis.com` from `<head>`.

---

## 12. Analytics and tracking

The live sample has **no GA4, no `dataLayer` and no Search Console verification**.
None of the recommendations in this document can be measured until that is fixed.
Install, in this order:

1. Google Search Console, verified on `https://www.rajkalpanatravels.com`, with
   the sitemap submitted.
2. GA4 via Google Tag Manager, with a `dataLayer` initialised before the container.
3. Bing Webmaster Tools (cheap, and it imports from Search Console).

### Required events

| Event | Fires when | Parameters |
|---|---|---|
| `route_page_view` | A `/routes/<slug>` page loads | `route_slug`, `from`, `to`, `lowest_fare`, `services_count`, `documented` |
| `book_now_click` | Any Book CTA is clicked | `route_slug`, `service_name`, `price`, `placement` (`timetable` / `panel` / `mobile_bar`) |
| `whatsapp_click` | A WhatsApp CTA is clicked | `route_slug`, `placement` |
| `call_click` | A `tel:` link is clicked | `route_slug`, `placement` |
| `search_submit` | The search widget is submitted | `from`, `to`, `depart`, `source` (`home` / `route_page`) |
| `enquiry_submit` | Contact or feedback form is submitted successfully | `form` (`contact` / `feedback`), `route_slug` if known |

`route_page_view` carrying the route slug is the one that matters most: it is what
lets you see which corridors earn organic traffic and which of them convert, per
route, rather than one undifferentiated blob of "site traffic".

### `data-track` attributes are already in the markup

The CTAs in this repo carry the event name as a `data-track` attribute, so a
single delegated listener can wire all of them without touching each component:

| File | Line | Attribute |
|---|---|---|
| `src/components/routes/Timetable.tsx` | 85 | `data-track="book_now_click"` (mobile card) |
| `src/components/routes/Timetable.tsx` | 134 | `data-track="book_now_click"` (desktop table) |
| `src/components/routes/BookingPanel.tsx` | 30 | `data-track="book_now_click"` |
| `src/components/routes/BookingPanel.tsx` | 37 | `data-track="whatsapp_click"` |
| `src/components/routes/BookingPanel.tsx` | 48 | `data-track="call_click"` |
| `src/components/routes/MobileBookBar.tsx` | 21 | `data-track="book_now_click"` |
| `src/components/routes/MobileBookBar.tsx` | 28 | `data-track="whatsapp_click"` |
| `src/components/routes/MobileBookBar.tsx` | 39 | `data-track="call_click"` |

Keep the attribute when porting the markup. One document-level click listener
reading `[data-track]` and pushing to `dataLayer` covers every CTA and cannot
drift out of sync the way per-component handlers do.

---

## 13. Content that still needs the operator

Honest list of what is not confirmed. None of this blocks starting the build; all
of it blocks go-live.

| Item | State | Who clears it |
|---|---|---|
| Boarding and dropping points | **Researched, not confirmed.** Every marketed route carries `pointsNeedVerification: true` | Operations, against the live pick-up sheet |
| Fares and schedules | Snapshot of live Bitla inventory, 3 Sep 2026 | Must come from live inventory at build or request time |
| 17 minor-stop routes | Placeholder times and fares inherited from the prototype; `popular: false`, so `noindex` and out of the sitemap | Operations, or fold them into parent routes |
| Photography | **None.** Gallery references `/gallery/*.png` placeholders | Operator — interior and boarding photos have not been shot |
| Social links | Placeholders (`facebook.com/`, `instagram.com/`, …) in `src/lib/constants.ts` | Operator |

Detail:

- **Points.** `src/data/route-points.ts` says it plainly: the locations are
  plausible but not confirmed. `pointsNeedVerification: true` is set on all 12
  marketed routes. A wrong pick-up point is worse than no pick-up point — a
  passenger stands at the wrong crossing at 10 PM. Clear the flag route by route
  with operations before any of this goes live.

- **Fares.** See §4. The `services[]` fares are a September 2026 snapshot. They
  drive the `Offer` price in structured data, so a stale number is a public price
  mismatch, not just an out-of-date page.

- **The 17 minor stops.** `delhi-to-etawah`, `delhi-to-bhind`, `ayodhya-to-lucknow`,
  `lucknow-to-ayodhya`, `chhatarpur-to-delhi`, the Daboh / Udi / Phoop pairs and
  the rest. They render a reduced page with a "Schedule confirmed at booking"
  panel and are correctly `noindex`. Two honest options: give them real inventory
  and full content, or fold each into its parent route as a boarding point and
  delete the page. Leaving 17 thin pages indexed is the worse third option.

- **Photographs.** The gallery reserves the layout for real interior and boarding
  photographs that do not exist yet. Do not ship stock photography of a different
  operator's coach — it is the fastest way to lose the trust the rest of the page
  is trying to build.

---

## 14. Images, accessibility and mobile usability

Small, cheap, and all of them are things the live site currently gets wrong.

### Images

| Rule | Why |
|---|---|
| **Every `<img>` has a real `alt`** describing the image, not the filename. Decorative images get `alt=""`, never a missing attribute. | The live site ships **55 of 123 images with no alt**. It costs image-search traffic and it fails accessibility audits. |
| **Explicit `width` and `height` on every image** | This is where CLS comes from. A route page whose hero has no reserved height pushes the fact strip down as the image arrives. |
| **AVIF or WebP**, with the original as fallback | The live hero is served as JPEG and a gallery image as PNG at 79 KB; the same image in WebP is roughly a quarter of that. |
| **Lazy-load below the fold, eager + `fetchpriority="high"` for the LCP image** | The live hero is `loading="auto"` with no priority, so the browser discovers it late. |
| **Descriptive filenames** — `delhi-lucknow-sleeper-interior.webp`, not `IMG_2043.png` | Free image-search signal. |

Route pages should carry at least one real coach photograph once photography
exists (§13). Until then, do not fill the space with stock images of another
operator's bus.

### Accessibility and mobile usability

| Rule | Detail |
|---|---|
| **Touch targets at least 44×44 px** | Google's mobile-usability threshold is 48 px with 8 px spacing. The live site renders the header phone number, footer links, "View All Routes" and "View Details" at **20–24 px tall**. This repo fixes it with `min-h-11` on those links and a `@media (max-width: 767px)` rule in `src/app/globals.css`. |
| **Exactly one `<h1>` per page** | The route `<h1>` is `{From} to {To} Bus`. Section headings are `<h2>`, sub-sections `<h3>`. Do not skip levels. |
| **`lang="en-IN"` on `<html>`** | Set in `src/app/layout.tsx`. The live site uses `lang="en"`. |
| **Visible keyboard focus** | Do not remove the focus ring. Every CTA on a route page is reachable and operable by keyboard. |
| **Colour contrast at least 4.5:1** for body text | The navy-on-white and white-on-navy pairings in this repo pass; check any new combination before shipping it. |
| **No horizontal scroll at 320 px width** | The timetable is cards on mobile and a table on desktop precisely for this reason (§5). Verified: `scrollWidth === clientWidth` at 390 px. |
| **The sticky mobile bar must not cover content** | Reserve its height with bottom padding on the page container, not by overlaying the last section. |

---

## 15. Launch QA — how to tell it is done

Run these against the staging build before go-live. Each one is objectively
pass/fail, so there is no argument about whether an item is complete.

### Crawl and indexing

- [ ] Every `/routes/{slug}` page returns **200** and is reachable by following
      links from the homepage — not only from the sitemap.
- [ ] `<title>` is **unique on every page**. Crawl the site and sort by title; zero
      duplicates.
- [ ] No title contains "Raj Kalpana Travels" twice.
- [ ] Every indexable page has a **self-referencing canonical** on
      `https://www.rajkalpanatravels.com`, with no trailing slash.
- [ ] Every page has exactly **one `<h1>`**.
- [ ] `sitemap.xml` contains only URLs that return 200, are self-canonical and are
      `index, follow`. Documented routes only — 12 today, not 29.
- [ ] `/search-results` returns `noindex` **and** is disallowed in `robots.txt`.
- [ ] Routes failing `isDocumented()` return `noindex` and are absent from the
      sitemap.
- [ ] A missing blog post returns a real **HTTP 404**, not a 200 with
      "Post Not Found".

### Redirects (§3)

- [ ] Every URL in the live sitemap and every `.html` page 301s to its new
      equivalent in **one hop**.
- [ ] `/routes-directory/Delhi-to-Lucknow/` → `/routes/delhi-to-lucknow`, 301,
      one hop. Test the lowercase and no-trailing-slash variants too.
- [ ] `http://` → `https://` and non-`www` → `www`, one hop, no chain.
- [ ] No redirect chain anywhere is longer than one hop. Crawl with redirect
      chains reported.

### Structured data

- [ ] Every documented route page passes the
      [Rich Results Test](https://search.google.com/test/rich-results) with
      `BusTrip`, `FAQPage` and `BreadcrumbList` detected and **zero errors**.
- [ ] No `Offer` appears on an undocumented route page.
- [ ] The `Offer` price equals the lowest fare actually shown in the timetable on
      the same page.
- [ ] FAQ answer text in the JSON-LD is identical to the visible answer text.

### Booking hand-off (§10)

- [ ] Clicking Book on `/routes/delhi-to-lucknow` lands on Bitla search with
      `from=1`, `to=46` and **today's date in `Asia/Kolkata`** — verify after
      00:00 IST, when a UTC server would still be sending yesterday.
- [ ] Every Book CTA on the page carries the hand-off: each timetable row, the
      desktop panel, the mobile bar.
- [ ] The WhatsApp CTA opens with the route named in the prefilled message.
- [ ] Complete one real booking end to end on a phone.

### Performance (§11)

- [ ] PageSpeed Insights on `/routes/delhi-to-lucknow`, **mobile**: LCP under
      2.5 s, CLS under 0.1, INP under 200 ms.
- [ ] Total webfont payload under 80 KB.
- [ ] No popup, modal or app-install interstitial on first load.
- [ ] Images served as AVIF/WebP with a cache TTL of at least 30 days.

### Analytics (§12)

- [ ] Search Console verified on the `https://www.` property, sitemap submitted.
- [ ] GA4 receives `route_page_view` with the route slug on a route page.
- [ ] `book_now_click`, `whatsapp_click` and `call_click` fire with the route slug
      and placement.

### Content (§13)

- [ ] `pointsNeedVerification` cleared with operations on all 12 marketed routes.
- [ ] Fares and timetables come from live inventory, not a file.
- [ ] The 17 minor-stop routes are either built out or folded into their parent
      routes.
- [ ] Real photographs in place, each with alt text.

---

## Implementation checklist

Order matters — the first four are worth more than the rest combined.

1. **Build the 301 map from every live URL before launch**, not after. The
   rankings the site already has are not recoverable once they are dropped. (§3)
2. Route cards link to `/routes/<slug>`, not `/booking?from=…&to=…`. Build the
   `/routes` hub. Cross-link the reverse direction. (§9)
3. Remove the brand from page titles; let `title.template` append it once. (§6)
4. Self-referencing canonicals on the `https://www.` host, one 301 hop for every
   other host, case and slash variant. (§6)
5. One page per direction at `/routes/{from}-to-{to}`; `/search-results` noindex
   and disallowed. (§2, §8)
6. Aggregate every coach on a pair into `services[]`; render the full timetable
   server-side. (§4, §5)
7. `BreadcrumbList` + `FAQPage` + `BusTrip`/`Offer` on documented routes only;
   never a placeholder price. (§7)
8. Sitemap contains only indexable, self-canonical, 200-returning URLs; missing
   blog posts return a real 404. (§8)
9. Booking hand-off with correct Bitla city IDs and a date computed per request in
   `Asia/Kolkata`. (§10)
10. Fonts under 80 KB, hero as AVIF/WebP and preloaded, image cache TTL 30 days,
    no first-load interstitial. (§11)
11. GA4 + GTM + Search Console; wire the `[data-track]` CTAs. (§12)
12. Clear `pointsNeedVerification` with operations; wire fares to live inventory;
    resolve the 17 minor-stop routes; shoot the photographs. (§13)
13. Alt text on every image, 44 px touch targets, one `<h1>` per page. (§14)
14. Work the launch QA list before go-live — every item is objectively
    pass/fail. (§15)

---

## Questions

Every claim in this document is traceable to a named file in this repository.
If something here conflicts with what the Bitla platform can do, come back with
the **section number and the file path** and we will resolve it against the code
rather than in the abstract.

Three things in this document are not negotiable without changing the outcome we
are contracted for, and they are worth flagging early rather than at launch:
the route URL structure (§2), the 301 map (§3), and route cards linking to route
pages rather than into the booking flow (§9). Everything else has room to move.
