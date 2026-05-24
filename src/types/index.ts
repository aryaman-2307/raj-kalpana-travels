// ─── Domain Models ───────────────────────────────────────────────────────────

export interface Route {
  id: string;
  slug: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  busType: string;
  amenities: string[];
  price: number;
  available: boolean;
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
