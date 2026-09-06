import { BusLayout, Seat, SeatStatus, SeatType, DeckType } from '@/lib/mock/seatLayout';

/**
 * A single seat as returned by Bitla's Service Details API
 * inside coach_details.seat_details[]
 */
export interface BitlaSeat {
  number: string;           // seat label, e.g. "A", "6", "L1"
  type: string;             // "Upper Berth" | "Lower Berth" | "Seater" | etc.
  fare: number;
  row_id: number;           // 1-based row index from Bitla
  col_id: number;           // 1-based col index from Bitla
  available: boolean;
  is_ladies_seat: boolean;
  is_gents_seat: boolean;
  is_blocked_seat: boolean;
  is_seat: boolean;         // false for gangway / aisle cells
  is_gangway: boolean;
  is_horizontal: boolean;
  is_frequent_traveller: boolean;
  min_fare: number;
  max_fare: number;
}

/**
 * coach_details object from Bitla's service_details response
 */
export interface BitlaCoachDetails {
  no_of_rows: number;
  no_of_cols: number;
  total_seats: number;
  available_seats: number;
  driver_position: string;  // "Left" | "Right"
  coach_number: string | null;
  seat_details: BitlaSeat[];
}

/**
 * Determines the deck type for a Bitla seat.
 * Bitla uses "Upper Berth" / "Lower Berth" in the `type` field.
 * Seats with no berth info default to "lower" deck.
 */
function getDeckType(seat: BitlaSeat): DeckType {
  const typeLC = seat.type.toLowerCase();
  if (typeLC.includes('upper')) return 'upper';
  return 'lower';
}

/**
 * Determines our internal SeatType from Bitla's type string.
 */
function getSeatType(seat: BitlaSeat): SeatType {
  const typeLC = seat.type.toLowerCase();
  if (typeLC.includes('berth') || typeLC.includes('sleeper')) return 'sleeper';
  return 'seater';
}

/**
 * Determines the display status of a seat.
 */
function getSeatStatus(seat: BitlaSeat): SeatStatus {
  if (!seat.available || seat.is_blocked_seat) return 'booked';
  if (seat.is_ladies_seat) return 'ladies';
  return 'available';
}

/**
 * Transforms Bitla's coach_details into our BusLayout shape.
 *
 * Key mapping:
 *   - Bitla row_id / col_id are 1-based → we convert to 0-based
 *   - Seats with is_seat=false or is_gangway=true become null cells (aisle)
 *   - Upper Berth seats go to 'upper' deck; everything else to 'lower'
 */
export function adaptBitlaCoachToLayout(
  reservationId: string | number,
  coach: BitlaCoachDetails
): BusLayout {
  const seats: Seat[] = [];

  // Separate seat_details into lower and upper based on type
  const lowerSeats = coach.seat_details.filter(
    (s) => s.is_seat && !s.is_gangway && getDeckType(s) === 'lower'
  );
  const upperSeats = coach.seat_details.filter(
    (s) => s.is_seat && !s.is_gangway && getDeckType(s) === 'upper'
  );

  // For lower deck: row_id and col_id are used directly
  // For upper deck: Bitla sometimes resets row_id from 1 for upper deck seats
  // We detect whether the upper deck shares row_id with lower or is independent
  const hasUpperDeck = upperSeats.length > 0;

  const maxLowerRow = lowerSeats.reduce((m, s) => Math.max(m, s.row_id), 0);
  const maxLowerCol = lowerSeats.reduce((m, s) => Math.max(m, s.col_id), 0);
  const maxUpperRow = upperSeats.reduce((m, s) => Math.max(m, s.row_id), 0);
  const maxUpperCol = upperSeats.reduce((m, s) => Math.max(m, s.col_id), 0);

  const maxRows = Math.max(maxLowerRow, maxUpperRow);
  const maxCols = Math.max(maxLowerCol, maxUpperCol);

  // Build lower deck seats
  lowerSeats.forEach((s) => {
    seats.push({
      id: `lower-${s.number}`,
      name: s.number,
      type: getSeatType(s),
      status: getSeatStatus(s),
      fare: s.fare,
      row: s.row_id - 1,   // convert to 0-based
      col: s.col_id - 1,
      deck: 'lower',
    });
  });

  // Build upper deck seats
  upperSeats.forEach((s) => {
    seats.push({
      id: `upper-${s.number}`,
      name: s.number,
      type: getSeatType(s),
      status: getSeatStatus(s),
      fare: s.fare,
      row: s.row_id - 1,
      col: s.col_id - 1,
      deck: 'upper',
    });
  });

  return {
    id: String(reservationId),
    maxRows,
    maxCols,
    hasUpperDeck,
    seats,
  };
}
