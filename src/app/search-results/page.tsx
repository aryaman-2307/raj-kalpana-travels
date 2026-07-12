'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SeatLayout from '@/components/booking/SeatLayout';
import PassengerForm from '@/components/booking/PassengerForm';
import { dummyBusLayout, Seat } from '@/lib/mock/seatLayout';
interface ApiRoute {
  id: number;
  name: string;
  number: string;
  dep_time: string;
  arr_time: string;
  duration: string;
  fare_str: string;
  bus_type: string;
  available_seats: number;
  boarding_point_details: any[];
  drop_off_details: any[];
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const fromId = searchParams.get('fromId') || '';
  const toId = searchParams.get('toId') || '';
  const fromName = searchParams.get('fromName') || searchParams.get('from') || '';
  const toName = searchParams.get('toName') || searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  
  const [routes, setRoutes] = useState<ApiRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [sortBy, setSortBy] = useState<'price' | 'departure'>('price');
  const [busTypeFilter, setBusTypeFilter] = useState('all');

  const [expandedRouteId, setExpandedRouteId] = useState<number | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const handleSeatClick = (seat: Seat) => {
    setSelectedSeats((prev) => {
      const isSelected = prev.find((s) => s.id === seat.id);
      if (isSelected) return prev.filter((s) => s.id !== seat.id);
      if (prev.length >= 6) {
        alert('You can only select up to 6 seats.');
        return prev;
      }
      return [...prev, seat];
    });
  };

  const totalFare = selectedSeats.reduce((sum, seat) => sum + seat.fare, 0);

  useEffect(() => {
    async function fetchRoutes() {
      if (!fromId || !toId || !date) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const res = await fetch(`/api/search?action=available_routes&origin=${fromId}&destination=${toId}&date=${date}`);
        const data = await res.json();

        if (data && data.result) {
          setRoutes(data.result);
        } else {
          setError('No routes found or API error.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch routes.');
      } finally {
        setLoading(false);
      }
    }

    fetchRoutes();
  }, [fromId, toId, date]);

  const results = useMemo(() => {
    let filtered = routes;
    if (busTypeFilter !== 'all') {
      filtered = filtered.filter((r) => r.busType === busTypeFilter);
    }
    return filtered.sort((a, b) => {
      if (sortBy === 'price') {
        const priceA = parseFloat(a.fare_str) || 0;
        const priceB = parseFloat(b.fare_str) || 0;
        return priceA - priceB;
      }
      return a.dep_time.localeCompare(b.dep_time);
    });
  }, [routes, sortBy, busTypeFilter]);

  const busTypes = [...new Set(routes.map((r) => r.busType))];

  return (
    <section className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-gradient-to-br from-[#0F2B5B] to-[#1A3D7C] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-4">
            <Link href="/" className="hover:text-white">Home</Link> / <Link href="/booking" className="hover:text-white">Booking</Link> / <span className="text-white">Results</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-plus-jakarta-sans)]">
            {fromName} → {toName}
          </h1>
          {date && <p className="mt-2 text-white/70">Travel date: {new Date(date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-semibold text-[#1E293B]">Sort by:</label>
            <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value as 'price' | 'departure')} className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm bg-white">
              <option value="price">Price (Low to High)</option>
              <option value="departure">Departure Time</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="busType" className="text-sm font-semibold text-[#1E293B]">Bus Type:</label>
            <select id="busType" value={busTypeFilter} onChange={(e) => setBusTypeFilter(e.target.value)} className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm bg-white">
              <option value="all">All Types</option>
              {busTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <p className="text-sm text-[#64748B] ml-auto self-center">{results.length} bus{results.length !== 1 ? 'es' : ''} found</p>
        </div>

        {/* Loading / Error States */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-[#E2E8F0] border-t-[#E53935] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#64748B]">Searching for buses on TicketSimply...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-red-100">
            <h2 className="text-xl font-bold text-red-600 mb-2">Oops!</h2>
            <p className="text-[#64748B] mb-6">{error}</p>
            <Link href="/" className="px-6 py-3 bg-[#E53935] text-white rounded-full font-semibold hover:bg-[#C62828] transition-colors">Search Again</Link>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E8F0]">
            <svg className="w-16 h-16 text-[#E2E8F0] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <h2 className="text-xl font-bold text-[#1E293B] mb-2">No buses found</h2>
            <p className="text-[#64748B] mb-6">Try a different route or date.</p>
            <Link href="/" className="px-6 py-3 bg-[#E53935] text-white rounded-full font-semibold hover:bg-[#C62828] transition-colors">Search Again</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((route) => (
              <div key={route.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg hover:border-[#E53935]/30 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <span className="inline-block bg-[#0F2B5B]/10 text-[#0F2B5B] text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {route.busType}
                    </span>
                    <div className="flex items-center gap-4 mt-2">
                      <div>
                        <p className="text-2xl font-bold text-[#1E293B]">{route.dep_time}</p>
                        <p className="text-sm text-[#64748B]">{fromName}</p>
                      </div>
                      <div className="flex-1 flex items-center gap-2 px-2">
                        <div className="flex-1 border-t-2 border-dashed border-[#E2E8F0]" />
                        <span className="text-xs text-[#64748B] font-medium whitespace-nowrap">{route.duration}</span>
                        <div className="flex-1 border-t-2 border-dashed border-[#E2E8F0]" />
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#1E293B]">{route.arr_time}</p>
                        <p className="text-sm text-[#64748B]">{toName}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-[#64748B]">
                      <span className="font-semibold text-green-600">{route.available_seats} Seats Available</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 lg:min-w-[160px]">
                    <p className="text-3xl font-bold text-[#E53935]">₹{parseFloat(route.fare_str) || route.fare_str}</p>
                    <p className="text-xs text-[#64748B]">per seat</p>
                    <button
                      onClick={() => {
                        if (expandedRouteId === route.id) {
                          setExpandedRouteId(null);
                          setSelectedSeats([]);
                        } else {
                          setExpandedRouteId(route.id);
                          setSelectedSeats([]);
                        }
                      }}
                      className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all"
                    >
                      {expandedRouteId === route.id ? 'Close Seats' : 'Book Ticket'}
                    </button>
                  </div>
                </div>

                {expandedRouteId === route.id && (
                  <div className="mt-6 pt-6 border-t border-[#E2E8F0] animate-in slide-in-from-top-4 duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-7 overflow-x-auto pb-4">
                        <SeatLayout
                          layout={dummyBusLayout}
                          selectedSeats={selectedSeats.map(s => s.id)}
                          onSeatClick={handleSeatClick}
                        />
                      </div>
                      <div className="lg:col-span-5">
                        <PassengerForm
                          selectedSeats={selectedSeats}
                          totalFare={totalFare}
                          onProceedToPayment={() => alert('Proceeding to payment gateway... (Integration pending)')}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#E2E8F0] border-t-[#E53935] rounded-full animate-spin" /></div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
