import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Award } from 'lucide-react';
import Button from '../ui/Button';

const NAV_LINKS = [
  { label: 'Overview', to: '/' },
  { label: 'Schedule', to: '/schedule' },
  { label: 'Registration', to: '/registration' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Archive', to: '/archive' },
  { label: 'Information', to: '/information' },
];

/**
 * NavBar component strictly conforming to DESIGN_SYSTEM.md Section 5.2 & Section 6
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
      className={`sticky top-0 z-40 w-full transition-all duration-nav ${
        isScrolled
          ? 'bg-bg-surface/95 backdrop-blur-md shadow-card border-b border-border/80'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-container mx-auto px-5 sm:px-10 lg:px-20 h-16 md:h-[88px] flex items-center justify-between">
        {/* Left: Crest + Institution Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus-visible:outline-none"
          aria-label="IIIT Bhagalpur Convocation Home"
        >
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-md bg-maroon-900 flex items-center justify-center text-cream-100 shadow-card">
            <Award className="w-6 h-6 text-gold-500 stroke-[1.75]" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-[16px] md:text-[18px] leading-tight text-maroon-900 tracking-tight">
              IIIT BHAGALPUR
            </span>
            <span className="type-label text-charcoal-600 tracking-wider uppercase text-[11px] md:text-[12px]">
              Annual Convocation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `type-label transition-all py-1 focus-visible:outline-none relative ${
                  isActive
                    ? 'text-action-primary font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-action-primary'
                    : 'text-text-default hover:text-action-primary font-medium'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center">
          <Button to="/registration" variant="primary" size="compact">
            Register Now
          </Button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-pill text-text-default hover:bg-maroon-050 transition-colors focus-visible:outline-none"
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
          className="fixed inset-0 top-16 z-50 bg-bg-page flex flex-col p-6 space-y-6 lg:hidden animate-fadeIn overflow-y-auto"
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
                      ? 'bg-maroon-050 text-action-primary'
                      : 'text-text-default hover:bg-maroon-050/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-4 border-t border-border">
            <Button
              to="/registration"
              variant="primary"
              fullWidth
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default NavBar;
