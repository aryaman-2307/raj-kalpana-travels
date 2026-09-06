// ─── Domain Models ───────────────────────────────────────────────────────────

/**
 * One scheduled coach on a route, as it appears on the ticket.
 *
 * LIVE DATA. In production every field here comes from the Bitla booking system,
 * not from a file. The values committed in data/routes.ts are a 3 Sep 2026
 * snapshot for design reference only. See BITLA-HANDOVER.md §3.
 */
export interface RouteService {
  /** Operator service name, e.g. "Delhi-Lucknow 104" */
  name: string;
  /** 24h clock, e.g. "22:30" */
  departureTime: string;
  arrivalTime: string;
  /** e.g. "8h 00m" */
  duration: string;
  busType: string;
  /** Lowest berth fare in INR on a normal weekday */
  price: number;
}

/** A boarding or dropping point with its landmark and approximate time. */
export interface RoutePoint {
  name: string;
  landmark: string;
  /** 24h clock, or "On request" */
  time: string;
}

export interface RouteFaq {
  question: string;
  answer: string;
}

export interface Route {
  id: string;
  slug: string;
  from: string;
  to: string;
  /** Lowercase city slugs, used for city hubs and cross-linking */
  fromSlug: string;
  toSlug: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  busType: string;
  amenities: string[];
  price: number;
  available: boolean;

  // ─── SEO fields. Required on marketed routes; a route without them
  //     renders a reduced page and should be noindex until filled in. ───

  /** Road distance in km */
  distanceKm?: number;
  /** Highways / expressways used, e.g. "Yamuna Expressway - Agra-Lucknow Expressway" */
  via?: string;
  /**
   * Every coach that runs this exact pair. Drives the timetable, the fact strip,
   * the lowest-fare and fastest badges, and the Offer price in structured data.
   *
   * LIVE — fetch from the booking system. When it comes back empty the page must
   * degrade rather than break: see BITLA-HANDOVER.md §3, "When live inventory
   * returns nothing for a route".
   */
  services?: RouteService[];
  boardingPoints?: RoutePoint[];
  droppingPoints?: RoutePoint[];
  /**
   * Boarding and dropping points are plausible but must be confirmed with
   * operations before go-live. Never ship a route with this still true.
   */
  pointsNeedVerification?: boolean;
  /** 140-200 words, exactly two paragraphs separated by a blank line. */
  description?: string;
  /** 4-6 scannable one-line facts, each under 90 characters. */
  highlights?: string[];
  /** Target queries for this page. Documentation for writers, not output. */
  keywords?: string[];
  /** Marketed route: gets full content, sitemap priority and homepage placement. */
  popular?: boolean;
}

export interface City {
  name: string;
  state: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'exterior' | 'interior' | 'seats' | 'travel';
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  validUntil: string;
  terms: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  date: string;
  categories: string[];
}

export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time';
  description: string;
  requirements: string[];
}

// ─── Form Data Shapes ────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface FeedbackFormData {
  name: string;
  email: string;
  phone: string;
  journeyDate: string;
  pnr?: string;
  rating: number;
  message: string;
}

export interface SearchFormData {
  from: string;
  to: string;
  date: string;
}

export interface LoginFormData {
  emailOrPhone: string;
  password: string;
}

export interface AgentRegistrationData {
  name: string;
  email: string;
  phone: string;
  agencyName: string;
  city: string;
  state: string;
  password: string;
  confirmPassword: string;
}

export interface BookingLookupData {
  pnr: string;
  phone: string;
}

export interface TrackingFormData {
  trackingNumber: string;
}

export interface NewsletterData {
  email: string;
}

export interface PhoneBookingData {
  bookingId: string;
  phone: string;
  name: string;
}
