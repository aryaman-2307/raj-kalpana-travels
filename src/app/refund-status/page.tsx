'use client';

import { useState } from 'react';

export default function RefundStatusPage() {
  const [pnr, setPnr] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pnr || pnr.length < 6) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setResult(true); }, 1200);
  }

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-20">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-[#1E293B] text-center mb-2 font-[family-name:var(--font-plus-jakarta-sans)]">Refund Status</h1>
        <p className="text-[#64748B] text-center mb-8">Track the status of your refund request.</p>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm space-y-5" noValidate>
          <div>
            <label htmlFor="rs-pnr" className="block text-sm font-semibold text-[#1E293B] mb-2">PNR Number</label>
            <input id="rs-pnr" type="text" value={pnr} onChange={(e) => setPnr(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" placeholder="Enter your PNR" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all">
            {loading ? 'Checking...' : 'Check Refund Status'}
          </button>
        </form>
        {result && (
          <div className="mt-8 bg-white rounded-2xl border border-[#E2E8F0] p-8" aria-live="polite">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4">Refund Details (Demo)</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[#64748B]">PNR</span><span className="font-semibold">{pnr}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Status</span><span className="font-semibold text-amber-600">Processing</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Refund Amount</span><span className="font-semibold">₹765</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Expected By</span><span className="font-semibold">5-7 business days</span></div>
              <p className="text-xs text-[#64748B] italic pt-2">Demo data. Real refund tracking requires backend.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
