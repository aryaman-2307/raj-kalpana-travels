'use client';

const COMPANY_NAME = 'Raj Kalpana Travels Pvt. Ltd.';
const COMPANY_PHONE = '9355777632';
const COMPANY_EMAIL = 'Info@rajkalpanatravels.com';
const COMPANY_ADDRESS = 'Ground Floor, Shop No. 52, Gokhle Market, Tis Hazari, Delhi, Delhi-110054';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Booking', href: '/booking' },
  { label: 'Schedules', href: '/schedules' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const POLICY_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cancellation Policy', href: '/cancellation-policy' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'FAQs', href: '/faqs' },
];

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-navy to-[#091D40] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 - Company Info */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <a href="/" className="inline-flex items-center gap-2.5 mb-5">
              <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                <path d="M24 4C16.268 4 10 10.268 10 18c0 11 14 26 14 26s14-15 14-26c0-7.732-6.268-14-14-14z" fill="white" />
                <rect x="16" y="12" width="16" height="11" rx="2.5" fill="#0F2B5B" />
                <rect x="18" y="14" width="4" height="3.5" rx="0.75" fill="white" />
                <rect x="23.5" y="14" width="4" height="3.5" rx="0.75" fill="white" />
                <circle cx="19.5" cy="26" r="1.5" fill="#0F2B5B" />
                <circle cx="28.5" cy="26" r="1.5" fill="#0F2B5B" />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-extrabold tracking-tight font-display">
                  <span className="text-red-accent">Raj</span>
                  <span className="text-white">Kalpana</span>
                </span>
                <span className="text-[10px] font-semibold text-white/60 tracking-wide">
                  Travels Pvt. Ltd.
                </span>
              </div>
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Your trusted travel partner for comfortable, safe, and affordable bus journeys across India.
              Book with confidence and travel with joy.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-red-accent hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-5 font-display">Quick Links</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-amber transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg className="w-3 h-3 text-red-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Policies */}
          <div>
            <h3 className="text-base font-bold mb-5 font-display">Policies</h3>
            <ul className="space-y-3">
              {POLICY_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-amber transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg className="w-3 h-3 text-red-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact + Newsletter */}
          <div>
            <h3 className="text-base font-bold mb-5 font-display">Contact Us</h3>
            <div className="space-y-3.5 mb-7">
              <div className="flex items-start gap-3 text-sm text-white/60">
                <svg className="w-4 h-4 mt-0.5 text-red-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{COMPANY_ADDRESS}</span>
              </div>
              <a href={`tel:+91${COMPANY_PHONE}`} className="flex items-center gap-3 text-sm text-white/60 hover:text-amber transition-colors">
                <svg className="w-4 h-4 text-red-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 {COMPANY_PHONE}</span>
              </a>
              <a href={`mailto:${COMPANY_EMAIL}`} className="flex items-center gap-3 text-sm text-white/60 hover:text-amber transition-colors">
                <svg className="w-4 h-4 text-red-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{COMPANY_EMAIL}</span>
              </a>
            </div>

            {/* Newsletter */}
            <h4 className="text-sm font-semibold mb-3">Subscribe to Newsletter</h4>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2.5 bg-white/10 border border-white/10 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/50 transition-all"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-red-accent hover:bg-red-dark text-white text-sm font-semibold rounded-full transition-colors duration-200"
                aria-label="Subscribe"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/40">
            <p>© 2025 {COMPANY_NAME}. All rights reserved.</p>
            <p>
              Designed & Developed by{' '}
              <a href="#" className="text-amber hover:text-white transition-colors">
                Tatkrith Solutions
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
