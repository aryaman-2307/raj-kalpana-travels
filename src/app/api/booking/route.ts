import { NextResponse } from 'next/server';
import { bookETicket, confirmTentativeBooking, getTicketDetails, getMyBookings } from '@/lib/api/ticketsimply';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    // Fetch ticket details by encrypted PNR
    if (action === 'ticket_details') {
      const ticketNumber = searchParams.get('ticket_number');
      if (!ticketNumber) {
        return NextResponse.json({ error: 'ticket_number is required' }, { status: 400 });
      }
      const data = await getTicketDetails(ticketNumber);
      return NextResponse.json(data);
    }

    // Confirm a tentative booking (called after payment)
    if (action === 'confirm') {
      const ticketNumber = searchParams.get('ticket_number');
      if (!ticketNumber) {
        return NextResponse.json({ error: 'ticket_number is required' }, { status: 400 });
      }
      const data = await confirmTentativeBooking(ticketNumber);
      return NextResponse.json(data);
    }

    // Fetch booking history for a phone number
    if (action === 'my_bookings') {
      const phone = searchParams.get('phone');
      const fromDate = searchParams.get('from_date');
      const toDate = searchParams.get('to_date');

      if (!phone) {
        return NextResponse.json({ error: 'phone is required' }, { status: 400 });
      }

      // Default to last 6 months if dates not provided
      const now = new Date();
      const sixMonthsAgo = new Date(now);
      sixMonthsAgo.setMonth(now.getMonth() - 6);

      const from = fromDate || sixMonthsAgo.toISOString().slice(0, 10);
      const to = toDate || now.toISOString().slice(0, 10);

      const data = await getMyBookings(phone, from, to);
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Booking API Error (GET):', error.message);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    // Create a tentative booking
    if (action === 'book_e_ticket') {
      const {
        reservationId,
        originId,
        destinationId,
        boardingAt,
        dropOff,
        noOfSeats,
        seatDetails,
        contactDetail,
      } = body;

      if (!reservationId || !originId || !destinationId || !boardingAt || !dropOff || !seatDetails || !contactDetail) {
        return NextResponse.json({ error: 'Missing required booking parameters' }, { status: 400 });
      }

      const data = await bookETicket({
        reservationId,
        originId,
        destinationId,
        boardingAt,
        dropOff,
        noOfSeats: noOfSeats || seatDetails.length,
        seatDetails,
        contactDetail,
      });

      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Booking API Error (POST):', error.message);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
