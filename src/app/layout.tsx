import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import TopContactBar from '@/components/layout/TopContactBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const COMPANY_NAME = 'Raj Kalpana Travels Pvt. Ltd.';
const COMPANY_TAGLINE = 'Your Destination Partner';
const BASE_URL = 'https://rajkalpanatravels.com';

export const metadata: Metadata = {
  title: {
    template: '%s | Raj Kalpana Travels',
    default: `${COMPANY_NAME} — ${COMPANY_TAGLINE}`,
  },
  description:
    'Book affordable and comfortable bus tickets with Raj Kalpana Travels. Trusted by 10 Lakh+ travelers across 50+ cities. RTO certified fleet, live tracking, and 24/7 support.',
  keywords: [
    'bus booking',
    'bus tickets',
    'Raj Kalpana Travels',
    'Delhi bus',
    'Lucknow bus',
    'online bus booking',
    'sleeper bus',
    'AC bus',
    'bus travel India',
  ],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: COMPANY_NAME,
    title: `${COMPANY_NAME} — ${COMPANY_TAGLINE}`,
    description:
      'Book affordable and comfortable bus tickets with Raj Kalpana Travels. Trusted by 10 Lakh+ travelers.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: COMPANY_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY_NAME} — ${COMPANY_TAGLINE}`,
    description:
      'Book affordable and comfortable bus tickets with Raj Kalpana Travels. Trusted by 10 Lakh+ travelers.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    'Raj Kalpana Travels Pvt. Ltd. offers affordable and comfortable bus booking services across India.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ground Floor, Shop No. 52, Gokhle Market, Tis Hazari',
    addressLocality: 'Delhi',
    addressRegion: 'Delhi',
    postalCode: '110054',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9355777632',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <TopContactBar />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
