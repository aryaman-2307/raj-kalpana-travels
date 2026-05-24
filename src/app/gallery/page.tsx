'use client';

import { useState } from 'react';
import { GALLERY_IMAGES } from '@/data/gallery';
import type { GalleryImage } from '@/types';

const categories = ['all', 'exterior', 'interior', 'seats', 'travel'] as const;
type Category = (typeof categories)[number];

const categoryLabels: Record<Category, string> = {
  all: 'All',
  exterior: 'Exterior',
  interior: 'Interior',
  seats: 'Seats',
  travel: 'Travel',
};

const gradientColors: Record<GalleryImage['category'], string> = {
  exterior: 'from-[#0F2B5B] to-[#1a3f7a]',
  interior: 'from-[#7c3aed] to-[#4f46e5]',
  seats: 'from-[#0d9488] to-[#059669]',
  travel: 'from-[#ea580c] to-[#dc2626]',
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredImages =
    activeCategory === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F2B5B] to-[#1a3f7a] text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Gallery
          </h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Take a look at our fleet, interiors, and the travel experiences we offer across North India.
          </p>
        </div>
      </section>

      {/* Filter Tabs + Grid */}
      <section className="py-12 md:py-16 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Gallery category filter">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#0F2B5B] text-white shadow-md'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#0F2B5B] hover:text-[#0F2B5B]'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filteredImages.length === 0 ? (
            <p className="text-center text-[#64748B] py-12">No images found for this category.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white shadow-sm hover:shadow-lg transition-shadow"
                >
                  {/* Gradient placeholder since no real images */}
                  <div
                    className={`aspect-[4/3] bg-gradient-to-br ${gradientColors[image.category]} flex items-center justify-center relative`}
                    role="img"
                    aria-label={image.alt}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="opacity-40">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-lg capitalize">
                      {image.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-[#1E293B] leading-relaxed">
                      {image.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
