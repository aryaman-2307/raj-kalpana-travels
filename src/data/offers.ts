// NOTE: Mock data for display only. These are NOT real coupon codes.
// Real offers and validation must be handled by the backend.

import type { Offer } from '@/types';

export const OFFERS: Offer[] = [
  {
    id: 'offer-01',
    title: 'First Ride Discount',
    description:
      'New to Raj Kalpana Travels? Get a flat 15% off on your very first booking. Register and book today!',
    code: 'FIRST15',
    discount: '15% off (up to ₹250)',
    validUntil: '2026-03-31',
    terms:
      'Valid for new users only. Applicable on the first booking made through the website or app. Maximum discount of ₹250. Cannot be combined with other offers.',
  },
  {
    id: 'offer-02',
    title: 'App Booking Offer',
    description:
      'Book through our mobile app and enjoy an exclusive 10% discount on every trip. Download now and save!',
    code: 'APP10',
    discount: '10% off (up to ₹200)',
    validUntil: '2026-06-30',
    terms:
      'Applicable on bookings made via the official Raj Kalpana Travels mobile app only. Maximum discount of ₹200 per transaction. Valid once per user per month.',
  },
  {
    id: 'offer-03',
    title: 'Festival Season Special',
    description:
      'Celebrate the festive season with 20% off on all AC Sleeper routes. Limited period offer — book early!',
    code: 'FESTIVE20',
    discount: '20% off (up to ₹400)',
    validUntil: '2026-01-15',
    terms:
      'Valid on AC Sleeper and Premium Sleeper bus types only. Maximum discount of ₹400. Travel must be completed within the offer validity period. Subject to seat availability.',
  },
  {
    id: 'offer-04',
    title: 'Group Booking Discount',
    description:
      'Travelling with friends or family? Book 4 or more seats together and get a flat ₹500 off your total fare.',
    code: 'GROUP500',
    discount: 'Flat ₹500 off',
    validUntil: '2026-12-31',
    terms:
      'Minimum 4 seats must be booked in a single transaction on the same bus. Discount applied on the total fare. Cannot be combined with other offers. Valid on all routes.',
  },
];
