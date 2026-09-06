'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

/**
 * Payment Callback / Return Page
 *
 * PENDING BITLA CLARIFICATION:
 * This page handles the user being redirected back from Bitla's
 * payment gateway after a payment attempt.
 *
 * Current flow (stub):
 *   1. User completes/fails payment on Bitla's gateway
 *   2. Bitla redirects user back to this page with status params
 *   3. This page calls our /api/payment/callback to confirm the booking
 *   4. On success → /booking-confirm?ticket_number=...
 *   5. On failure → show retry option
 *
 * TODO: Update the URL param names once Bitla provides their redirect spec.
 * Expected params may include: ticket_number, status, transaction_id, etc.
 */

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const ticketNumber = searchParams.get('ticket_number') || searchParams.get('pnr') || '';
  const status = searchParams.get('status') || '';
  const transactionId = searchParams.get('transaction_id') || '';

  const [phase, setPhase] = useState<'processing' | 'success' | 'failure'>('processing');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function handleCallback() {
      if (status === 'failure' || status === 'failed' || status === 'cancelled') {
        setPhase('failure');
        setErrorMessage('Payment was cancelled or failed. Please try again.');
        return;
      }

      if (!ticketNumber) {
        setPhase('failure');
        setErrorMessage('Payment callback missing ticket information. Please contact support.');
        return;
      }

      try {
        // Call our backend to confirm the tentative booking with Bitla
        const res = await fetch(
          `/api/payment/callback?ticket_number=${encodeURIComponent(ticketNumber)}&status=success`
        );
        const data = await res.json();

        if (!res.ok || data.status === 'failure') {
          throw new Error(data.error || 'Booking confirmation failed.');
        }

        setPhase('success');
        // Redirect to confirmation page after a brief pause
        setTimeout(() => {
          router.push(`/booking-confirm?ticket_number=${encodeURIComponent(ticketNumber)}`);
        }, 1500);
      } catch (err: any) {
        setPhase('failure');
        setErrorMessage(err.message || 'Failed to confirm booking after payment.');
      }
    }

    handleCallback();
  }, [ticketNumber, status]);

  if (phase === 'processing' || phase === 'success') {
    return (
      <section className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[#E2E8F0] border-t-[#E53935] rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-bold text-[#1E293B] mb-2">
            {phase === 'success' ? 'Payment Confirmed!' : 'Confirming your payment...'}
          </h2>
          <p className="text-[#64748B]">
            {phase === 'success'
              ? 'Redirecting to your ticket...'
              : 'Please do not close or refresh this page.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#1E293B] mb-3">Payment Failed</h1>
        <p className="text-[#64748B] mb-6">{errorMessage}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-[#E53935] text-white rounded-full font-semibold hover:bg-[#C62828] transition-colors"
          >
            Try Again
          </button>
          <a href="/" className="px-6 py-3 border-2 border-[#0F2B5B] text-[#0F2B5B] rounded-full font-semibold hover:bg-[#0F2B5B] hover:text-white transition-colors">
            Go Home
          </a>
        </div>
        <p className="mt-6 text-xs text-[#64748B]">
          If you were charged but see this error, please contact us with your transaction ID: <span className="font-mono">{transactionId || 'N/A'}</span>
        </p>
      </div>
    </section>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#E2E8F0] border-t-[#E53935] rounded-full animate-spin" />
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  );
}
