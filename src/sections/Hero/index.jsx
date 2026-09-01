import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
      className="relative w-full min-h-screen lg:h-[100dvh] flex flex-col justify-between pt-[clamp(72px,5.2vw,160px)] pb-[clamp(16px,1.5vw,48px)] overflow-hidden bg-[#F7F4EE]"
    >
      {/* 1. Full-Height Photographic Background Layer (Desktop: lg+) - Preserves 100% full original photograph without cropping */}
      <div
        data-darkreader-ignore="true"
        className="hero-bg-layer hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
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

      {/* 2. Main Hero Content Area (Content Block: 3RD CONVOCATION 2026, Details, CTAs, Countdown) */}
      <div
        id="main-hero-area"
        data-darkreader-ignore="true"
        className="w-full max-w-[clamp(1400px,94vw,3600px)] mx-auto px-6 sm:px-10 lg:px-[clamp(24px,3.5vw,120px)] relative z-10 flex-1 flex items-center py-2 sm:py-4 lg:py-2"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column: Hero Content Block */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center">
            
            {/* Title & Year */}
            <div className="mb-2 sm:mb-[clamp(16px,1.5vw,40px)]">
              <h1 className="hero-title-main font-display font-bold text-[38px] sm:text-[52px] lg:text-[clamp(72px,5.2vw,190px)] leading-[0.94] lg:leading-[0.92] text-charcoal-900 tracking-tight">
                <span className="hero-title-main lg:hidden">
                  3<span className="text-[0.62em] lowercase align-super font-semibold">rd</span> Convocation
                </span>
                <span className="hero-title-main hidden lg:inline">
                  3<span className="text-[0.62em] lowercase align-super font-semibold">rd</span> CONVOCATION
                </span>
                <span className="hero-title-maroon block font-display font-bold text-[42px] sm:text-[56px] lg:text-[clamp(78px,5.6vw,210px)] leading-[1] text-maroon-900 mt-0.5 sm:mt-[clamp(4px,0.4vw,12px)]">
                  2026
                </span>
              </h1>
            </div>

            {/* Subtitle Statement */}
            <p className="hero-subtitle font-body text-charcoal-700 sm:text-charcoal-900 text-[14px] sm:text-[17px] lg:text-[clamp(20px,1.45vw,52px)] leading-[1.4] sm:leading-snug font-normal max-w-md lg:max-w-[clamp(480px,36vw,1200px)] mb-6 sm:mb-[clamp(24px,2.2vw,64px)]">
              <span>A milestone of achievement,</span>
              <span className="block sm:inline sm:ml-1">tradition and new beginnings.</span>
            </p>



            {/* Action Buttons */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-[clamp(16px,1.2vw,40px)] w-full lg:w-auto">
              <a
                href="https://forms.gle/1nxVrpcRUfgMhH938"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-primary w-full lg:w-auto inline-flex items-center justify-center min-h-[48px] lg:min-h-[clamp(46px,3.3vw,110px)] px-8 lg:px-[clamp(30px,2.2vw,76px)] rounded-[14px] lg:rounded-pill bg-maroon-900 text-white font-body font-semibold text-[15px] lg:text-[clamp(15px,1.05vw,36px)] shadow-sm hover:bg-maroon-700 active:bg-maroon-700 transition-all focus-visible:outline-none cursor-pointer text-center"
              >
                Register Now
              </a>
              <a
                href="#schedule"
                onClick={(e) => handleScrollToSection(e, 'schedule')}
                className="hero-btn-secondary group w-full lg:w-auto inline-flex items-center justify-between lg:justify-center min-h-[48px] lg:min-h-[clamp(46px,3.3vw,110px)] px-6 lg:px-[clamp(26px,1.9vw,68px)] rounded-[14px] lg:rounded-pill bg-[#FBF9F6] border border-maroon-900 lg:border-maroon-900/30 text-maroon-900 font-body font-semibold text-[15px] lg:text-[clamp(15px,1.05vw,36px)] shadow-xs lg:hover:border-maroon-900 hover:bg-white hover:shadow-md transition-all duration-200 gap-2.5 lg:gap-[clamp(10px,0.8vw,28px)] focus-visible:outline-none cursor-pointer text-center"
              >
                <span className="flex-1 lg:flex-none text-center">View Schedule</span>
                <ArrowRight className="w-4 h-4 lg:w-[clamp(16px,1.2vw,36px)] lg:h-[clamp(16px,1.2vw,36px)] stroke-[2.5] text-maroon-900 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            </div>

            {/* Mobile Countdown Card (< lg) positioned directly under CTA buttons */}
            <div className="lg:hidden w-full mt-5">
              <CountdownCard className="countdown-card" />
            </div>

          </div>

        </div>
      </div>

      {/* Desktop Countdown Card: Anchored relative to the screen above the Info Bar */}
      <div className="hidden lg:block absolute right-8 sm:right-12 lg:right-[clamp(32px,3.8vw,130px)] bottom-[clamp(120px,11.5vh,270px)] w-[clamp(235px,16.5vw,620px)] z-30">
        <CountdownCard className="countdown-card" />
      </div>

      {/* 3. Bottom Event Information Bar Container */}
      <div id="event-info-bar-container" className="w-full max-w-[clamp(1400px,94vw,3600px)] mx-auto px-6 sm:px-10 lg:px-[clamp(24px,3.5vw,120px)] relative z-20 mt-4 lg:mt-2">
        <InformationBar />
      </div>

    </section>
  );
}

export default Hero;
