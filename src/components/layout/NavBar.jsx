import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import InstitutionCrest from '../ui/InstitutionCrest';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Notice', to: '/notices' },
  { label: 'Dignitaries', to: '/#dignitaries', isSectionLink: true, sectionId: 'dignitaries' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Archive', to: '/archive' },
  { label: 'Information', to: '/information' },
  { label: 'Committee', to: '/committee' },
];

/**
 * NavBar component floating transparently over the hero image top
 */
export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  // Handle URL hash smooth scrolling
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location]);

  // Smooth scroll handler for in-page section links
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

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

  const isHeroMode = location.pathname === '/' && !isScrolled;

  return (
    <header
      data-navbar-hero={isHeroMode ? 'true' : 'false'}
      data-darkreader-ignore={isHeroMode ? 'true' : undefined}
      style={isHeroMode ? { colorScheme: 'light' } : undefined}
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-nav ${
        isScrolled
          ? 'bg-cream-100/90 backdrop-blur-md shadow-sm border-b border-border/60'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-16 md:h-[4.5rem] flex items-center justify-between gap-4">
        
        {/* Left: Crest + Full Institution Wordmark (Redirects to official Institute portal) */}
        <a
          href="https://www.iiitbh.ac.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group focus-visible:outline-none shrink-0"
          aria-label="IIIT Bhagalpur Official Website"
        >
          <InstitutionCrest className="navbar-crest w-8 h-8 sm:w-11 sm:h-11 shrink-0 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col whitespace-nowrap">
            <span className="navbar-title sm:hidden font-display font-bold text-sm text-charcoal-900 leading-tight tracking-wider uppercase">
              IIIT Bhagalpur
            </span>
            <span className="navbar-title hidden sm:inline font-display font-bold text-sm md:text-base text-charcoal-900 leading-tight whitespace-nowrap">
              Indian Institute of Information Technology Bhagalpur
            </span>
            <span className="navbar-subtext hidden sm:inline font-body text-[0.6875rem] md:text-xs text-charcoal-600 leading-tight mt-0.5 whitespace-nowrap">
              भारतीय सूचना प्रौद्योगिकी संस्थान भागलपुर
            </span>
          </div>
        </a>

        {/* Center/Right Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            if (link.isSectionLink) {
              return (
                <a
                  key={link.label}
                  href={`#${link.sectionId}`}
                  onClick={(e) => handleSectionClick(e, link.sectionId)}
                  className="navbar-link relative group text-sm font-body text-charcoal-900/80 hover:text-maroon-900 font-medium py-1.5 whitespace-nowrap transition-colors duration-200 focus-visible:outline-none cursor-pointer"
                >
                  <span>{link.label}</span>
                  {/* Progressing expanding maroon underline on hover */}
                  <span className="absolute bottom-0 left-0 h-[0.15625rem] bg-maroon-900 w-0 group-hover:w-full transition-all duration-300 ease-out rounded-full" />
                </a>
              );
            }

            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `navbar-link relative group text-sm font-body py-1.5 whitespace-nowrap focus-visible:outline-none transition-colors duration-200 ${
                    isActive
                      ? 'active text-maroon-900 font-bold'
                      : 'text-charcoal-900/80 hover:text-maroon-900 font-medium'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {/* Progressing expanding maroon underline on hover and solid on active */}
                    <span
                      className={`absolute bottom-0 left-0 h-[0.15625rem] bg-maroon-900 transition-all duration-300 ease-out rounded-full ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop CTA Button (Strictly in 1 single line) */}
        <div className="hidden lg:flex items-center shrink-0">
          <a
            href="https://forms.gle/1nxVrpcRUfgMhH938"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-btn-cta inline-flex items-center justify-center min-h-[2.75rem] px-6 rounded-pill bg-maroon-900 text-white font-body font-medium text-sm whitespace-nowrap shadow-sm hover:bg-maroon-700 active:bg-maroon-700 transition-all focus-visible:outline-none cursor-pointer"
          >
            Register Now
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button (< lg) */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          className="navbar-hamburger-btn lg:hidden inline-flex items-center justify-center w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-xl text-maroon-900 hover:bg-maroon-050/70 active:bg-maroon-050 transition-colors focus-visible:outline-none cursor-pointer"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 stroke-[2.4] text-maroon-900" aria-hidden="true" />
          ) : (
            <svg
              className="w-6 h-6 text-maroon-900"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3.5" y1="6" x2="20.5" y2="6" />
              <line x1="3.5" y1="12" x2="20.5" y2="12" />
              <line x1="3.5" y1="18" x2="20.5" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Full-Screen Overlay Navigation */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-16 md:top-[4.25rem] z-50 bg-cream-100/98 backdrop-blur-xl flex flex-col p-6 space-y-6 lg:hidden animate-fadeIn overflow-y-auto"
        >
          <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => {
              if (link.isSectionLink) {
                return (
                  <a
                    key={link.label}
                    href={`#${link.sectionId}`}
                    onClick={(e) => handleSectionClick(e, link.sectionId)}
                    className="py-3 px-4 rounded-xl text-base font-body font-semibold text-charcoal-900 hover:bg-maroon-050/70 active:bg-maroon-050 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `py-3 px-4 rounded-xl text-base font-body transition-colors ${
                      isActive
                        ? 'bg-maroon-050 text-maroon-900 font-bold border-l-4 border-maroon-900'
                        : 'text-charcoal-900 hover:bg-maroon-050/70 font-semibold'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#E8E2D8]">
            <a
              href="https://forms.gle/1nxVrpcRUfgMhH938"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full min-h-[3rem] px-6 rounded-pill bg-maroon-900 text-white font-body font-semibold text-[0.9375rem] shadow-sm hover:bg-maroon-700 active:bg-maroon-700 transition-all text-center whitespace-nowrap cursor-pointer"
            >
              Register Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default NavBar;
