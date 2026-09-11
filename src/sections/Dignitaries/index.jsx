import React from 'react';
import { Award, UserCheck, Building2, Star, Sparkles } from 'lucide-react';

const DIGNITARIES = [
  {
    name: 'Shri Vinod Tawde',
    role: 'Special Guest',
    subtitle: 'Member of Parliament',
    designation: 'Rajya Sabha',
    icon: Star,
    initials: 'VT',
    image: '/assets/dignitaries/shri-vinod-tawde.jpg',
  },
  {
    name: 'Mr. Varun Goyal',
    role: 'Guest of Honour',
    subtitle: 'University Relations Leader',
    designation: 'Nokia Solutions and Networks India',
    icon: Sparkles,
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
            <span>Honourable Guests & Leadership</span>
          </div>
          
          <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight leading-tight">
            Eminent Dignitaries
          </h2>
          <p className="font-body text-charcoal-600 text-xs sm:text-base md:text-lg mt-2.5 sm:mt-3 max-w-2xl mx-auto leading-relaxed">
            Distinguished academicians, public leaders, industry executives, and institutional leadership gracing the 3rd Convocation.
          </p>
        </div>

        {/* 2x2 Dignitaries Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 max-w-5xl mx-auto">
          {DIGNITARIES.map((dignitary) => {
            const IconComponent = dignitary.icon;
            return (
              <div
                key={dignitary.name}
                className="bg-white rounded-2xl sm:rounded-[1.75rem] p-5 sm:p-6 lg:p-7 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(94,16,28,0.07)] hover:border-maroon-900/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle Hover Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-maroon-050/60 rounded-full blur-2xl pointer-events-none group-hover:bg-gold-500/10 transition-colors" />

                <div>
                  {/* Card Header: Role Badge & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-maroon-050 text-maroon-900 border border-maroon-900/15 font-body text-xs font-semibold tracking-wide shadow-2xs">
                      <IconComponent className="w-3.5 h-3.5 text-maroon-900 shrink-0" />
                      <span>{dignitary.role}</span>
                    </span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cream-100 flex items-center justify-center text-charcoal-400 group-hover:text-maroon-900 group-hover:bg-maroon-050 transition-colors">
                      <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>

                  {/* Main Profile Info: Photo + Text */}
                  <div className="flex items-center gap-4 sm:gap-5">
                    {/* Portrait Photo Container */}
                    <div className="w-[84px] h-[84px] sm:w-[96px] sm:h-[96px] min-w-[84px] sm:min-w-[96px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-cream-200 p-0.5 border border-maroon-900/15 shadow-sm group-hover:scale-105 group-hover:border-maroon-900/30 transition-all shrink-0">
                      {dignitary.image ? (
                        <img
                          src={dignitary.image}
                          alt={`${dignitary.name}, ${dignitary.role}, ${dignitary.designation}`}
                          width="96"
                          height="96"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top rounded-[0.875rem] select-none"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-maroon-900 font-display font-bold text-xl rounded-[0.875rem] bg-cream-100">
                          {dignitary.initials}
                        </div>
                      )}
                    </div>

                    {/* Name & Titles */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display font-bold text-lg sm:text-xl lg:text-[1.3125rem] text-charcoal-900 group-hover:text-maroon-900 transition-colors leading-snug">
                        {dignitary.name}
                      </h3>
                      <span className="font-body text-xs sm:text-[0.8125rem] font-semibold text-maroon-900 uppercase tracking-wider block mt-1 leading-snug">
                        {dignitary.subtitle || dignitary.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Designation / Organization */}
                <div className="mt-5 pt-3.5 sm:pt-4 border-t border-[#ECE6DC] flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-charcoal-500 shrink-0" />
                  <span className="font-body text-xs sm:text-sm font-medium text-charcoal-700 leading-snug truncate">
                    {dignitary.designation}
                  </span>
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
