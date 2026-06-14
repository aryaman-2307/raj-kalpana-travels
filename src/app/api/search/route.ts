import { NextResponse } from 'next/server';
import { getAvailableRoutes, getDestinationPairs } from '@/lib/api/ticketsimply';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    if (action === 'destination_pairs') {
      const data = await getDestinationPairs();
      return NextResponse.json(data);
    } 
    
    if (action === 'available_routes') {
      const origin = searchParams.get('origin');
      const destination = searchParams.get('destination');
      const date = searchParams.get('date');

      if (!origin || !destination || !date) {
        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
      }

      const data = await getAvailableRoutes(origin, destination, date);
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('TicketSimply API Proxy Error:', error.message);
    return NextResponse.json({ error: 'Failed to fetch data from API' }, { status: 500 });
  }
}
