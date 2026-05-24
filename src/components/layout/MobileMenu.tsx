'use client';

import { useEffect, useRef, useCallback } from 'react';

const COMPANY_PHONE = '9355777632';
const COMPANY_EMAIL = 'Info@rajkalpanatravels.com';

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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      // Focus first element
      setTimeout(() => firstFocusableRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex items-center gap-2">
              {/* Small logo */}
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <path d="M20 2C13.373 2 8 7.373 8 14c0 9 12 24 12 24s12-15 12-24c0-6.627-5.373-12-12-12z" fill="#0F2B5B" />
                <rect x="14" y="10" width="12" height="8" rx="2" fill="white" />
                <circle cx="16" cy="20" r="1.5" fill="white" />
                <circle cx="24" cy="20" r="1.5" fill="white" />
              </svg>
              <span className="font-display font-bold text-lg">
                <span className="text-red-accent">Raj</span>
                <span className="text-navy">Kalpana</span>
              </span>
            </div>
            <button
              ref={firstFocusableRef}
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-surface transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-4 px-3">
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-text hover:bg-surface hover:text-navy font-medium transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="mt-4 px-4">
              <a
                href="/booking"
                onClick={onClose}
                className="block w-full text-center py-3 px-6 bg-gradient-to-r from-red-accent to-red-dark text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
              >
                Book Now
              </a>
            </div>
          </nav>

          {/* Login Links */}
          <div className="border-t border-border px-5 py-4">
            <div className="flex gap-3">
              <a
                href="/customer-login"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-border rounded-xl text-sm font-medium text-text hover:bg-surface transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Customer
              </a>
              <a
                href="/agent-login"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-border rounded-xl text-sm font-medium text-text hover:bg-surface transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Agent
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-border px-5 py-4 bg-surface">
            <div className="space-y-2.5 text-sm text-muted">
              <a href={`tel:+91${COMPANY_PHONE}`} className="flex items-center gap-2 hover:text-navy transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 {COMPANY_PHONE}
              </a>
              <a href={`mailto:${COMPANY_EMAIL}`} className="flex items-center gap-2 hover:text-navy transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {COMPANY_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
