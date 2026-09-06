import { NextResponse } from 'next/server';
import { confirmTentativeBooking } from '@/lib/api/ticketsimply';

/**
 * Payment Callback Handler
 * 
 * PAYMENT FLOW STATUS: PENDING BITLA CLARIFICATION
 * ─────────────────────────────────────────────────
 * This endpoint is a stub ready to be completed once Bitla provides
 * the payment integration documentation.
 *
 * What we know:
 *   - book_e_ticket → creates tentative booking → returns encrypted ticket_number
 *   - confirm_tentative_ebooking → confirms the booking → returns full ticket details
 *
 * What we don't know yet (pending Bitla response):
 *   - Does Bitla redirect the user to a payment page? What is the URL?
 *   - Does Bitla send a server-to-server webhook on payment success?
 *   - What payload does the callback/webhook contain?
 *   - How do we verify the callback is authentic (HMAC/signature)?
 *
 * Current behavior:
 *   - GET  ?ticket_number=...&status=success → calls confirm_tentative_ebooking
 *   - GET  ?ticket_number=...&status=failure → returns error
 *
 * TODO (once Bitla responds):
 *   1. Verify webhook signature/HMAC
 *   2. Parse the actual payment gateway payload
 *   3. Extract the ticket_number from the payload
 *   4. Call confirm_tentative_ebooking
 *   5. Redirect user to /booking-confirm?ticket_number=...
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticketNumber = searchParams.get('ticket_number');
  const status = searchParams.get('status'); // 'success' or 'failure'

  if (status === 'failure' || !ticketNumber) {
    return NextResponse.json(
      { error: 'Payment failed or ticket_number missing', status: 'failure' },
      { status: 400 }
    );
  }

  try {
    const confirmed = await confirmTentativeBooking(ticketNumber);
    return NextResponse.json({ status: 'success', ...confirmed });
  } catch (error: any) {
    console.error('Payment Callback / Confirm Error:', error.message);
    return NextResponse.json({ error: error.message || 'Failed to confirm booking' }, { status: 500 });
  }
}

/**
 * POST handler for server-to-server webhook from payment gateway
 * (structure TBD once Bitla provides documentation)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[Payment Webhook] Received:', JSON.stringify(body));

    // TODO: Verify webhook signature from Bitla/payment gateway
    // TODO: Extract encrypted ticket_number from payload
    // TODO: Call confirmTentativeBooking(ticketNumber)

    return NextResponse.json({
      received: true,
      message: 'Webhook received. Payment flow integration pending Bitla documentation.',
    });
  } catch (error: any) {
    console.error('Payment Webhook Error:', error.message);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
