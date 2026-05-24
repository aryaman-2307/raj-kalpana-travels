'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service (not sensitive data)
    // Do NOT log user details, tokens, or payment info
    console.error('Application error:', error.digest);
  }, [error]);

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#F8FAFC]">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#F59E0B]/10 mb-8">
          <svg className="w-12 h-12 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-plus-jakarta-sans)] text-[#1E293B] mb-4">
          Something went wrong
        </h1>
        <p className="text-[#64748B] max-w-md mx-auto mb-8">
          We encountered an unexpected error. Please try again or contact our support
          if the problem persists.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center px-8 py-3 bg-[#E53935] text-white rounded-full font-semibold hover:bg-[#C62828] transition-colors"
        >
          Try Again
        </button>
      </div>
    </section>
  );
}
