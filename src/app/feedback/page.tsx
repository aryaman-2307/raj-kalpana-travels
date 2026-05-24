'use client';

import { useState } from 'react';

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', journeyDate: '', pnr: '', rating: 5, message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function update(key: string, val: string | number) { setForm((p) => ({ ...p, [key]: val })); setErrors((p) => ({ ...p, [key]: '' })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name || form.name.length < 2) errs.name = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required.';
    if (!/^\d{10}$/.test(form.phone)) errs.phone = 'Phone must be 10 digits.';
    if (!form.journeyDate) errs.journeyDate = 'Journey date is required.';
    if (!form.message || form.message.length < 10) errs.message = 'Message must be at least 10 characters.';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) setSuccess(true);
      else setErrors({ form: data.message });
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' });
    }
    setLoading(false);
  }

  if (success) return (
    <section className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-[#1E293B] mb-3">Thank You!</h1>
        <p className="text-[#64748B]">Your feedback has been submitted. We appreciate your input!</p>
      </div>
    </section>
  );

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-[#1E293B] text-center mb-2 font-[family-name:var(--font-plus-jakarta-sans)]">Share Your Feedback</h1>
        <p className="text-[#64748B] text-center mb-8">Help us improve your travel experience.</p>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm space-y-5" noValidate>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="fb-name" className="block text-sm font-semibold text-[#1E293B] mb-2">Name</label>
              <input id="fb-name" type="text" value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" />
              {errors.name && <p className="text-[#E53935] text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="fb-email" className="block text-sm font-semibold text-[#1E293B] mb-2">Email</label>
              <input id="fb-email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" />
              {errors.email && <p className="text-[#E53935] text-xs mt-1">{errors.email}</p>}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="fb-phone" className="block text-sm font-semibold text-[#1E293B] mb-2">Phone</label>
              <input id="fb-phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" />
              {errors.phone && <p className="text-[#E53935] text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="fb-date" className="block text-sm font-semibold text-[#1E293B] mb-2">Journey Date</label>
              <input id="fb-date" type="date" value={form.journeyDate} onChange={(e) => update('journeyDate', e.target.value)} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" />
              {errors.journeyDate && <p className="text-[#E53935] text-xs mt-1">{errors.journeyDate}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="fb-pnr" className="block text-sm font-semibold text-[#1E293B] mb-2">PNR (Optional)</label>
            <input id="fb-pnr" type="text" value={form.pnr} onChange={(e) => update('pnr', e.target.value)} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" placeholder="Optional" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => update('rating', star)} className={`w-10 h-10 rounded-lg text-lg font-bold transition-colors ${form.rating >= star ? 'bg-[#F59E0B] text-white' : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]'}`}>
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="fb-msg" className="block text-sm font-semibold text-[#1E293B] mb-2">Your Feedback</label>
            <textarea id="fb-msg" rows={4} value={form.message} onChange={(e) => update('message', e.target.value)} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition resize-none" placeholder="Tell us about your experience..." />
            {errors.message && <p className="text-[#E53935] text-xs mt-1">{errors.message}</p>}
          </div>
          {errors.form && <p className="text-[#E53935] text-sm" role="alert" aria-live="polite">{errors.form}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all">
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </section>
  );
}
