import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, ArrowRight, MapPin, Sparkles } from 'lucide-react';

/**
 * High-visibility CTA Banner for Accommodation and Nearby Hotels
 */
export function AccommodationCTA({ className = '' }) {
  return (
    <div
      className={`w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 my-3 sm:my-5 ${className}`}
    >
      <div className="relative bg-gradient-to-r from-[#500D16] via-[#66101E] to-[#450A12] text-white rounded-[28px] sm:rounded-[32px] p-8 sm:p-10 lg:p-12 overflow-hidden shadow-[0_16px_40px_rgba(80,13,22,0.18)] border border-maroon-700/60 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        {/* Background Ambient Glow */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-gold-500/10 pointer-events-none blur-3xl" />
        <div className="absolute left-1/3 -top-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-2xl" />

        {/* Left Content */}
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-gold-300 font-body text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 fill-gold-300 text-gold-300" />
            <span>Alumni & Guest Hospitality</span>
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
            Planning Your Stay for Convocation 2026?
          </h3>

          <p className="font-body text-white/85 text-sm sm:text-base leading-relaxed">
            Explore verified nearby hotels in Bhagalpur, institutional discount codes, campus guest house enquiry, and travel directions for alumni and visiting families.
          </p>
        </div>

        {/* Right Action Button */}
        <div className="relative z-10 shrink-0 w-full sm:w-auto">
          <Link
            to="/accommodation"
            className="group inline-flex items-center justify-center min-h-[50px] px-8 rounded-pill bg-gold-500 text-charcoal-950 font-body font-bold text-sm sm:text-[15px] shadow-lg hover:bg-gold-400 active:scale-95 transition-all gap-3 w-full sm:w-auto"
          >
            <Hotel className="w-4 h-4 text-charcoal-950" />
            <span>Explore Nearby Hotels & Stays</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5] text-charcoal-950 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccommodationCTA;
