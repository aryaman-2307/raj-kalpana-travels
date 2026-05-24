'use client';

import { useState } from 'react';
import Link from 'next/link';

// NOTE: Authentication must be implemented server-side with secure session management.
// This form is a UI placeholder only. Never validate credentials on the client side.

export default function CustomerLoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!emailOrPhone || !password) { setError('Please fill in all fields.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    // TODO: POST to /api/auth/login with HttpOnly cookie response
    setTimeout(() => { setLoading(false); alert('Login functionality requires backend integration.'); }, 1000);
  }

  return (
    <section className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0F2B5B] mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-[#1E293B] font-[family-name:var(--font-plus-jakarta-sans)]">Customer Login</h1>
          <p className="text-[#64748B] mt-2">Access your bookings and travel history.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm" noValidate>
          <div className="space-y-5">
            <div>
              <label htmlFor="cl-email" className="block text-sm font-semibold text-[#1E293B] mb-2">Email or Phone</label>
              <input id="cl-email" type="text" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" placeholder="your@email.com or 10-digit phone" />
            </div>
            <div>
              <label htmlFor="cl-pass" className="block text-sm font-semibold text-[#1E293B] mb-2">Password</label>
              <input id="cl-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" placeholder="Minimum 8 characters" />
            </div>
            {error && <p className="text-[#E53935] text-sm" role="alert" aria-live="polite">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
          <p className="text-center text-sm text-[#64748B] mt-6">
            Don&apos;t have an account? Contact us at <a href="tel:9355777632" className="text-[#E53935] font-semibold">9355777632</a>
          </p>
        </form>
      </div>
    </section>
  );
}
