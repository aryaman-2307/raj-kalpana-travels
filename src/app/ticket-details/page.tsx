import Link from 'next/link';

export default function TicketDetailsPage() {
  return (
    <section className="min-h-screen bg-[#F8FAFC] py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-[#0F2B5B] to-[#1A3D7C] text-white p-8 text-center">
            <p className="text-xs uppercase tracking-widest text-[#F59E0B] mb-2">E-Ticket</p>
            <h1 className="text-3xl font-bold font-[family-name:var(--font-plus-jakarta-sans)]">Raj Kalpana Travels</h1>
            <p className="text-white/70 mt-1 text-sm">Your Destination Partner</p>
          </div>
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between text-center">
              <div><p className="text-2xl font-bold text-[#1E293B]">Delhi</p><p className="text-sm text-[#64748B]">20:00</p></div>
              <div className="flex-1 flex flex-col items-center"><span className="text-xs text-[#64748B]">8h 30m</span><div className="w-3/4 border-t-2 border-dashed border-[#E2E8F0] my-1" /><svg className="w-5 h-5 text-[#E53935]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></div>
              <div><p className="text-2xl font-bold text-[#1E293B]">Lucknow</p><p className="text-sm text-[#64748B]">04:30</p></div>
            </div>
            <hr className="border-[#E2E8F0] border-dashed" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-[#64748B]">PNR</span><p className="font-semibold text-[#1E293B]">RKT2025XYZ</p></div>
              <div><span className="text-[#64748B]">Status</span><p className="font-semibold text-green-600">Confirmed</p></div>
              <div><span className="text-[#64748B]">Date</span><p className="font-semibold text-[#1E293B]">15 Jun 2025</p></div>
              <div><span className="text-[#64748B]">Bus Type</span><p className="font-semibold text-[#1E293B]">Bharat Benz Semi Sleeper AC</p></div>
              <div><span className="text-[#64748B]">Seat</span><p className="font-semibold text-[#1E293B]">L-12</p></div>
              <div><span className="text-[#64748B]">Amount Paid</span><p className="font-semibold text-[#E53935]">₹899</p></div>
            </div>
            <p className="text-xs text-[#64748B] bg-[#F8FAFC] rounded-lg p-4 italic">
              This is a demo ticket. Real ticket data requires backend integration.
            </p>
            <div className="flex gap-3">
              <Link href="/manage-bookings" className="flex-1 py-3 text-center border-2 border-[#0F2B5B] text-[#0F2B5B] rounded-xl font-semibold hover:bg-[#0F2B5B] hover:text-white transition-colors">Manage Booking</Link>
              <Link href="/" className="flex-1 py-3 text-center bg-gradient-to-r from-[#E53935] to-[#C62828] text-white rounded-xl font-semibold hover:shadow-lg transition-all">Go Home</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
