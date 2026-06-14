'use client';

import { useState, useEffect, type FormEvent } from 'react';

interface CityOption {
  id: string;
  name: string;
}

export default function SearchWidget() {
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [cities, setCities] = useState<CityOption[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await fetch('/api/search?action=destination_pairs');
        const data = await res.json();
        
        if (data && data.body) {
           const cityMap = new Map<string, string>();
           data.body.forEach((pair: any) => {
             if (pair.origin) cityMap.set(pair.origin.id.toString(), pair.origin.name);
             if (pair.destination) cityMap.set(pair.destination.id.toString(), pair.destination.name);
           });
           
           const uniqueCities = Array.from(cityMap.entries())
             .map(([id, name]) => ({ id, name }))
             .sort((a, b) => a.name.localeCompare(b.name));
             
           setCities(uniqueCities);
        }
      } catch (err) {
        console.error('Failed to fetch destinations', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  function swapCities() {
    setFromId(toId);
    setToId(fromId);
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!fromId) newErrors.from = 'Please select a departure city';
    if (!toId) newErrors.to = 'Please select a destination city';
    if (fromId && toId && fromId === toId) newErrors.to = 'Destination must be different from departure';
    if (!date) newErrors.date = 'Please select a travel date';
    if (date && date < today) newErrors.date = 'Date cannot be in the past';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) {
      const fromName = cities.find(c => c.id === fromId)?.name || '';
      const toName = cities.find(c => c.id === toId)?.name || '';
      
      const params = new URLSearchParams({ 
        fromId, 
        toId, 
        fromName,
        toName,
        date 
      });
      window.location.href = `/search-results?${params.toString()}`;
    }
  }

  return (
    <div className="relative z-20 -mt-20 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-border/50">
          <div className="mb-6 text-center">
            <h2 className="text-lg md:text-xl font-bold text-text font-display">
              Search Buses
            </h2>
            <p className="text-sm text-muted mt-1">Find the best bus for your journey</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr_auto] gap-4 items-end">
              {/* From */}
              <div>
                <label htmlFor="search-from" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  From
                </label>
                <select
                  id="search-from"
                  value={fromId}
                  onChange={(e) => {
                    setFromId(e.target.value);
                    if (errors.from) setErrors((prev) => ({ ...prev, from: '' }));
                  }}
                  disabled={loading}
                  className={`w-full px-4 py-3 bg-surface border rounded-xl text-text text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all ${
                    errors.from ? 'border-red-accent' : 'border-border'
                  }`}
                >
                  <option value="">{loading ? 'Loading...' : 'Select City'}</option>
                  {cities.map((city) => (
                    <option key={`from-${city.id}`} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.from && (
                  <p className="text-red-accent text-xs mt-1">{errors.from}</p>
                )}
              </div>

              {/* Swap Button */}
              <div className="flex justify-center md:pb-1">
                <button
                  type="button"
                  onClick={swapCities}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-surface hover:bg-navy hover:text-white hover:border-navy text-muted transition-all duration-200 rotate-90 md:rotate-0"
                  aria-label="Swap cities"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
              </div>

              {/* To */}
              <div>
                <label htmlFor="search-to" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  To
                </label>
                <select
                  id="search-to"
                  value={toId}
                  onChange={(e) => {
                    setToId(e.target.value);
                    if (errors.to) setErrors((prev) => ({ ...prev, to: '' }));
                  }}
                  disabled={loading}
                  className={`w-full px-4 py-3 bg-surface border rounded-xl text-text text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all ${
                    errors.to ? 'border-red-accent' : 'border-border'
                  }`}
                >
                  <option value="">{loading ? 'Loading...' : 'Select City'}</option>
                  {cities.map((city) => (
                    <option key={`to-${city.id}`} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.to && (
                  <p className="text-red-accent text-xs mt-1">{errors.to}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label htmlFor="search-date" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Journey Date
                </label>
                <input
                  type="date"
                  id="search-date"
                  value={date}
                  min={today}
                  onChange={(e) => {
                    setDate(e.target.value);
                    if (errors.date) setErrors((prev) => ({ ...prev, date: '' }));
                  }}
                  className={`w-full px-4 py-3 bg-surface border rounded-xl text-text text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all ${
                    errors.date ? 'border-red-accent' : 'border-border'
                  }`}
                />
                {errors.date && (
                  <p className="text-red-accent text-xs mt-1">{errors.date}</p>
                )}
              </div>

              {/* Search Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-red-accent to-red-dark text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
