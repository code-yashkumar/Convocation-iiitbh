import React from 'react';
import { Award, UserCheck, Building2 } from 'lucide-react';

const DIGNITARIES = [
  {
    name: 'Shri Vinod Tawde',
    role: 'Special Guest',
    subtitle: 'Member of Parliament',
    designation: 'Rajya Sabha',
    badge: 'Special Guest',
    badgeVariant: 'primary',
    initials: 'VT',
    image: '/assets/dignitaries/shri-vinod-tawde.jpg',
  },
  {
    name: 'Mr. Varun Goyal',
    role: 'Guest of Honour',
    subtitle: 'University Relations Leader',
    designation: 'Nokia Solutions and Networks India',
    badge: 'Guest of Honour',
    badgeVariant: 'secondary',
    initials: 'VG',
    image: '/assets/dignitaries/mr-varun-goyal.jpg',
  },
  {
    name: 'Dr. Ashok Khade',
    role: 'Chairperson',
    subtitle: 'Board of Governors',
    designation: 'IIIT Bhagalpur',
    badge: 'Chairperson',
    badgeVariant: 'primary',
    initials: 'AK',
    image: '/assets/dignitaries/dr-ashok-khade.jpg',
  },
  {
    name: 'Prof. Madhusudan Singh',
    role: 'Director',
    subtitle: 'Director',
    designation: 'IIIT Bhagalpur',
    badge: 'Director',
    badgeVariant: 'primary',
    initials: 'MS',
    image: '/assets/dignitaries/prof-madhusudan-singh.jpg',
  },
];

export function DignitariesSection() {
  return (
    <section id="dignitaries" className="w-full pt-10 pb-6 sm:pt-16 sm:pb-8 bg-cream-100 relative scroll-mt-20 sm:scroll-mt-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 2xl:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-xs sm:text-sm font-semibold mb-3 border border-maroon-900/10 shadow-xs">
            <Award className="w-4 h-4 text-maroon-900 shrink-0" />
            <span>Honourable Guests & Leadership</span>
          </div>
          
          <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight leading-tight">
            Eminent Dignitaries
          </h2>
          <p className="font-body text-charcoal-600 text-xs sm:text-base md:text-lg mt-2.5 sm:mt-3 max-w-2xl mx-auto leading-relaxed">
            Distinguished academicians, public leaders, industry leaders, and institutional leadership gracing the 3rd Convocation.
          </p>
        </div>

        {/* Dignitaries Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 2xl:gap-8">
          {DIGNITARIES.map((dignitary) => (
            <div
              key={dignitary.name}
              className="bg-white rounded-2xl sm:rounded-[1.5rem] 2xl:rounded-[2rem] p-5 sm:p-6 2xl:p-8 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(94,16,28,0.08)] hover:border-maroon-900/30 transition-all duration-300 flex flex-col justify-between h-full group"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5 2xl:mb-6">
                  <span className="px-2.5 sm:px-3 py-1 2xl:px-3.5 2xl:py-1.5 rounded-full bg-maroon-050 text-maroon-900 border border-maroon-900/15 font-body text-[0.6875rem] sm:text-xs 2xl:text-sm font-semibold tracking-wide">
                    {dignitary.role}
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cream-100 flex items-center justify-center text-charcoal-500 group-hover:text-maroon-900 transition-colors">
                    <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>

                {/* Avatar / Portrait Photo */}
                <div className="flex items-center gap-3 sm:gap-3.5 2xl:gap-4 mb-4 sm:mb-5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-cream-200 to-cream-100 border border-border flex items-center justify-center text-maroon-900 font-display font-bold text-lg sm:text-xl shadow-xs group-hover:scale-105 transition-transform shrink-0">
                    {dignitary.image ? (
                      <img
                        src={dignitary.image}
                        alt={`${dignitary.name}, ${dignitary.role}, ${dignitary.designation}`}
                        width="64"
                        height="64"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top select-none"
                      />
                    ) : (
                      <span>{dignitary.initials}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-base sm:text-lg lg:text-[0.9375rem] xl:text-lg text-charcoal-900 group-hover:text-maroon-900 transition-colors leading-snug">
                      {dignitary.name}
                    </h3>
                    <span className="font-body text-[0.625rem] sm:text-[0.6875rem] lg:text-[0.625rem] xl:text-[0.6875rem] font-semibold text-maroon-900/80 uppercase tracking-wider block mt-0.5 leading-snug">
                      {dignitary.subtitle || dignitary.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Designation Footer */}
              <div className="mt-auto pt-3.5 sm:pt-4 border-t border-[#ECE6DC] flex items-start gap-2">
                <Building2 className="w-4 h-4 text-charcoal-500 shrink-0 mt-0.5" />
                <span className="font-body text-xs sm:text-sm font-medium text-charcoal-700 leading-snug">
                  {dignitary.designation}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default DignitariesSection;
