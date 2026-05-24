'use client';

import { useState, type FormEvent } from 'react';

const CITIES = [
  'Delhi',
  'Lucknow',
  'Varanasi',
  'Agra',
  'Kanpur',
  'Ujjain',
  'Jaipur',
  'Prayagraj',
  'Gorakhpur',
  'Ayodhya',
  'Mathura',
  'Bareilly',
];

export default function SearchWidget() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const today = new Date().toISOString().split('T')[0];

  function swapCities() {
    setFrom(to);
    setTo(from);
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!from) newErrors.from = 'Please select a departure city';
    if (!to) newErrors.to = 'Please select a destination city';
    if (from && to && from === to) newErrors.to = 'Destination must be different from departure';
    if (!date) newErrors.date = 'Please select a travel date';
    if (date && date < today) newErrors.date = 'Date cannot be in the past';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) {
      const params = new URLSearchParams({ from, to, date });
      window.location.href = `/search-results?${params.toString()}`;
    }
  }

  return (
    <div className="relative z-20 -mt-20 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-border/50">
          {/* Section Title */}
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
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    if (errors.from) setErrors((prev) => ({ ...prev, from: '' }));
                  }}
                  className={`w-full px-4 py-3 bg-surface border rounded-xl text-text text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all ${
                    errors.from ? 'border-red-accent' : 'border-border'
                  }`}
                >
                  <option value="">Select City</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
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
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                    if (errors.to) setErrors((prev) => ({ ...prev, to: '' }));
                  }}
                  className={`w-full px-4 py-3 bg-surface border rounded-xl text-text text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all ${
                    errors.to ? 'border-red-accent' : 'border-border'
                  }`}
                >
                  <option value="">Select City</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
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
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-red-accent to-red-dark text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
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
