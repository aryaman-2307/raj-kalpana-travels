import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Contact Us — Raj Kalpana Travels',
  'Get in touch with Raj Kalpana Travels. Call us, email us, or send a message. Our support team is available 24/7.',
  '/contact'
);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
