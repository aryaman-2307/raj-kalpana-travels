'use client';

import { useState, useMemo } from 'react';
import { ROUTES } from '@/data/routes';
import { CITIES } from '@/data/cities';
import Link from 'next/link';

const PAGE_SIZE = 10;

export default function SchedulesPage() {
  const [fromFilter, setFromFilter] = useState('');
  const [toFilter, setToFilter] = useState('');
  const [busTypeFilter, setBusTypeFilter] = useState('');
  const [page, setPage] = useState(1);

  const busTypes = [...new Set(ROUTES.map((r) => r.busType))];

  const filtered = useMemo(() => {
    return ROUTES.filter((r) => {
      if (fromFilter && r.from !== fromFilter) return false;
      if (toFilter && r.to !== toFilter) return false;
      if (busTypeFilter && r.busType !== busTypeFilter) return false;
      return true;
    });
  }, [fromFilter, toFilter, busTypeFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-gradient-to-br from-[#0F2B5B] to-[#1A3D7C] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F59E0B]">All Routes</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold font-[family-name:var(--font-plus-jakarta-sans)]">Bus Schedules</h1>
          <p className="mt-3 text-white/70">Browse all available routes and timings.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="s-from" className="block text-xs font-semibold text-[#64748B] mb-1">From</label>
            <select id="s-from" value={fromFilter} onChange={(e) => { setFromFilter(e.target.value); setPage(1); }} className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm bg-white">
              <option value="">All Cities</option>
              {CITIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="s-to" className="block text-xs font-semibold text-[#64748B] mb-1">To</label>
            <select id="s-to" value={toFilter} onChange={(e) => { setToFilter(e.target.value); setPage(1); }} className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm bg-white">
              <option value="">All Cities</option>
              {CITIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="s-type" className="block text-xs font-semibold text-[#64748B] mb-1">Bus Type</label>
            <select id="s-type" value={busTypeFilter} onChange={(e) => { setBusTypeFilter(e.target.value); setPage(1); }} className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm bg-white">
              <option value="">All Types</option>
              {busTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <p className="text-sm text-[#64748B] mb-4">{filtered.length} route{filtered.length !== 1 ? 's' : ''} found</p>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0F2B5B] text-white">
                  <th className="text-left px-6 py-4 font-semibold">Route</th>
                  <th className="text-left px-6 py-4 font-semibold">Departure</th>
                  <th className="text-left px-6 py-4 font-semibold">Arrival</th>
                  <th className="text-left px-6 py-4 font-semibold">Duration</th>
                  <th className="text-left px-6 py-4 font-semibold">Bus Type</th>
                  <th className="text-right px-6 py-4 font-semibold">Price</th>
                  <th className="text-center px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((route, i) => (
                  <tr key={route.id} className={`border-t border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors ${i % 2 === 0 ? '' : 'bg-[#FAFAFA]'}`}>
                    <td className="px-6 py-4 font-medium text-[#1E293B]">{route.from} → {route.to}</td>
                    <td className="px-6 py-4 text-[#64748B]">{route.departureTime}</td>
                    <td className="px-6 py-4 text-[#64748B]">{route.arrivalTime}</td>
                    <td className="px-6 py-4 text-[#64748B]">{route.duration}</td>
                    <td className="px-6 py-4"><span className="bg-[#0F2B5B]/10 text-[#0F2B5B] text-xs px-2 py-1 rounded-full">{route.busType}</span></td>
                    <td className="px-6 py-4 text-right font-bold text-[#E53935]">₹{route.price}</td>
                    <td className="px-6 py-4 text-center">
                      <Link href={`/routes/${route.slug}`} className="text-sm font-semibold text-[#E53935] hover:text-[#C62828] transition-colors">View →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-sm font-medium disabled:opacity-40 hover:bg-white transition-colors">Prev</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? 'bg-[#E53935] text-white' : 'border border-[#E2E8F0] hover:bg-white'}`}>{i + 1}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-sm font-medium disabled:opacity-40 hover:bg-white transition-colors">Next</button>
          </div>
        )}
      </div>
    </section>
  );
}
