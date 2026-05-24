import Link from 'next/link';

export default function BookingConfirmPage() {
  return (
    <section className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-8">
          <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] font-[family-name:var(--font-plus-jakarta-sans)] mb-4">Booking Confirmed!</h1>
        <p className="text-[#64748B] mb-2">Your booking has been successfully confirmed.</p>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 my-8 text-left text-sm space-y-3">
          <div className="flex justify-between"><span className="text-[#64748B]">PNR</span><span className="font-bold">RKT2025ABC</span></div>
          <div className="flex justify-between"><span className="text-[#64748B]">Route</span><span className="font-bold">Delhi → Lucknow</span></div>
          <div className="flex justify-between"><span className="text-[#64748B]">Date</span><span className="font-bold">15 Jun 2025</span></div>
          <div className="flex justify-between"><span className="text-[#64748B]">Amount</span><span className="font-bold text-[#E53935]">₹899</span></div>
          <p className="text-xs text-[#64748B] italic pt-2">Demo data. Real bookings require backend.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/ticket-details" className="px-8 py-3 bg-[#0F2B5B] text-white rounded-full font-semibold hover:bg-[#1A3D7C] transition-colors">View Ticket</Link>
          <Link href="/" className="px-8 py-3 border-2 border-[#0F2B5B] text-[#0F2B5B] rounded-full font-semibold hover:bg-[#0F2B5B] hover:text-white transition-colors">Go Home</Link>
        </div>
      </div>
    </section>
  );
}
