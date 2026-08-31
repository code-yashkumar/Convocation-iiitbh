import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CountdownCard from '../Countdown';
import InformationBar from '../InformationBar';

/**
 * Calendar Icon matching the hero quick info design
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
 * Location Pin Icon matching the hero quick info design
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
 * Hero Section strictly matching the reference UI mockup
 * Layer 1: Main Hero Area (Photographic backdrop, typography, countdown) - Protected from Dark Reader
 * Layer 2: Event Information Bar - Light in normal mode, custom dark maroon in Dark Reader mode
 */
export function Hero() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
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

  return (
    <section
      id="hero-section"
      data-darkreader-ignore="true"
      className="relative w-full min-h-screen lg:h-screen lg:min-h-[720px] lg:max-h-[960px] flex flex-col justify-between pt-20 md:pt-24 pb-6 overflow-hidden bg-cream-100"
    >
      {/* 1. Full-width Background Image Layer for Desktop (lg+) */}
      <div
        data-darkreader-ignore="true"
        className="hero-bg-layer hidden lg:block absolute inset-0 bg-no-repeat bg-right-top bg-cover xl:bg-contain pointer-events-none z-0"
        style={{
          backgroundImage: "url('/assets/convocation-hero-bg.png')",
        }}
      />

      {/* 2. Main Hero Area (Content Block: CONVOCATION 2026, Details, CTAs, Countdown) */}
      <div
        id="main-hero-area"
        data-darkreader-ignore="true"
        className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-12 relative z-10 flex-1 flex items-center py-2 sm:py-4 lg:py-2"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column: Hero Content Block */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center">
            
            {/* Title & Year */}
            <div className="mb-2 sm:mb-4">
              <h1 className="hero-title-main font-display font-bold text-[38px] sm:text-[52px] lg:text-[76px] xl:text-[82px] leading-[0.94] lg:leading-[0.92] text-charcoal-900 tracking-tight">
                <span className="hero-title-main lg:hidden">Convocation</span>
                <span className="hero-title-main hidden lg:inline">CONVOCATION</span>
                <span className="hero-title-maroon block font-display font-bold text-[42px] sm:text-[56px] lg:text-[78px] xl:text-[84px] leading-[1] text-maroon-900 mt-0.5 sm:mt-1">
                  2026
                </span>
              </h1>
            </div>

            {/* Subtitle Statement */}
            <p className="hero-subtitle font-body text-charcoal-700 sm:text-charcoal-900 text-[14px] sm:text-[17px] lg:text-[24px] leading-[1.4] sm:leading-snug font-normal max-w-md mb-6 sm:mb-8">
              <span>A milestone of achievement,</span>
              <span className="block sm:inline sm:ml-1">tradition and new beginnings.</span>
            </p>

            {/* Event Quick Info Meta (Date + Venue) */}
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3.5 sm:gap-6 max-w-lg mb-6 sm:mb-8">
              {/* Date Block */}
              <div className="flex items-center sm:items-start gap-3 sm:gap-3.5">
                <div className="shrink-0">
                  <HeroCalendarIcon className="hero-icon-maroon w-6 h-6 sm:w-7 sm:h-7 text-maroon-900" />
                </div>
                <div className="flex flex-col">
                  <span className="hero-meta-title font-body font-bold sm:font-semibold text-charcoal-900 text-[13.5px] sm:text-[15px] lg:text-[16px] leading-tight">
                    26 September 2026
                  </span>
                  <span className="hero-meta-sub font-body text-charcoal-600 text-[12px] sm:text-[13px] lg:text-[14px] leading-tight mt-0.5">
                    Saturday, 10:00 AM
                  </span>
                </div>
              </div>

              {/* Venue Block */}
              <div className="flex items-center sm:items-start gap-3 sm:gap-3.5">
                <div className="shrink-0">
                  <HeroPinIcon className="hero-icon-maroon w-6 h-6 sm:w-7 sm:h-7 text-maroon-900" />
                </div>
                <div className="flex flex-col">
                  <span className="hero-meta-title font-body font-bold sm:font-semibold text-charcoal-900 text-[13.5px] sm:text-[15px] lg:text-[16px] leading-tight">
                    Main Lecture Hall
                  </span>
                  <span className="hero-meta-sub font-body text-charcoal-600 text-[12px] sm:text-[13px] lg:text-[14px] leading-tight mt-0.5">
                    IIIT Bhagalpur Campus
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 w-full lg:w-auto">
              <a
                href="#registration"
                onClick={(e) => handleScrollToSection(e, 'registration')}
                className="hero-btn-primary w-full lg:w-auto inline-flex items-center justify-center min-h-[50px] lg:min-h-[46px] px-8 rounded-[14px] lg:rounded-pill bg-maroon-900 text-white font-body font-semibold text-[15px] shadow-sm hover:bg-maroon-700 active:bg-maroon-700 transition-all focus-visible:outline-none cursor-pointer text-center"
              >
                Register Now
              </a>
              <a
                href="#schedule"
                onClick={(e) => handleScrollToSection(e, 'schedule')}
                className="hero-btn-secondary group w-full lg:w-auto inline-flex items-center justify-between lg:justify-center min-h-[50px] lg:min-h-[46px] px-6 lg:px-7 rounded-[14px] lg:rounded-pill bg-[#FBF9F6] border border-maroon-900 lg:border-maroon-900/30 text-maroon-900 font-body font-semibold text-[15px] shadow-xs lg:hover:border-maroon-900 hover:bg-white hover:shadow-md transition-all duration-200 gap-2.5 focus-visible:outline-none cursor-pointer text-center"
              >
                <span className="flex-1 lg:flex-none text-center">View Schedule</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] text-maroon-900 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            </div>

            {/* Mobile Countdown Card (< lg) positioned directly under CTA buttons */}
            <div className="lg:hidden w-full mt-5">
              <CountdownCard className="countdown-card" />
            </div>

          </div>

        </div>
      </div>

      {/* Desktop Countdown Card: Anchored with clear bottom spacing above the Information Bar */}
      <div className="hidden lg:block absolute right-8 sm:right-12 lg:right-14 xl:right-20 bottom-[136px] sm:bottom-[142px] lg:bottom-[148px] xl:bottom-[154px] w-[235px] xl:w-[250px] z-30">
        <CountdownCard className="countdown-card" />
      </div>

      {/* 3. Bottom Event Information Bar Container */}
      <div id="event-info-bar-container" className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-12 relative z-20 mt-4 lg:mt-2">
        <InformationBar />
      </div>

    </section>
  );
}

export default Hero;
