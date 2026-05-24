import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata('Privacy Policy', 'Privacy policy for Raj Kalpana Travels Pvt. Ltd. — how we collect, use, and protect your personal information.', '/privacy-policy');

export default function PrivacyPolicyPage() {
  return (
    <section className="min-h-screen bg-[#F8FAFC] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#1E293B] font-[family-name:var(--font-plus-jakarta-sans)] mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 md:p-12 prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-plus-jakarta-sans)] prose-headings:text-[#1E293B]">
          <p className="text-sm text-[#64748B]">Last updated: January 2025</p>
          <h2>1. Information We Collect</h2>
          <p>When you use our services, we may collect the following information:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, and address provided during booking or registration.</li>
            <li><strong>Booking Information:</strong> Travel dates, routes, seat preferences, and payment details.</li>
            <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on our website.</li>
          </ul>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>Process and confirm bus ticket bookings</li>
            <li>Send booking confirmations, e-tickets, and travel updates via SMS/email</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Improve our services and website experience</li>
            <li>Comply with legal obligations</li>
          </ul>
          <h2>3. Data Protection</h2>
          <p>We implement industry-standard security measures to protect your personal data, including encrypted connections (SSL/TLS), secure server infrastructure, and access controls. We do not store credit/debit card details on our servers.</p>
          <h2>4. Information Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share data with:</p>
          <ul>
            <li>Payment processors for secure payment handling</li>
            <li>SMS/email service providers for sending notifications</li>
            <li>Law enforcement if required by law</li>
          </ul>
          <h2>5. Cookies</h2>
          <p>Our website uses cookies to enhance your browsing experience. You can control cookie settings through your browser preferences.</p>
          <h2>6. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. Contact us at <a href="mailto:Info@rajkalpanatravels.com" className="text-[#E53935]">Info@rajkalpanatravels.com</a> for any privacy-related requests.</p>
          <h2>7. Contact Us</h2>
          <p>For privacy concerns, contact us at:</p>
          <p>Raj Kalpana Travels Pvt. Ltd.<br />Ground Floor, Shop No. 52, Gokhle Market, Tis Hazari, Delhi-110054<br />Email: Info@rajkalpanatravels.com<br />Phone: 9355777632</p>
        </div>
      </div>
    </section>
  );
}
