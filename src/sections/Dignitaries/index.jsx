import React from 'react';
import { Award, UserCheck, Building2, Star, Sparkles } from 'lucide-react';

const HIGHER_DIGNITARY = {
  name: 'Shri Vinod Tawde',
  role: 'Guest of Honour',
  subtitle: 'Member of Parliament',
  designation: 'Rajya Sabha',
  badge: 'Guest of Honour',
  bio: 'Distinguished public leader and Member of Parliament (Rajya Sabha), former Minister of Higher and Technical Education, Government of Maharashtra. Recognized for visionary initiatives in higher education, youth empowerment, and public administration.',
  image: '/assets/dignitaries/shri-vinod-tawde.jpg',
  initials: 'VT',
};

const DIGNITARIES = [
  {
    name: 'Shri Kaushal Kishore, IAS',
    role: 'Guest of Honour',
    subtitle: 'Managing Director',
    designation: 'BELTRON',
    icon: Sparkles,
    initials: 'KK',
    image: '/assets/dignitaries/shri-kaushal-kishore.jpg',
    imagePosition: 'object-top',
  },
  {
    name: 'Mr. Varun Goyal',
    role: 'Special Guest',
    subtitle: 'University Relations Leader',
    designation: 'Nokia Solutions and Networks India',
    icon: Star,
    initials: 'VG',
    image: '/assets/dignitaries/mr-varun-goyal.jpg',
    imagePosition: 'object-top',
  },
  {
    name: 'Mr. Ravindra Sharma',
    role: 'Special Guest',
    subtitle: 'Head of Project',
    designation: 'NTPC Kahalgaon',
    icon: Star,
    initials: 'RS',
    image: '/assets/dignitaries/mr-ravindra-sharma.jpg',
    imagePosition: 'object-top',
  },
  {
    name: 'Dr. Ashok Khade',
    role: 'Chairperson',
    subtitle: 'Board of Governors',
    designation: 'IIIT Bhagalpur',
    icon: UserCheck,
    initials: 'AK',
    image: '/assets/dignitaries/dr-ashok-khade.jpg',
    imagePosition: 'object-top',
  },
  {
    name: 'Prof. Madhusudan Singh',
    role: 'Director',
    subtitle: 'Director',
    designation: 'IIIT Bhagalpur',
    icon: Award,
    initials: 'MS',
    image: '/assets/dignitaries/prof-madhusudan-singh.jpg',
    imagePosition: 'object-top',
  },
];

export function DignitariesSection() {
  return (
    <section id="dignitaries" className="w-full pt-12 pb-8 sm:pt-16 sm:pb-12 bg-cream-100 relative scroll-mt-20 sm:scroll-mt-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
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

        {/* Higher Hierarchical Featured Card (Shri Vinod Tawde) */}
        <div className="mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-[#540D17] to-[#731322] rounded-[1.5rem] sm:rounded-[2rem] text-white p-6 sm:p-8 lg:p-10 shadow-[0_16px_40px_rgba(84,13,23,0.18)] relative overflow-hidden border border-maroon-700/50">
            {/* Background Ambient Elements */}
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gold-500/10 pointer-events-none blur-2xl" />
            <div className="absolute right-1/4 -bottom-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center relative z-10">
              
              {/* Photo with Gold Seal */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative">
                  {/* Outer Gold Ring */}
                  <div className="w-32 h-32 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600 p-1.5 shadow-2xl flex items-center justify-center">
                    <div className="w-full h-full rounded-full overflow-hidden bg-[#3F0A11] border-2 border-white/20">
                      <img
                        src={HIGHER_DIGNITARY.image}
                        alt={`${HIGHER_DIGNITARY.name}, ${HIGHER_DIGNITARY.subtitle}`}
                        width="192"
                        height="192"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top select-none"
                      />
                    </div>
                  </div>

                  {/* Gold Sparkle Badge */}
                  <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold-500 text-charcoal-950 flex items-center justify-center shadow-lg border-2 border-[#540D17]">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 fill-charcoal-950" />
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 font-body text-[0.6875rem] sm:text-xs font-semibold tracking-wide uppercase">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-gold-400 text-gold-400" />
                  <span>{HIGHER_DIGNITARY.role}</span>
                </div>
              </div>

              {/* Information & Details */}
              <div className="lg:col-span-8 flex flex-col justify-center text-center lg:text-left">
                <div>
                  <span className="font-body text-gold-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
                    {HIGHER_DIGNITARY.subtitle}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mt-1">
                    {HIGHER_DIGNITARY.name}
                  </h3>
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-white/90 font-body text-sm sm:text-lg font-medium mt-1.5">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 shrink-0" />
                    <span>{HIGHER_DIGNITARY.designation}</span>
                  </div>
                </div>

                {/* Description / Citation from past design */}
                <div className="mt-3.5 sm:mt-4 pt-3.5 sm:pt-4 border-t border-white/15">
                  <p className="font-body text-white/80 text-xs sm:text-[0.9375rem] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    {HIGHER_DIGNITARY.bio}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 5-Column Profile Cards Grid (2 cols on all phone viewports, 3 on tablet, 5 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-4">
          {DIGNITARIES.map((dignitary) => {
            const IconComponent = dignitary.icon;
            return (
              <div
                key={dignitary.name}
                className="bg-white rounded-[1.25rem] sm:rounded-[1.5rem] border border-[#E8E2D8] shadow-[0_2px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_28px_rgba(94,16,28,0.10)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] overflow-hidden group select-none flex flex-col"
              >
                {/* Inset Photo */}
                <div className="p-2.5 sm:p-3 pb-0">
                  <div className="w-full aspect-[4/4.2] rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-b from-[#F0EBE1] to-[#E8E2D8] relative">
                    {dignitary.image ? (
                      <img
                        src={dignitary.image}
                        alt={`${dignitary.name}, ${dignitary.role}`}
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full object-cover ${dignitary.imagePosition || 'object-top'} group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] select-none`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-maroon-900 font-display font-bold text-2xl sm:text-3xl bg-cream-100">
                        {dignitary.initials}
                      </div>
                    )}

                    {/* Role Pill: Overlaid on bottom-right of photo on phone (<md) */}
                    <div className="md:hidden absolute bottom-1.5 right-1.5 z-10">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-maroon-900/15 text-maroon-900 font-body text-[0.5625rem] sm:text-[0.625rem] font-semibold tracking-wide shadow-xs whitespace-nowrap">
                        {dignitary.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="px-3 pt-2.5 pb-3 flex flex-col gap-1 flex-1">
                  {/* Name + badge */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-display font-bold text-xs sm:text-[0.875rem] text-charcoal-900 leading-snug">
                      {dignitary.name}
                    </h3>
                    <span className="inline-flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-maroon-900 shrink-0">
                      <IconComponent className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
                    </span>
                  </div>

                  {/* Subtitle */}
                  <p className="font-body text-[0.6875rem] sm:text-[0.75rem] text-charcoal-500 leading-snug">
                    {dignitary.subtitle || dignitary.role}
                  </p>

                  {/* Bottom row */}
                  <div className="mt-auto pt-2.5 flex items-center justify-between gap-1.5 border-t border-[#ECE6DC]">
                    <div className="flex items-center gap-1 min-w-0">
                      <Building2 className="w-3 h-3 text-charcoal-400 shrink-0" />
                      <span className="font-body text-[0.625rem] sm:text-[0.6875rem] text-charcoal-500 truncate leading-snug">
                        {dignitary.designation}
                      </span>
                    </div>
                    {/* Role Pill: Desktop / Tablet view (md+) */}
                    <span className="hidden md:inline-flex shrink-0 items-center px-2 py-0.5 rounded-full bg-maroon-050 border border-maroon-900/10 text-maroon-900 font-body text-[0.5625rem] sm:text-[0.625rem] font-semibold tracking-wide whitespace-nowrap">
                      {dignitary.role}
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

