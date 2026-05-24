import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Gallery — Raj Kalpana Travels',
  'Browse photos of our modern bus fleet, comfortable interiors, spacious seats, and memorable travel experiences across North India.',
  '/gallery'
);

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
