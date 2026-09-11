import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import CountdownCard from '../Countdown';
import InformationBar from '../InformationBar';

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
      className="relative w-full min-h-screen lg:h-[100dvh] flex flex-col justify-between pt-16 lg:pt-[5rem] pb-[1rem] lg:pb-[1.5rem] overflow-hidden bg-[#F4E6DD] lg:bg-[#F7F4EE]"
    >
      {/* 1. Full-Height Photographic Background Layer (Desktop: lg+) - Preserves 100% full original photograph without cropping */}
      <div
        data-darkreader-ignore="true"
        className="hero-bg-layer hero-bg-layer-desktop hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      >
        {/* Layer 2: The complete original photograph anchored to the right at full natural aspect ratio */}
        <img
          src="/assets/convocation-hero-bg.png"
          alt="IIIT Bhagalpur 3rd Convocation Dignitaries and Students"
          className="absolute right-0 top-0 bottom-0 h-full w-auto max-w-none object-cover object-right select-none pointer-events-none"
          draggable={false}
        />
        {/* Layer 3: Seamless Left Gradient Blend Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #F7F4EE 0%, #F7F4EE 18%, rgba(247, 244, 238, 0.85) 30%, rgba(247, 244, 238, 0.4) 42%, transparent 54%)',
          }}
        />
      </div>

      {/* 2. Photographic Background Layer (Mobile/Tablet: < lg) with Seamless Gradient Extension */}
      <div
        data-darkreader-ignore="true"
        className="hero-bg-layer hero-bg-layer-mobile block lg:hidden absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      >
        <img
          src="/assets/convocation-hero-mobile.png"
          alt="IIIT Bhagalpur Convocation Dignitaries and Student"
          className="absolute right-0 top-0 bottom-0 h-full w-full object-cover object-[right_center] select-none pointer-events-none"
          draggable={false}
        />
        {/* Seamless Gradient Overlay matching background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #F4E6DD 0%, rgba(244, 230, 221, 0.95) 25%, rgba(244, 230, 221, 0.72) 48%, rgba(244, 230, 221, 0.25) 75%, transparent 100%)',
          }}
        />
      </div>

      {/* 2. Main Hero Content Area (Content Block: 3rd CONVOCATION 2026, Details, CTAs, Countdown) */}
      <div
        id="main-hero-area"
        data-darkreader-ignore="true"
        className="w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-10 lg:px-12 relative z-10 flex-1 flex items-center pt-2 sm:pt-3 pb-4 lg:py-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column: Hero Content Block */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center">
            
            {/* Title & Year */}
            <div className="mb-2 sm:mb-4 -mt-1 sm:mt-0">
              <h1
                style={{ fontFamily: '"Frank Ruhl Libre", "Playfair Display", Georgia, serif' }}
                className="hero-title-main font-frank font-bold text-4xl md:text-5xl lg:text-[4.5rem] leading-[1.02] lg:leading-[1.0] text-charcoal-900 tracking-tight"
              >
                <span className="hero-title-main lg:hidden">
                  3<span className="text-[0.62em] lowercase align-super font-semibold mr-2">rd</span> Convocation
                </span>
                <span className="hero-title-main hidden lg:inline">
                  <span className="block mb-0.5 lg:mb-0.5">
                    3<span className="text-[0.62em] lowercase align-super font-semibold">rd</span>
                  </span>
                  <span>CONVOCATION</span>
                </span>
                <span
                  style={{ fontFamily: '"Frank Ruhl Libre", "Playfair Display", Georgia, serif' }}
                  className="hero-title-maroon block font-frank font-bold text-5xl md:text-6xl lg:text-[5rem] leading-[1] text-maroon-900 mt-2 sm:mt-2.5 lg:mt-3"
                >
                  2026
                </span>
              </h1>
            </div>

            {/* Subtitle Statement */}
            <p className="hero-subtitle font-body text-charcoal-700 md:text-charcoal-900 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-normal max-w-md mb-5 sm:mb-6">
              <span>A milestone of achievement,</span>
              <span className="block sm:inline sm:ml-1">tradition and new beginnings.</span>
            </p>

            {/* Mobile Event Details (< lg) strictly matching reference layout */}
            <div className="lg:hidden flex flex-col gap-3.5 sm:gap-4 mb-6 sm:mb-8">
              {/* Date & Time Item */}
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center text-maroon-900">
                  <Calendar className="w-6 h-6 min-[360px]:w-7 min-[360px]:h-7 sm:w-8 sm:h-8 stroke-[1.8]" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="font-body font-bold text-sm sm:text-base text-charcoal-900 leading-snug">
                    26 September 2026
                  </span>
                  <span className="font-body text-xs sm:text-sm text-charcoal-600 leading-tight mt-0.5">
                    Saturday, 10:00 AM
                  </span>
                </div>
              </div>

              {/* Venue & Location Item */}
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center text-maroon-900">
                  <MapPin className="w-6 h-6 min-[360px]:w-7 min-[360px]:h-7 sm:w-8 sm:h-8 stroke-[1.8]" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="font-body font-bold text-sm sm:text-base text-charcoal-900 leading-snug">
                    Town Hall
                  </span>
                  <span className="font-body text-xs sm:text-sm text-charcoal-600 leading-tight mt-0.5">
                    Bhagalpur
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Full width & stacked on all mobile (< md), horizontal on md+ */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 lg:gap-4 w-full md:w-auto">
              <a
                href="https://forms.gle/1nxVrpcRUfgMhH938"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-primary w-full md:w-auto inline-flex items-center justify-center min-h-[3rem] px-8 rounded-[0.875rem] lg:rounded-pill bg-maroon-900 text-white font-body font-semibold text-base shadow-sm hover:bg-maroon-700 active:scale-[0.97] transition-all duration-200 focus-visible:outline-none cursor-pointer text-center"
              >
                Register Now
              </a>
              <a
                href="#schedule"
                onClick={(e) => handleScrollToSection(e, 'schedule')}
                className="hero-btn-secondary group w-full md:w-auto inline-flex items-center justify-between md:justify-center min-h-[3rem] px-6 rounded-[0.875rem] lg:rounded-pill bg-[#FBF9F6] border border-maroon-900 lg:border-maroon-900/30 lg:hover:border-maroon-900 text-maroon-900 font-body font-semibold text-base shadow-xs hover:bg-white hover:shadow-md active:scale-[0.97] transition-all duration-200 gap-2.5 focus-visible:outline-none cursor-pointer text-center"
              >
                <span className="flex-1 md:flex-none text-center">View Schedule</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] text-maroon-900 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            </div>

            {/* Mobile Countdown Card (< lg) positioned directly under CTA buttons */}
            <div className="lg:hidden w-full mt-6">
              <CountdownCard className="countdown-card" />
            </div>

          </div>

        </div>

        {/* Desktop Countdown Card: Anchored relative to the constrained main-hero-area */}
        <div className="hidden lg:block absolute right-4 sm:right-5 md:right-10 lg:right-12 bottom-6 w-64 xl:w-72 z-30">
          <CountdownCard className="countdown-card" />
        </div>
      </div>

      {/* 3. Bottom Event Information Bar Container (Desktop: lg+) */}
      <div id="event-info-bar-container" className="hidden lg:block w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-10 lg:px-12 relative z-20 mt-4 lg:mt-2">
        <InformationBar />
      </div>

    </section>
  );
}

export default Hero;
