'use client';

import { useState } from 'react';
import { FAQS } from '@/data/faqs';

export default function FAQsPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F2B5B] to-[#1a3f7a] text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Find quick answers to common questions about booking, cancellations, refunds, and travelling with Raj Kalpana Travels.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 md:py-16 bg-[#F8FAFC]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-[#F8FAFC] transition-colors"
                  >
                    <span className="text-[#1E293B] font-medium text-sm md:text-base leading-relaxed">
                      {faq.question}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#64748B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={`flex-shrink-0 mt-0.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={faq.id}
                      className="px-6 pb-5"
                    >
                      <p className="text-[#64748B] text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#1E293B]">
            Still Have Questions?
          </h2>
          <p className="mt-3 text-[#64748B] max-w-xl mx-auto">
            Our support team is available 24/7 to help you with any queries.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block bg-[#0F2B5B] hover:bg-[#0a1f42] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
