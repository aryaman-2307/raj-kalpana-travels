import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Frequently Asked Questions — Raj Kalpana Travels',
  'Get answers to common questions about booking, payments, cancellations, refunds, luggage, and travelling with Raj Kalpana Travels.',
  '/faqs'
);

export default function FAQsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
