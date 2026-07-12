export type SeatStatus = 'available' | 'booked' | 'ladies';
export type SeatType = 'seater' | 'sleeper';
export type DeckType = 'lower' | 'upper';

export interface Seat {
  id: string;
  name: string; // e.g., '1A', 'L1'
  type: SeatType;
  status: SeatStatus;
  fare: number;
  row: number; // 0-indexed from front to back
  col: number; // 0-indexed from left to right
  deck: DeckType;
}

export interface BusLayout {
  id: string;
  maxRows: number;
  maxCols: number;
  hasUpperDeck: boolean;
  seats: Seat[];
}

// Generate a dummy 2x1 Sleeper bus layout
export const dummyBusLayout: BusLayout = {
  id: 'mock-layout-1',
  maxRows: 6, // 6 rows of beds
  maxCols: 4, // Left col, aisle, right col, right col
  hasUpperDeck: true,
  seats: [
    // --- LOWER DECK ---
    // Row 0
    { id: 'l1', name: 'L1', type: 'sleeper', status: 'available', fare: 1200, row: 0, col: 0, deck: 'lower' },
    { id: 'l2', name: 'L2', type: 'sleeper', status: 'booked', fare: 1200, row: 0, col: 2, deck: 'lower' },
    { id: 'l3', name: 'L3', type: 'sleeper', status: 'available', fare: 1200, row: 0, col: 3, deck: 'lower' },
    // Row 1
    { id: 'l4', name: 'L4', type: 'sleeper', status: 'ladies', fare: 1200, row: 1, col: 0, deck: 'lower' },
    { id: 'l5', name: 'L5', type: 'sleeper', status: 'available', fare: 1200, row: 1, col: 2, deck: 'lower' },
    { id: 'l6', name: 'L6', type: 'sleeper', status: 'booked', fare: 1200, row: 1, col: 3, deck: 'lower' },
    // Row 2
    { id: 'l7', name: 'L7', type: 'sleeper', status: 'available', fare: 1200, row: 2, col: 0, deck: 'lower' },
    { id: 'l8', name: 'L8', type: 'sleeper', status: 'available', fare: 1200, row: 2, col: 2, deck: 'lower' },
    { id: 'l9', name: 'L9', type: 'sleeper', status: 'available', fare: 1200, row: 2, col: 3, deck: 'lower' },
    // Row 3
    { id: 'l10', name: 'L10', type: 'sleeper', status: 'booked', fare: 1200, row: 3, col: 0, deck: 'lower' },
    { id: 'l11', name: 'L11', type: 'sleeper', status: 'available', fare: 1200, row: 3, col: 2, deck: 'lower' },
    { id: 'l12', name: 'L12', type: 'sleeper', status: 'available', fare: 1200, row: 3, col: 3, deck: 'lower' },
    // Row 4
    { id: 'l13', name: 'L13', type: 'sleeper', status: 'available', fare: 1200, row: 4, col: 0, deck: 'lower' },
    { id: 'l14', name: 'L14', type: 'sleeper', status: 'booked', fare: 1200, row: 4, col: 2, deck: 'lower' },
    { id: 'l15', name: 'L15', type: 'sleeper', status: 'booked', fare: 1200, row: 4, col: 3, deck: 'lower' },
    // Row 5
    { id: 'l16', name: 'L16', type: 'sleeper', status: 'available', fare: 1200, row: 5, col: 0, deck: 'lower' },
    { id: 'l17', name: 'L17', type: 'sleeper', status: 'available', fare: 1200, row: 5, col: 2, deck: 'lower' },
    { id: 'l18', name: 'L18', type: 'sleeper', status: 'available', fare: 1200, row: 5, col: 3, deck: 'lower' },

    // --- UPPER DECK ---
    // Row 0
    { id: 'u1', name: 'U1', type: 'sleeper', status: 'available', fare: 1100, row: 0, col: 0, deck: 'upper' },
    { id: 'u2', name: 'U2', type: 'sleeper', status: 'available', fare: 1100, row: 0, col: 2, deck: 'upper' },
    { id: 'u3', name: 'U3', type: 'sleeper', status: 'available', fare: 1100, row: 0, col: 3, deck: 'upper' },
    // Row 1
    { id: 'u4', name: 'U4', type: 'sleeper', status: 'booked', fare: 1100, row: 1, col: 0, deck: 'upper' },
    { id: 'u5', name: 'U5', type: 'sleeper', status: 'available', fare: 1100, row: 1, col: 2, deck: 'upper' },
    { id: 'u6', name: 'U6', type: 'sleeper', status: 'available', fare: 1100, row: 1, col: 3, deck: 'upper' },
    // Row 2
    { id: 'u7', name: 'U7', type: 'sleeper', status: 'available', fare: 1100, row: 2, col: 0, deck: 'upper' },
    { id: 'u8', name: 'U8', type: 'sleeper', status: 'booked', fare: 1100, row: 2, col: 2, deck: 'upper' },
    { id: 'u9', name: 'U9', type: 'sleeper', status: 'booked', fare: 1100, row: 2, col: 3, deck: 'upper' },
    // Row 3
    { id: 'u10', name: 'U10', type: 'sleeper', status: 'available', fare: 1100, row: 3, col: 0, deck: 'upper' },
    { id: 'u11', name: 'U11', type: 'sleeper', status: 'available', fare: 1100, row: 3, col: 2, deck: 'upper' },
    { id: 'u12', name: 'U12', type: 'sleeper', status: 'ladies', fare: 1100, row: 3, col: 3, deck: 'upper' },
    // Row 4
    { id: 'u13', name: 'U13', type: 'sleeper', status: 'available', fare: 1100, row: 4, col: 0, deck: 'upper' },
    { id: 'u14', name: 'U14', type: 'sleeper', status: 'available', fare: 1100, row: 4, col: 2, deck: 'upper' },
    { id: 'u15', name: 'U15', type: 'sleeper', status: 'available', fare: 1100, row: 4, col: 3, deck: 'upper' },
    // Row 5
    { id: 'u16', name: 'U16', type: 'sleeper', status: 'available', fare: 1100, row: 5, col: 0, deck: 'upper' },
    { id: 'u17', name: 'U17', type: 'sleeper', status: 'booked', fare: 1100, row: 5, col: 2, deck: 'upper' },
    { id: 'u18', name: 'U18', type: 'sleeper', status: 'available', fare: 1100, row: 5, col: 3, deck: 'upper' },
  ],
};
