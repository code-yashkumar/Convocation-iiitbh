import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CountdownCard from '../Countdown';

/**
 * Calendar Icon with dots matching the exact hero quick info design
 */
function HeroCalendarIcon({ className = 'w-7 h-7 text-maroon-900' }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="3" y="6" width="22" height="18" rx="4" stroke="#5E101C" strokeWidth="2" />
      <line x1="3" y1="11" x2="25" y2="11" stroke="#5E101C" strokeWidth="1.75" />
      <line x1="8" y1="3.5" x2="8" y2="7.5" stroke="#5E101C" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="3.5" x2="20" y2="7.5" stroke="#5E101C" strokeWidth="2" strokeLinecap="round" />
      <circle cx="8.5" cy="16" r="1.2" fill="#5E101C" />
      <circle cx="14" cy="16" r="1.2" fill="#5E101C" />
      <circle cx="19.5" cy="16" r="1.2" fill="#5E101C" />
      <circle cx="8.5" cy="20" r="1.2" fill="#5E101C" />
      <circle cx="14" cy="20" r="1.2" fill="#5E101C" />
    </svg>
  );
}

/**
 * Location Pin Icon matching the exact hero quick info design
 */
function HeroPinIcon({ className = 'w-7 h-7 text-maroon-900' }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M14 24C14 24 22 17.5 22 11.5C22 7.08172 18.4183 3.5 14 3.5C9.58172 3.5 6 7.08172 6 11.5C6 17.5 14 24 14 24Z"
        stroke="#5E101C"
        strokeWidth="2"
      />
      <circle cx="14" cy="11.5" r="3.5" stroke="#5E101C" strokeWidth="1.75" />
    </svg>
  );
}

/**
 * Hero section strictly matching the user's design
 */
export function Hero() {
  return (
    <section className="relative w-full pt-4 pb-12 lg:pt-8 lg:pb-16 overflow-hidden bg-cream-100">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[500px]">
          
          {/* Left Column: Typography, Details, Actions (approx 5.5 cols) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center z-10 py-4">
            
            {/* Title & Year */}
            <div className="mb-4 sm:mb-6">
              <h1 className="font-display font-bold text-[52px] sm:text-[68px] lg:text-[76px] leading-[0.95] text-charcoal-900 tracking-tight">
                CONVOCATION
              </h1>
              <div className="font-display font-bold text-[54px] sm:text-[70px] lg:text-[78px] leading-[1] text-maroon-900 mt-1">
                2026
              </div>
            </div>

            {/* Subtitle Statement */}
            <p className="font-body text-charcoal-900 text-[18px] sm:text-[22px] lg:text-[24px] leading-snug font-normal max-w-md mb-8 sm:mb-10">
              A milestone of achievement, tradition and new beginnings.
            </p>

            {/* Event Quick Info Meta Grid (2 items side-by-side) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4 mb-8 sm:mb-10">
              {/* Date Block */}
              <div className="flex items-start gap-3.5">
                <div className="shrink-0 mt-0.5">
                  <HeroCalendarIcon className="w-7 h-7 text-maroon-900" />
                </div>
                <div className="flex flex-col">
                  <span className="font-body font-semibold text-charcoal-900 text-[15px] sm:text-[16px] leading-tight">
                    18 January 2026
                  </span>
                  <span className="font-body text-charcoal-600 text-[13px] sm:text-[14px] leading-tight mt-0.5">
                    Sunday, 10:00 AM
                  </span>
                </div>
              </div>

              {/* Venue Block */}
              <div className="flex items-start gap-3.5">
                <div className="shrink-0 mt-0.5">
                  <HeroPinIcon className="w-7 h-7 text-maroon-900" />
                </div>
                <div className="flex flex-col">
                  <span className="font-body font-semibold text-charcoal-900 text-[15px] sm:text-[16px] leading-tight">
                    Main Convocation Hall
                  </span>
                  <span className="font-body text-charcoal-600 text-[13px] sm:text-[14px] leading-tight mt-0.5">
                    IIIT Bhagalpur Campus
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/registration"
                className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-pill bg-maroon-900 text-white font-body font-medium text-[15px] shadow-sm hover:bg-maroon-700 active:bg-maroon-700 transition-all focus-visible:outline-none"
              >
                Register Now
              </Link>
              <Link
                to="/schedule"
                className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-pill bg-transparent border border-charcoal-900/30 text-charcoal-900 font-body font-medium text-[15px] hover:bg-maroon-050/70 active:bg-maroon-050 transition-all gap-2.5 focus-visible:outline-none"
              >
                <span>View Schedule</span>
                <ArrowRight className="w-4 h-4 stroke-[2] text-maroon-900" />
              </Link>
            </div>
          </div>

          {/* Right Column: Authentic Convocation Photography & Floating Countdown Card */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-end">
            <div className="relative w-full max-w-[680px]">
              
              {/* Dignitaries & Academic Regalia Image with soft left feathering */}
              <div className="relative w-full overflow-hidden rounded-2xl">
                <img
                  src="/assets/dignitaries-hero.png"
                  alt="Dignitaries and graduates presenting degree scrolls in ceremonial convocation regalia"
                  className="w-full h-auto object-cover select-none"
                />
              </div>

              {/* Floating Maroon Countdown Card positioned over right side */}
              <div className="mt-6 lg:mt-0 lg:absolute lg:right-4 lg:bottom-4 w-full sm:w-[280px] z-20">
                <CountdownCard />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
