import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata('Terms and Conditions', 'Terms and conditions for using Raj Kalpana Travels bus booking services.', '/terms-and-conditions');

export default function TermsPage() {
  return (
    <section className="min-h-screen bg-[#F8FAFC] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#1E293B] font-[family-name:var(--font-plus-jakarta-sans)] mb-8">Terms and Conditions</h1>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 md:p-12 prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-plus-jakarta-sans)] prose-headings:text-[#1E293B]">
          <p className="text-sm text-[#64748B]">Last updated: January 2025</p>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using the Raj Kalpana Travels website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
          <h2>2. Services</h2>
          <p>Raj Kalpana Travels Pvt. Ltd. provides online bus ticket booking, scheduling information, and related travel services. All bookings are subject to availability and confirmation.</p>
          <h2>3. Booking and Payment</h2>
          <ul>
            <li>All prices displayed are in Indian Rupees (₹) and include applicable taxes unless stated otherwise.</li>
            <li>Payment must be completed at the time of booking.</li>
            <li>A booking is confirmed only after successful payment and receipt of a confirmed e-ticket.</li>
            <li>We accept UPI, credit/debit cards, net banking, and digital wallets.</li>
          </ul>
          <h2>4. Passenger Responsibilities</h2>
          <ul>
            <li>Passengers must carry a valid photo ID during travel.</li>
            <li>Arrive at the boarding point at least 15 minutes before departure.</li>
            <li>Raj Kalpana Travels is not liable for missed buses due to late arrival.</li>
            <li>Passengers are responsible for their personal belongings.</li>
          </ul>
          <h2>5. Luggage Policy</h2>
          <p>Each passenger is allowed one piece of luggage (up to 15 kg) and one small carry-on bag. Excess luggage may incur additional charges.</p>
          <h2>6. Liability</h2>
          <p>Raj Kalpana Travels shall not be liable for delays or cancellations caused by weather, road conditions, mechanical issues, or other force majeure events. We will make reasonable efforts to notify passengers and arrange alternatives.</p>
          <h2>7. Dispute Resolution</h2>
          <p>Any disputes shall be subject to the jurisdiction of courts in Delhi, India.</p>
          <h2>8. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Updated terms will be posted on this page.</p>
        </div>
      </div>
    </section>
  );
}
