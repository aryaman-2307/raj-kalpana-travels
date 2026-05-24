'use client';

import { useState } from 'react';

export default function TrackShipmentPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { status: string; lastUpdate: string }>(null);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!trackingNumber || trackingNumber.length < 6) { setError('Enter a valid tracking number (min 6 characters).'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/track-shipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingNumber }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Failed to fetch tracking info. Try again.');
    }
    setLoading(false);
  }

  return (
    <section className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-gradient-to-br from-[#0F2B5B] to-[#1A3D7C] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-plus-jakarta-sans)]">Track Shipment</h1>
          <p className="mt-3 text-white/70">Enter your tracking number to check shipment status.</p>
        </div>
      </div>
      <div className="max-w-lg mx-auto px-4 sm:px-6 -mt-8 relative z-10 pb-20">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]" noValidate>
          <div className="space-y-5">
            <div>
              <label htmlFor="ts-num" className="block text-sm font-semibold text-[#1E293B] mb-2">Tracking Number</label>
              <input id="ts-num" type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))} maxLength={20} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" placeholder="Enter tracking number" />
            </div>
            {error && <p className="text-[#E53935] text-sm" role="alert" aria-live="polite">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all">
              {loading ? 'Tracking...' : 'Track Shipment'}
            </button>
          </div>
        </form>
        {result && (
          <div className="mt-8 bg-white rounded-2xl border border-[#E2E8F0] p-8" aria-live="polite">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4">Tracking Result</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[#64748B]">Tracking #</span><span className="font-semibold">{trackingNumber}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Status</span><span className="font-semibold text-amber-600">{result.status}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Last Updated</span><span className="font-semibold">{new Date(result.lastUpdate).toLocaleString('en-IN')}</span></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
