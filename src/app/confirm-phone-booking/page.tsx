'use client';

import { useState } from 'react';

export default function ConfirmPhoneBookingPage() {
  const [bookingId, setBookingId] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!bookingId) { setError('Booking ID is required.'); return; }
    if (!/^\d{10}$/.test(phone)) { setError('Phone must be 10 digits.'); return; }
    if (!name || name.length < 2) { setError('Name is required.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1500);
  }

  if (done) return (
    <section className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-[#1E293B] mb-3">Phone Booking Confirmed!</h1>
        <p className="text-[#64748B]">Your phone booking has been confirmed. You will receive an SMS with your e-ticket. (Demo)</p>
      </div>
    </section>
  );

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-20">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-[#1E293B] text-center mb-2 font-[family-name:var(--font-plus-jakarta-sans)]">Confirm Phone Booking</h1>
        <p className="text-[#64748B] text-center mb-8">Confirm a booking made over phone call.</p>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm space-y-5" noValidate>
          <div>
            <label htmlFor="cpb-id" className="block text-sm font-semibold text-[#1E293B] mb-2">Booking ID</label>
            <input id="cpb-id" type="text" value={bookingId} onChange={(e) => setBookingId(e.target.value)} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" placeholder="Enter booking ID" />
          </div>
          <div>
            <label htmlFor="cpb-phone" className="block text-sm font-semibold text-[#1E293B] mb-2">Phone Number</label>
            <input id="cpb-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" placeholder="10-digit phone" />
          </div>
          <div>
            <label htmlFor="cpb-name" className="block text-sm font-semibold text-[#1E293B] mb-2">Passenger Name</label>
            <input id="cpb-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" placeholder="Full name" />
          </div>
          {error && <p className="text-[#E53935] text-sm" role="alert" aria-live="polite">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all">
            {loading ? 'Confirming...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </section>
  );
}
