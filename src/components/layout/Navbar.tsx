'use client';

import { useState } from 'react';
import MobileMenu from './MobileMenu';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Booking', href: '/booking' },
  { label: 'Manage Bookings', href: '/manage-bookings' },
  { label: 'Schedules', href: '/schedules' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2.5 group" aria-label="Raj Kalpana Travels - Home">
      {/* Location Pin with Bus Icon */}
      <svg width="42" height="42" viewBox="0 0 48 48" fill="none" className="shrink-0">
        {/* Pin shape */}
        <path
          d="M24 4C16.268 4 10 10.268 10 18c0 11 14 26 14 26s14-15 14-26c0-7.732-6.268-14-14-14z"
          fill="#0F2B5B"
          className="group-hover:fill-[#1A3D7C] transition-colors duration-300"
        />
        {/* Bus body */}
        <rect x="16" y="12" width="16" height="11" rx="2.5" fill="white" />
        {/* Bus windows */}
        <rect x="18" y="14" width="4" height="3.5" rx="0.75" fill="#0F2B5B" />
        <rect x="23.5" y="14" width="4" height="3.5" rx="0.75" fill="#0F2B5B" />
        {/* Bus bumper */}
        <rect x="17" y="23" width="14" height="2" rx="1" fill="white" opacity="0.7" />
        {/* Wheels */}
        <circle cx="19.5" cy="26" r="1.5" fill="white" />
        <circle cx="28.5" cy="26" r="1.5" fill="white" />
        {/* Headlights */}
        <rect x="16.5" y="19" width="2" height="1.5" rx="0.5" fill="#F59E0B" />
        <rect x="29.5" y="19" width="2" height="1.5" rx="0.5" fill="#F59E0B" />
      </svg>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-extrabold tracking-tight font-display">
          <span className="text-red-accent">Raj</span>
          <span className="text-navy">Kalpana</span>
        </span>
        <span className="text-[11px] font-semibold text-navy tracking-wide -mt-0.5">
          Travels Pvt. Ltd.
        </span>
      </div>
    </a>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-medium text-text rounded-full hover:bg-surface hover:text-navy transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Book Now CTA */}
              <a
                href="/booking"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-accent to-red-dark text-white text-sm font-semibold rounded-full hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Book Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-surface transition-colors"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-6 h-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
