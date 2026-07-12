import React from 'react';
import { BusLayout, Seat, DeckType } from '@/lib/mock/seatLayout';

interface SeatLayoutProps {
  layout: BusLayout;
  selectedSeats: string[];
  onSeatClick: (seat: Seat) => void;
}

export default function SeatLayout({ layout, selectedSeats, onSeatClick }: SeatLayoutProps) {
  // Render a single deck
  const renderDeck = (deckType: DeckType, title: string) => {
    const deckSeats = layout.seats.filter((s) => s.deck === deckType);
    if (deckSeats.length === 0) return null;

    // Create a 2D array [row][col]
    const grid: (Seat | null)[][] = Array(layout.maxRows)
      .fill(null)
      .map(() => Array(layout.maxCols).fill(null));

    deckSeats.forEach((seat) => {
      grid[seat.row][seat.col] = seat;
    });

    return (
      <div className="flex flex-col items-center border-2 border-[#E2E8F0] rounded-2xl p-4 bg-white shadow-sm w-full max-w-[320px]">
        <h4 className="font-semibold text-[#1E293B] mb-4 pb-2 border-b border-[#E2E8F0] w-full text-center">
          {title}
        </h4>

        {/* Front of Bus Indicator (Steering Wheel) */}
        {deckType === 'lower' && (
          <div className="w-full flex justify-end mb-6 pr-4">
            <svg
              className="w-8 h-8 text-[#64748B]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22a10 10 0 100-20 10 10 0 000 20z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14v8m-1.5-8.5l-6.5 6.5m16-6.5l-6.5 6.5" />
            </svg>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {grid.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-4">
              {row.map((seat, cIdx) => {
                if (!seat) {
                  // Empty aisle space
                  return <div key={`${rIdx}-${cIdx}`} className="w-10 h-20 md:w-12 md:h-24"></div>;
                }

                const isSelected = selectedSeats.includes(seat.id);
                const isBooked = seat.status === 'booked';
                const isLadies = seat.status === 'ladies';

                let bgClass = 'bg-white border-[#CBD5E1] hover:border-[#0F2B5B] cursor-pointer';
                if (isBooked) bgClass = 'bg-[#E2E8F0] border-[#CBD5E1] cursor-not-allowed opacity-60';
                else if (isSelected) bgClass = 'bg-[#E53935] border-[#E53935] text-white shadow-md';
                else if (isLadies) bgClass = 'bg-pink-50 border-pink-300 hover:border-pink-500 cursor-pointer';

                return (
                  <button
                    key={seat.id}
                    disabled={isBooked}
                    onClick={() => onSeatClick(seat)}
                    className={`relative w-10 h-20 md:w-12 md:h-24 border-2 rounded-lg flex items-center justify-center transition-all ${bgClass} group`}
                    title={`Seat ${seat.name} - ₹${seat.fare}`}
                  >
                    {/* Pillow visual for sleeper */}
                    {seat.type === 'sleeper' && (
                      <div className={`absolute top-1 left-1 right-1 h-3 rounded-md border ${isSelected ? 'border-white/50 bg-white/20' : 'border-[#CBD5E1] bg-[#F1F5F9]'} ${isBooked ? 'opacity-40' : ''}`}></div>
                    )}
                    
                    <span className={`text-xs font-semibold z-10 ${isSelected ? 'text-white' : 'text-[#475569]'}`}>
                      {seat.name}
                    </span>

                    {/* Tooltip on hover */}
                    {!isBooked && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1E293B] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                        ₹{seat.fare}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 justify-center items-start w-full">
      {renderDeck('lower', 'Lower Deck')}
      {layout.hasUpperDeck && renderDeck('upper', 'Upper Deck')}
    </div>
  );
}
