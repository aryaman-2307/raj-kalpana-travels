import { z } from 'zod';

// ─── Search Form ─────────────────────────────────────────────────────────────

export const searchFormSchema = z
  .object({
    from: z.string().min(1, 'Please select a departure city'),
    to: z.string().min(1, 'Please select a destination city'),
    date: z.string().min(1, 'Please select a travel date').refine(
      (val) => {
        const selected = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
      },
      { message: 'Travel date cannot be in the past' }
    ),
  })
  .refine((data) => data.from !== data.to, {
    message: 'Departure and destination cities cannot be the same',
    path: ['to'],
  });

// ─── Contact Form ────────────────────────────────────────────────────────────

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  subject: z
    .string()
    .min(2, 'Subject must be at least 2 characters')
    .max(200, 'Subject must be at most 200 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be at most 2000 characters'),
});

// ─── Feedback Form ───────────────────────────────────────────────────────────

export const feedbackFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  journeyDate: z.string().min(1, 'Please select your journey date'),
  pnr: z
    .string()
    .regex(/^[A-Za-z0-9]{6,20}$/, 'PNR must be 6–20 alphanumeric characters')
    .optional()
    .or(z.literal('')),
  rating: z
    .number()
    .int('Rating must be a whole number')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  message: z
    .string()
    .min(10, 'Please share at least 10 characters of feedback')
    .max(2000, 'Feedback must be at most 2000 characters'),
});

// ─── Login Form ──────────────────────────────────────────────────────────────

export const loginFormSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, 'Please enter your email or phone number')
    .refine(
      (val) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        const isPhone = /^\d{10}$/.test(val);
        return isEmail || isPhone;
      },
      { message: 'Enter a valid email address or 10-digit phone number' }
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
});

// ─── Agent Registration ──────────────────────────────────────────────────────

export const agentRegistrationSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be at most 100 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z
      .string()
      .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    agencyName: z
      .string()
      .min(2, 'Agency name must be at least 2 characters')
      .max(200, 'Agency name must be at most 200 characters'),
    city: z.string().min(1, 'Please select your city'),
    state: z.string().min(1, 'Please select your state'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ─── Booking Lookup ──────────────────────────────────────────────────────────

export const bookingLookupSchema = z.object({
  pnr: z
    .string()
    .regex(
      /^[A-Za-z0-9]{6,20}$/,
      'PNR must be 6–20 alphanumeric characters'
    ),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
});

// ─── Tracking Form ───────────────────────────────────────────────────────────

export const trackingFormSchema = z.object({
  trackingNumber: z
    .string()
    .regex(
      /^[A-Za-z0-9]{6,20}$/,
      'Tracking number must be 6–20 alphanumeric characters'
    ),
});

// ─── Newsletter ──────────────────────────────────────────────────────────────

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// ─── Phone Booking ───────────────────────────────────────────────────────────

export const phoneBookingSchema = z.object({
  bookingId: z
    .string()
    .min(1, 'Booking ID is required')
    .max(20, 'Booking ID must be at most 20 characters'),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
});

// ─── Inferred Types ──────────────────────────────────────────────────────────

export type SearchFormValues = z.infer<typeof searchFormSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;
export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type AgentRegistrationValues = z.infer<typeof agentRegistrationSchema>;
export type BookingLookupValues = z.infer<typeof bookingLookupSchema>;
export type TrackingFormValues = z.infer<typeof trackingFormSchema>;
export type NewsletterValues = z.infer<typeof newsletterSchema>;
export type PhoneBookingValues = z.infer<typeof phoneBookingSchema>;
