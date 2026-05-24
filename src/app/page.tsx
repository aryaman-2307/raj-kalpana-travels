import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Online Bus Ticket Booking | Raj Kalpana Travels Pvt. Ltd.',
  description:
    'Book affordable and comfortable bus tickets online with Raj Kalpana Travels. Trusted by 10 Lakh+ travelers. Live tracking, premium sleeper coaches, 24/7 support across 50+ cities.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <SearchWidget />
      </div>
      <TrustBadges />
      <FeaturesGrid />
      <AboutPreview />
      <StatsCounter />
      <HowItWorks />
      <WhyChooseUs />
      <GalleryPreview />
      <TopRoutes />
      <TestimonialsSection />
      <OffersPreview />
      <CTABanner />
    </>
  );
}
