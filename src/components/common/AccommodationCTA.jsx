import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, ArrowRight, MapPin, Sparkles } from 'lucide-react';

/**
 * High-visibility CTA Banner for Accommodation and Nearby Hotels
 */
export function AccommodationCTA({ className = '' }) {
  return (
    <div
      className={`w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 my-5 sm:my-8 ${className}`}
    >
      <div className="relative bg-gradient-to-r from-[#500D16] via-[#66101E] to-[#450A12] text-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm border border-maroon-800/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
        {/* Background Ambient Glow */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-gold-500/10 pointer-events-none blur-3xl" />
        <div className="absolute left-1/3 -top-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-2xl" />

        {/* Left Content */}
        <div className="relative z-10 max-w-2xl space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-gold-300 font-body text-[0.6875rem] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 fill-gold-300 text-gold-300 shrink-0" />
            <span>Alumni & Guest Hospitality</span>
          </div>

          <h3 className="font-display font-bold text-xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
            Planning Your Stay for Convocation 2026?
          </h3>

          <p className="font-body text-white/85 text-xs sm:text-base leading-relaxed">
            Explore verified nearby hotels in Bhagalpur, institutional discount codes, campus guest house enquiry, and travel directions for alumni and visiting families.
          </p>
        </div>

        {/* Right Action Button */}
        <div className="relative z-10 shrink-0 w-full sm:w-auto">
          <Link
            to="/accommodation"
            className="group inline-flex items-center justify-center min-h-[3rem] sm:min-h-[3.125rem] px-5 sm:px-8 rounded-pill bg-gold-500 text-charcoal-950 font-body font-bold text-[0.8125rem] min-[360px]:text-[0.84375rem] sm:text-[0.9375rem] shadow-lg hover:bg-gold-400 active:scale-95 transition-all gap-2 sm:gap-3 w-full sm:w-auto whitespace-nowrap text-center"
          >
            <Hotel className="w-4 h-4 text-charcoal-950 shrink-0" />
            <span>Explore Nearby Hotels & Stays</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5] text-charcoal-950 group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccommodationCTA;
