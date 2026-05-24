'use client';

import { useState } from 'react';

export default function BookingCancelPage() {
  const [pnr, setPnr] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pnr || pnr.length < 6) { setError('Enter a valid PNR (min 6 characters).'); return; }
    if (!reason) { setError('Please select a reason for cancellation.'); return; }
    setError('');
    setLoading(true);
    // TODO: POST to /api/bookings/cancel
    setTimeout(() => { setLoading(false); setDone(true); }, 1500);
  }

  if (done) return (
    <section className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-6">
          <svg className="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-[#1E293B] mb-3">Cancellation Request Submitted</h1>
        <p className="text-[#64748B]">Your refund will be processed within 5-7 business days as per our cancellation policy. (Demo)</p>
      </div>
    </section>
  );

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-20">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-[#1E293B] text-center mb-2 font-[family-name:var(--font-plus-jakarta-sans)]">Cancel Booking</h1>
        <p className="text-[#64748B] text-center mb-8">Please note that cancellation charges may apply as per our policy.</p>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm space-y-5" noValidate>
          <div>
            <label htmlFor="bc-pnr" className="block text-sm font-semibold text-[#1E293B] mb-2">PNR Number</label>
            <input id="bc-pnr" type="text" value={pnr} onChange={(e) => setPnr(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" placeholder="Enter PNR" />
          </div>
          <div>
            <label htmlFor="bc-reason" className="block text-sm font-semibold text-[#1E293B] mb-2">Reason for Cancellation</label>
            <select id="bc-reason" value={reason} onChange={(e) => setReason(e.target.value)} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none">
              <option value="">Select a reason</option>
              <option value="change-plans">Change of plans</option>
              <option value="emergency">Emergency</option>
              <option value="found-better">Found a better option</option>
              <option value="wrong-booking">Wrong booking details</option>
              <option value="other">Other</option>
            </select>
          </div>
          {error && <p className="text-[#E53935] text-sm" role="alert" aria-live="polite">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all">
            {loading ? 'Processing...' : 'Submit Cancellation'}
          </button>
        </form>
      </div>
    </section>
  );
}
