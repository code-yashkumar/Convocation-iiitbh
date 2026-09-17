import React from 'react';
import { Award, UserCheck, Building2, Star, Sparkles } from 'lucide-react';

const DIGNITARIES = [
  {
    name: 'Shri Vinod Tawde',
    role: 'Guest of Honour',
    subtitle: 'Member of Parliament',
    designation: 'Rajya Sabha',
    icon: Sparkles,
    initials: 'VT',
    image: '/assets/dignitaries/shri-vinod-tawde.jpg',
  },
  {
    name: 'Mr. Varun Goyal',
    role: 'Special Guest',
    subtitle: 'University Relations Leader',
    designation: 'Nokia Solutions and Networks India',
    icon: Star,
    initials: 'VG',
    image: '/assets/dignitaries/mr-varun-goyal.jpg',
  },
  {
    name: 'Dr. Ashok Khade',
    role: 'Chairperson',
    subtitle: 'Board of Governors',
    designation: 'IIIT Bhagalpur',
    icon: UserCheck,
    initials: 'AK',
    image: '/assets/dignitaries/dr-ashok-khade.jpg',
  },
  {
    name: 'Prof. Madhusudan Singh',
    role: 'Director',
    subtitle: 'Director',
    designation: 'IIIT Bhagalpur',
    icon: Award,
    initials: 'MS',
    image: '/assets/dignitaries/prof-madhusudan-singh.jpg',
  },
];

export function DignitariesSection() {
  return (
    <section id="dignitaries" className="w-full pt-12 pb-8 sm:pt-16 sm:pb-12 bg-cream-100 relative scroll-mt-20 sm:scroll-mt-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-xs sm:text-sm font-semibold mb-3 border border-maroon-900/10 shadow-xs">
            <Award className="w-4 h-4 text-maroon-900 shrink-0" />
            <span>Honourable Guests &amp; Leadership</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight leading-tight">
            Eminent Dignitaries
          </h2>
          <p className="font-body text-charcoal-600 text-xs sm:text-base md:text-lg mt-2.5 sm:mt-3 max-w-2xl mx-auto leading-relaxed">
            Distinguished academicians, public leaders, industry executives, and institutional leadership gracing the 3rd Convocation.
          </p>
        </div>

        {/* 4-Column Vertical Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {DIGNITARIES.map((dignitary) => {
            const IconComponent = dignitary.icon;
            return (
              <div
                key={dignitary.name}
                className="bg-white rounded-2xl sm:rounded-[1.5rem] border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(94,16,28,0.08)] hover:-translate-y-1 hover:border-maroon-900/25 active:scale-[0.99] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] overflow-hidden group select-none flex flex-col"
              >
                {/* Portrait Photo — full width top */}
                <div className="w-full aspect-[3/3.5] overflow-hidden bg-gradient-to-b from-[#F5F0E8] to-cream-200 relative">
                  {dignitary.image ? (
                    <img
                      src={dignitary.image}
                      alt={`${dignitary.name}, ${dignitary.role}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] select-none"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-maroon-900 font-display font-bold text-4xl bg-cream-100">
                      {dignitary.initials}
                    </div>
                  )}

                  {/* Role badge — overlaid bottom-left */}
                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-maroon-900 border border-maroon-900/15 font-body text-[0.65rem] font-semibold tracking-wide shadow-sm">
                      <IconComponent className="w-3 h-3 text-maroon-900 shrink-0" />
                      {dignitary.role}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="px-4 pt-3.5 pb-4 flex flex-col gap-1 flex-1">
                  <h3 className="font-display font-bold text-[0.9375rem] sm:text-base lg:text-[1.0625rem] text-charcoal-900 group-hover:text-maroon-900 transition-colors leading-snug">
                    {dignitary.name}
                  </h3>
                  <span className="font-body text-[0.6875rem] sm:text-xs font-semibold text-maroon-900 uppercase tracking-wider leading-snug">
                    {dignitary.subtitle || dignitary.role}
                  </span>

                  {/* Organisation */}
                  <div className="mt-auto pt-3 border-t border-[#ECE6DC] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
                    <span className="font-body text-[0.6875rem] sm:text-xs text-charcoal-600 leading-snug line-clamp-1">
                      {dignitary.designation}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default DignitariesSection;
