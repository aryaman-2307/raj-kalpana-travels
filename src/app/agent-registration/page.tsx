'use client';

import { useState } from 'react';
import { CITIES } from '@/data/cities';

export default function AgentRegistrationPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', agencyName: '', city: '', state: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function update(key: string, val: string) { setForm((p) => ({ ...p, [key]: val })); setErrors((p) => ({ ...p, [key]: '' })); }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name || form.name.length < 2) e.name = 'Name is required (min 2 chars).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required.';
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Phone must be 10 digits.';
    if (!form.agencyName) e.agencyName = 'Agency name is required.';
    if (!form.city) e.city = 'City is required.';
    if (!form.state) e.state = 'State is required.';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.';
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    // TODO: POST to /api/auth/agent-register — never handle registration client-side
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
  }

  const states = [...new Set(CITIES.map((c) => c.state))];
  const field = (id: string, label: string, key: string, type = 'text', placeholder = '') => (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[#1E293B] mb-2">{label}</label>
      <input id={id} type={type} value={(form as Record<string, string>)[key]} onChange={(e) => update(key, e.target.value)} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none transition" placeholder={placeholder} />
      {errors[key] && <p className="text-[#E53935] text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  if (success) return (
    <section className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-3xl font-bold text-[#1E293B] mb-4">Registration Submitted!</h1>
        <p className="text-[#64748B]">Our team will review your application and contact you within 2-3 business days.</p>
      </div>
    </section>
  );

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1E293B] font-[family-name:var(--font-plus-jakarta-sans)]">Agent Registration</h1>
          <p className="text-[#64748B] mt-2">Partner with Raj Kalpana Travels and grow your business.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm space-y-5" noValidate>
          <div className="grid md:grid-cols-2 gap-5">
            {field('ar-name', 'Full Name', 'name', 'text', 'Your full name')}
            {field('ar-email', 'Email Address', 'email', 'email', 'your@email.com')}
            {field('ar-phone', 'Phone Number', 'phone', 'tel', '10-digit phone number')}
            {field('ar-agency', 'Agency Name', 'agencyName', 'text', 'Your travel agency name')}
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="ar-state" className="block text-sm font-semibold text-[#1E293B] mb-2">State</label>
              <select id="ar-state" value={form.state} onChange={(e) => update('state', e.target.value)} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#E53935] outline-none">
                <option value="">Select state</option>
                {states.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <p className="text-[#E53935] text-xs mt-1">{errors.state}</p>}
            </div>
            {field('ar-city', 'City', 'city', 'text', 'Your city')}
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {field('ar-pass', 'Password', 'password', 'password', 'Min 8 characters')}
            {field('ar-cpass', 'Confirm Password', 'confirmPassword', 'password', 'Re-enter password')}
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all">
            {loading ? 'Submitting...' : 'Register as Agent'}
          </button>
        </form>
      </div>
    </section>
  );
}
