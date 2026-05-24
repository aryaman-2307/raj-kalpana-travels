'use client';

import { useState } from 'react';

export default function AgentLoginPage() {
  const [agentId, setAgentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!agentId || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    // TODO: POST to /api/auth/agent-login
    setTimeout(() => { setLoading(false); alert('Agent login requires backend integration.'); }, 1000);
  }

  return (
    <section className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0F2B5B] mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-[#1E293B] font-[family-name:var(--font-plus-jakarta-sans)]">Agent Login</h1>
          <p className="text-[#64748B] mt-2">Access your agent portal and manage bookings.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm" noValidate>
          <div className="space-y-5">
            <div>
              <label htmlFor="al-id" className="block text-sm font-semibold text-[#1E293B] mb-2">Agent ID / Email</label>
              <input id="al-id" type="text" value={agentId} onChange={(e) => setAgentId(e.target.value)} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" placeholder="Enter your agent ID or email" />
            </div>
            <div>
              <label htmlFor="al-pass" className="block text-sm font-semibold text-[#1E293B] mb-2">Password</label>
              <input id="al-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" placeholder="Enter your password" />
            </div>
            {error && <p className="text-[#E53935] text-sm" role="alert" aria-live="polite">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all">
              {loading ? 'Signing in...' : 'Agent Sign In'}
            </button>
          </div>
          <p className="text-center text-sm text-[#64748B] mt-6">
            Not registered? <a href="/agent-registration" className="text-[#E53935] font-semibold hover:underline">Register as Agent</a>
          </p>
        </form>
      </div>
    </section>
  );
}
