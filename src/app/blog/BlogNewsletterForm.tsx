'use client';

import { useState } from 'react';

export default function BlogNewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center gap-3 bg-white/10 rounded-full px-6 py-4 max-w-md mx-auto">
        <svg className="w-5 h-5 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-white font-semibold">You&apos;re subscribed! Thank you.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 max-w-md mx-auto"
      aria-label="Newsletter subscription"
    >
      <input
        id="blog-newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        required
        className="flex-1 px-4 py-3 rounded-full bg-white text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] text-sm"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-[#E53935] text-white rounded-full font-semibold text-sm hover:bg-[#C62828] transition-colors whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}
