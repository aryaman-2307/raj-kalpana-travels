import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import HeroSection from '@/components/home/HeroSection';
import SearchWidget from '@/components/home/SearchWidget';
import TrustBadges from '@/components/home/TrustBadges';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import AboutPreview from '@/components/home/AboutPreview';
import StatsCounter from '@/components/home/StatsCounter';
import HowItWorks from '@/components/home/HowItWorks';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import GalleryPreview from '@/components/home/GalleryPreview';
import TopRoutes from '@/components/home/TopRoutes';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import OffersPreview from '@/components/home/OffersPreview';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = generatePageMetadata(
  'Online Bus Ticket Booking | AC Sleeper Buses',
  'Book Bharat Benz 2+1 AC sleeper bus tickets from Delhi to Lucknow, Varanasi, Indore, Kanpur, Ujjain and Agra. Nightly departures, live GPS tracking, fares from ₹500.',
  '/'
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <SearchWidget />
      </div>
      <TrustBadges />
      {/* Popular routes sit directly under the search box: this is the section
          people came for, and it is the only path to the /routes/<slug> pages
          Google ranks. It used to be tenth of thirteen, ~9,000px down a phone. */}
      <TopRoutes />
      {/* The three value-proposition sections run consecutively so they read as
          one argument instead of three restatements spread down the page. */}
      <FeaturesGrid />
      <WhyChooseUs />
      <AboutPreview />
      <HowItWorks />
      <GalleryPreview />
      <StatsCounter />
      <TestimonialsSection />
      <OffersPreview />
      <CTABanner />
    </>
  );
}
