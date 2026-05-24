import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const feedbackSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/),
  journeyDate: z.string().min(1),
  pnr: z.string().optional(),
  rating: z.number().min(1).max(5),
  message: z.string().min(10).max(2000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = feedbackSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // TODO: Store feedback in database, send notification to support team

    return NextResponse.json(
      { success: true, message: 'Thank you for your feedback!' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
