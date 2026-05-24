'use client';

import { useState } from 'react';

export default function ManageBookingsPage() {
  const [pnr, setPnr] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | 'found'>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!pnr || pnr.length < 6) { setError('PNR must be at least 6 characters.'); return; }
    if (!/^\d{10}$/.test(phone)) { setError('Phone must be 10 digits.'); return; }
    setLoading(true);
    // TODO: POST to /api/bookings/lookup
    setTimeout(() => { setLoading(false); setResult('found'); }, 1500);
  }

  return (
    <section className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-gradient-to-br from-[#0F2B5B] to-[#1A3D7C] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-plus-jakarta-sans)]">Manage Bookings</h1>
          <p className="mt-3 text-white/70">Look up your booking details using PNR and phone number.</p>
        </div>
      </div>
      <div className="max-w-lg mx-auto px-4 sm:px-6 -mt-8 relative z-10 pb-20">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]" noValidate>
          <div className="space-y-5">
            <div>
              <label htmlFor="mb-pnr" className="block text-sm font-semibold text-[#1E293B] mb-2">PNR Number</label>
              <input id="mb-pnr" type="text" value={pnr} onChange={(e) => setPnr(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))} maxLength={20} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" placeholder="Enter your PNR number" />
            </div>
            <div>
              <label htmlFor="mb-phone" className="block text-sm font-semibold text-[#1E293B] mb-2">Registered Phone</label>
              <input id="mb-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" placeholder="10-digit phone number" />
            </div>
            {error && <p className="text-[#E53935] text-sm" role="alert" aria-live="polite">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all">
              {loading ? 'Looking up...' : 'Find My Booking'}
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-8 bg-white rounded-2xl border border-[#E2E8F0] p-8" aria-live="polite">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">Booking Details (Demo)</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[#64748B]">PNR</span><span className="font-semibold">{pnr}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Status</span><span className="font-semibold text-green-600">Confirmed</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Route</span><span className="font-semibold">Delhi → Lucknow</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Date</span><span className="font-semibold">2025-06-15</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Bus</span><span className="font-semibold">Bharat Benz Semi Sleeper AC</span></div>
              <p className="text-xs text-[#64748B] mt-4 italic">This is mock data. Actual booking lookup requires backend integration.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
