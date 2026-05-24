import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const trackingSchema = z.object({
  trackingNumber: z.string().min(6, 'Tracking number must be at least 6 characters').max(20).regex(/^[a-zA-Z0-9]+$/, 'Tracking number must be alphanumeric'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = trackingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid tracking number.' },
        { status: 400 }
      );
    }

    // TODO: Integrate with actual cargo/shipment tracking backend
    // This is a placeholder response
    return NextResponse.json(
      {
        success: true,
        message: 'Tracking information retrieved.',
        data: {
          trackingNumber: result.data.trackingNumber,
          status: 'In Transit',
          lastUpdate: new Date().toISOString(),
          estimatedDelivery: 'Contact support for delivery estimate',
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
