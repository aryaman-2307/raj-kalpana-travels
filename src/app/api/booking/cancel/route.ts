import { NextResponse } from 'next/server';
import { canCancelTicket, cancelETicket } from '@/lib/api/ticketsimply';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticketNumber = searchParams.get('ticket_number');
  const seatNumber = searchParams.get('seat_number');

  if (!ticketNumber || !seatNumber) {
    return NextResponse.json({ error: 'ticket_number and seat_number are required' }, { status: 400 });
  }

  try {
    // Returns: { cancel_percent, cancelled_fare, refund_amount }
    const data = await canCancelTicket(ticketNumber, seatNumber);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Cancel Check Error:', error.message);
    return NextResponse.json({ error: error.message || 'Failed to check cancellation' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticketNumber, contactDetails, travelDate, refundType } = body;

    if (!ticketNumber || !contactDetails || !travelDate) {
      return NextResponse.json({ error: 'ticketNumber, contactDetails, and travelDate are required' }, { status: 400 });
    }

    const data = await cancelETicket({
      ticketNumber,
      contactDetails,
      travelDate,
      refundType: refundType || '1',
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Cancel Ticket Error:', error.message);
    return NextResponse.json({ error: error.message || 'Failed to cancel ticket' }, { status: 500 });
  }
}
