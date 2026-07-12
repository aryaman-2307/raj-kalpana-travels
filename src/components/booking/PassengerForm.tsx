import React, { useState } from 'react';
import { Seat } from '@/lib/mock/seatLayout';

interface Passenger {
  seatId: string;
  name: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other' | '';
}

interface PassengerFormProps {
  selectedSeats: Seat[];
  totalFare: number;
  onProceedToPayment: () => void;
}

export default function PassengerForm({ selectedSeats, totalFare, onProceedToPayment }: PassengerFormProps) {
  const [passengers, setPassengers] = useState<Passenger[]>(
    selectedSeats.map((s) => ({ seatId: s.id, name: '', age: '', gender: '' }))
  );
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  // Update passenger details if selected seats change
  React.useEffect(() => {
    setPassengers((prev) => {
      const newPassengers = selectedSeats.map((seat) => {
        const existing = prev.find((p) => p.seatId === seat.id);
        return existing || { seatId: seat.id, name: '', age: '', gender: '' };
      });
      return newPassengers;
    });
  }, [selectedSeats]);

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (selectedSeats.length === 0) {
      setError('Please select at least one seat.');
      return;
    }

    if (!email || !phone) {
      setError('Please provide contact details.');
      return;
    }

    const isIncomplete = passengers.some((p) => !p.name || !p.age || !p.gender);
    if (isIncomplete) {
      setError('Please fill out all passenger details.');
      return;
    }

    onProceedToPayment();
  };

  if (selectedSeats.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center h-full flex flex-col items-center justify-center">
        <svg className="w-16 h-16 text-[#CBD5E1] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">No Seats Selected</h3>
        <p className="text-[#64748B]">Click on an available seat from the layout to start booking.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
      <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-[#1E293B]">Booking Summary</h3>
          <p className="text-sm text-[#64748B]">
            {selectedSeats.length} Seat{selectedSeats.length > 1 ? 's' : ''} Selected:{' '}
            <span className="font-semibold text-[#0F2B5B]">
              {selectedSeats.map((s) => s.name).join(', ')}
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-[#64748B]">Total Fare</p>
          <p className="text-2xl font-bold text-[#E53935]">₹{totalFare}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Passenger Details */}
        <div className="space-y-4">
          <h4 className="font-semibold text-[#1E293B]">Passenger Details</h4>
          {passengers.map((passenger, idx) => (
            <div key={passenger.seatId} className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <p className="text-sm font-semibold text-[#0F2B5B] mb-3">
                Seat {selectedSeats.find((s) => s.id === passenger.seatId)?.name}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-6">
                  <label className="block text-xs text-[#64748B] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={passenger.name}
                    onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-sm focus:outline-none focus:border-[#0F2B5B] focus:ring-1 focus:ring-[#0F2B5B]"
                    placeholder="E.g. Rahul Sharma"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs text-[#64748B] mb-1">Age</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="100"
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange(idx, 'age', e.target.value)}
                    className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-sm focus:outline-none focus:border-[#0F2B5B] focus:ring-1 focus:ring-[#0F2B5B]"
                    placeholder="Age"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs text-[#64748B] mb-1">Gender</label>
                  <select
                    required
                    value={passenger.gender}
                    onChange={(e) => handlePassengerChange(idx, 'gender', e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-sm bg-white focus:outline-none focus:border-[#0F2B5B] focus:ring-1 focus:ring-[#0F2B5B]"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Details */}
        <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
          <h4 className="font-semibold text-[#1E293B]">Contact Details</h4>
          <p className="text-xs text-[#64748B] mb-2">Your ticket and booking updates will be sent here.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#64748B] mb-1">Email ID</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-sm focus:outline-none focus:border-[#0F2B5B] focus:ring-1 focus:ring-[#0F2B5B]"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-xs text-[#64748B] mb-1">Phone Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-[#CBD5E1] rounded-l-lg bg-[#F8FAFC] text-[#64748B] text-sm">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="flex-1 w-full px-3 py-2 border border-[#CBD5E1] rounded-r-lg text-sm focus:outline-none focus:border-[#0F2B5B] focus:ring-1 focus:ring-[#0F2B5B]"
                  placeholder="10 digit mobile number"
                />
              </div>
            </div>
          </div>
        </div>

        {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">{error}</div>}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-red-500/25 transition-all mt-4"
        >
          Proceed to Payment (₹{totalFare})
        </button>
      </form>
    </div>
  );
}
