import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import InstitutionCrest from '../ui/InstitutionCrest';

const NAV_LINKS = [
  { label: 'Convocation', to: '/' },
  { label: 'Notice', to: '/notices' },
  { label: 'Registration', to: '/registration' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Archive', to: '/archive' },
  { label: 'Information', to: '/information' },
];

/**
 * NavBar component floating transparently over the hero image top
 */
export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-nav ${
        isScrolled
          ? 'bg-cream-100/90 backdrop-blur-md shadow-sm border-b border-border/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 h-20 md:h-[88px] flex items-center justify-between gap-4">
        
        {/* Left: Crest + Full Institution Wordmark in 1 single line */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus-visible:outline-none shrink-0"
          aria-label="IIIT Bhagalpur Convocation Portal Home"
        >
          <InstitutionCrest className="w-10 h-10 sm:w-11 sm:h-11 shrink-0" />
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-display font-bold text-[13px] sm:text-[15px] xl:text-[16px] text-charcoal-900 leading-tight whitespace-nowrap">
              Indian Institute of Information Technology Bhagalpur
            </span>
            <span className="font-body text-[10.5px] sm:text-[11.5px] text-charcoal-600 leading-tight mt-0.5 whitespace-nowrap">
              भारतीय सूचना प्रौद्योगिकी संस्थान भागलपुर
            </span>
          </div>
        </Link>

        {/* Center/Right Desktop Navigation Links (Clean text, no capsule, no borders) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-[14px] xl:text-[15px] font-body transition-colors py-1 whitespace-nowrap focus-visible:outline-none ${
                  isActive
                    ? 'text-charcoal-900 font-bold'
                    : 'text-charcoal-900/80 hover:text-maroon-900 font-medium'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA Button (Strictly in 1 single line) */}
        <div className="hidden lg:flex items-center shrink-0">
          <Link
            to="/registration"
            className="inline-flex items-center justify-center min-h-[42px] px-6 rounded-pill bg-maroon-900 text-white font-body font-medium text-[14px] xl:text-[15px] whitespace-nowrap shadow-sm hover:bg-maroon-700 active:bg-maroon-700 transition-all focus-visible:outline-none"
          >
            Register Now
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-pill text-charcoal-900 hover:bg-maroon-050 transition-colors focus-visible:outline-none"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 stroke-[2]" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6 stroke-[2]" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Full-Screen Overlay Navigation */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-20 z-50 bg-cream-100 flex flex-col p-6 space-y-6 lg:hidden animate-fadeIn overflow-y-auto"
        >
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-4 rounded-md text-lg font-body font-semibold transition-colors ${
                    isActive
                      ? 'bg-maroon-050 text-maroon-900'
                      : 'text-charcoal-900 hover:bg-maroon-050/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-4 border-t border-border">
            <Link
              to="/registration"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center w-full min-h-[48px] px-6 rounded-pill bg-maroon-900 text-white font-body font-semibold text-[16px] shadow-sm hover:bg-maroon-700 transition-all text-center whitespace-nowrap"
            >
              Register Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default NavBar;
