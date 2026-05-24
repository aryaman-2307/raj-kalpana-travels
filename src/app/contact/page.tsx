'use client';

import { useState } from 'react';
import { contactFormSchema } from '@/lib/validators';
import { COMPANY_PHONE, COMPANY_EMAIL, COMPANY_ADDRESS } from '@/lib/constants';

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Backend must handle actual contact form submission (email, CRM, etc.)
      // This is a placeholder that simulates a network request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Contact form submitted (placeholder)');
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F2B5B] to-[#1a3f7a] text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contact Us</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Have a question, feedback, or need help with your booking? We are here for you 24/7.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
                <h2 className="text-lg font-bold text-[#1E293B] mb-4">Get in Touch</h2>
                <div className="space-y-5">
                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0F2B5B]/10 text-[#0F2B5B] flex items-center justify-center flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1E293B]">Phone</p>
                      <a href={`tel:+91${COMPANY_PHONE}`} className="text-sm text-[#0F2B5B] hover:underline">
                        +91-{COMPANY_PHONE}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0F2B5B]/10 text-[#0F2B5B] flex items-center justify-center flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1E293B]">Email</p>
                      <a href={`mailto:${COMPANY_EMAIL}`} className="text-sm text-[#0F2B5B] hover:underline break-all">
                        {COMPANY_EMAIL}
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0F2B5B]/10 text-[#0F2B5B] flex items-center justify-center flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1E293B]">Office Address</p>
                      <p className="text-sm text-[#64748B]">{COMPANY_ADDRESS}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
                <h3 className="text-lg font-bold text-[#1E293B] mb-2">Business Hours</h3>
                <p className="text-sm text-[#64748B]">
                  Our support team is available <strong>24 hours a day, 7 days a week</strong>. Feel free to reach out at any time.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E2E8F0]">
                <h2 className="text-lg font-bold text-[#1E293B] mb-6">Send Us a Message</h2>

                {/* Status Messages */}
                <div aria-live="polite" aria-atomic="true">
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm">
                      Thank you! Your message has been sent successfully. We will get back to you shortly.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
                      Something went wrong. Please try again later or contact us directly by phone.
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#1E293B] mb-1.5">
                        Full Name <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#1E293B] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]/20 focus:border-[#0F2B5B] transition-colors ${
                          errors.name ? 'border-[#E53935]' : 'border-[#E2E8F0]'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-[#E53935]">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#1E293B] mb-1.5">
                        Email Address <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#1E293B] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]/20 focus:border-[#0F2B5B] transition-colors ${
                          errors.email ? 'border-[#E53935]' : 'border-[#E2E8F0]'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-[#E53935]">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#1E293B] mb-1.5">
                        Phone Number <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#1E293B] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]/20 focus:border-[#0F2B5B] transition-colors ${
                          errors.phone ? 'border-[#E53935]' : 'border-[#E2E8F0]'
                        }`}
                        placeholder="10-digit phone number"
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1 text-xs text-[#E53935]">{errors.phone}</p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-[#1E293B] mb-1.5">
                        Subject <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#1E293B] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]/20 focus:border-[#0F2B5B] transition-colors ${
                          errors.subject ? 'border-[#E53935]' : 'border-[#E2E8F0]'
                        }`}
                        placeholder="What is this about?"
                      />
                      {errors.subject && (
                        <p id="subject-error" className="mt-1 text-xs text-[#E53935]">{errors.subject}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#1E293B] mb-1.5">
                      Message <span className="text-[#E53935]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#1E293B] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]/20 focus:border-[#0F2B5B] transition-colors resize-none ${
                        errors.message ? 'border-[#E53935]' : 'border-[#E2E8F0]'
                      }`}
                      placeholder="Tell us how we can help you..."
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-xs text-[#E53935]">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#E53935] hover:bg-[#c62828] disabled:bg-[#E53935]/60 text-white font-semibold px-8 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting && (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
