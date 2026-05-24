import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata('Cancellation & Refund Policy', 'Cancellation and refund policy for bus bookings with Raj Kalpana Travels. Learn about timelines, charges, and the refund process.', '/cancellation-refund-policy');

export default function CancellationRefundPolicyPage() {
  return (
    <section className="min-h-screen bg-[#F8FAFC] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#1E293B] font-[family-name:var(--font-plus-jakarta-sans)] mb-8">Cancellation & Refund Policy</h1>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 md:p-12 prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-plus-jakarta-sans)] prose-headings:text-[#1E293B]">
          <p className="text-sm text-[#64748B]">Last updated: January 2025</p>

          <h2>Cancellation Charges</h2>
          <p>Cancellation charges depend on when you cancel relative to the departure time:</p>

          <div className="not-prose overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#0F2B5B] text-white">
                  <th className="text-left px-4 py-3 rounded-tl-lg">Cancellation Time</th>
                  <th className="text-right px-4 py-3 rounded-tr-lg">Cancellation Charge</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#E2E8F0]">
                  <td className="px-4 py-3">More than 24 hours before departure</td>
                  <td className="px-4 py-3 text-right font-semibold text-green-600">10% of ticket price</td>
                </tr>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <td className="px-4 py-3">12–24 hours before departure</td>
                  <td className="px-4 py-3 text-right font-semibold text-amber-600">25% of ticket price</td>
                </tr>
                <tr className="border-b border-[#E2E8F0]">
                  <td className="px-4 py-3">4–12 hours before departure</td>
                  <td className="px-4 py-3 text-right font-semibold text-orange-600">50% of ticket price</td>
                </tr>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <td className="px-4 py-3">Less than 4 hours before departure</td>
                  <td className="px-4 py-3 text-right font-semibold text-[#E53935]">100% (No refund)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">After departure / No-show</td>
                  <td className="px-4 py-3 text-right font-semibold text-[#E53935]">100% (No refund)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Refund Process</h2>
          <ul>
            <li>Refunds are processed within <strong>5–7 business days</strong> from the date of cancellation.</li>
            <li>Refunds are credited to the original payment method.</li>
            <li>For UPI/wallet payments, refunds are usually faster (1-3 business days).</li>
            <li>Bank/card refunds may take up to 10 business days depending on your bank.</li>
          </ul>

          <h2>How to Cancel</h2>
          <ol>
            <li>Visit the <a href="/booking-cancel" className="text-[#E53935]">Cancel Booking</a> page.</li>
            <li>Enter your PNR number and reason for cancellation.</li>
            <li>Confirm the cancellation. The refund amount will be shown before confirmation.</li>
            <li>Alternatively, call our support at <a href="tel:9355777632" className="text-[#E53935]">9355777632</a>.</li>
          </ol>

          <h2>Exceptions</h2>
          <ul>
            <li>If a bus is cancelled by Raj Kalpana Travels due to operational reasons, a <strong>full refund</strong> will be provided.</li>
            <li>In case of natural disasters or government-imposed restrictions, we will offer rescheduling or full refund.</li>
          </ul>

          <h2>Contact</h2>
          <p>For refund-related queries, email <a href="mailto:Info@rajkalpanatravels.com" className="text-[#E53935]">Info@rajkalpanatravels.com</a> or call <a href="tel:9355777632" className="text-[#E53935]">9355777632</a>.</p>
        </div>
      </div>
    </section>
  );
}
