import React from 'react';
import { Award, Star, UserCheck, Sparkles, Building2, Quote } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const CHIEF_GUEST = {
  name: 'Prof. T N Singh',
  role: 'Chief Guest',
  designation: 'Director, IIT Patna',
  badge: 'Chief Guest',
  bio: 'Eminent academician, distinguished researcher, and administrative visionary leading the Indian Institute of Technology Patna. Conferred with multiple national and international honors for contributions to engineering education and scientific research.',
  initials: 'TNS',
  image: '/assets/dignitaries/prof-tn-singh.jpg',
};

const DIGNITARIES = [
  {
    name: 'Prof. Pragati Kumar',
    role: 'Guest of Honour',
    designation: 'Vice Chancellor, SMVD University',
    badge: 'Guest of Honour',
    badgeVariant: 'secondary',
    initials: 'PK',
    image: '/assets/dignitaries/prof-pragati-kumar.jpg',
  },
  {
    name: 'Dr. Ashok Khade',
    role: 'Chairperson',
    designation: 'Board of Governors, IIIT Bhagalpur',
    badge: 'Chairperson',
    badgeVariant: 'primary',
    initials: 'AK',
    image: '/assets/dignitaries/dr-ashok-khade.jpg',
  },
  {
    name: 'Prof. Madhusudan Singh',
    role: 'Director',
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
      <div className="max-w-[87.5rem] mx-auto px-5 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-xs sm:text-sm font-semibold mb-3 border border-maroon-900/10 shadow-xs">
            <Award className="w-4 h-4 text-maroon-900" />
            <span>Honourable Guests & Leadership</span>
          </div>
          
          <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight">
            Eminent Dignitaries
          </h2>
          <p className="font-body text-charcoal-600 text-sm sm:text-lg mt-2 sm:mt-3">
            Distinguished academicians, industry leaders, and institutional leadership gracing the 3rd Convocation.
          </p>
        </div>

        {/* Highest Visual Hierarchy: Chief Guest Featured Banner */}
        <div className="mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-[#540D17] to-[#731322] rounded-[24px] sm:rounded-[32px] text-white p-6 sm:p-10 lg:p-12 shadow-[0_16px_40px_rgba(84,13,23,0.18)] relative overflow-hidden border border-maroon-700/50">
            {/* Background Aesthetic Elements */}
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gold-500/10 pointer-events-none blur-2xl" />
            <div className="absolute right-1/4 -bottom-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Chief Guest Avatar / Photo with Gold Seal */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative">
                  {/* Outer Gold Ring */}
                  <div className="w-36 h-36 sm:w-48 sm:h-48 lg:w-52 lg:h-52 rounded-full bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600 p-1.5 shadow-2xl flex items-center justify-center">
                    <div className="w-full h-full rounded-full overflow-hidden bg-[#3F0A11] border-2 border-white/20">
                      <img
                        src={CHIEF_GUEST.image}
                        alt="Prof. T N Singh, Director IIT Patna - Chief Guest for 3rd Convocation"
                        width="208"
                        height="208"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top select-none"
                      />
                    </div>
                  </div>

                  {/* Gold Star Badge on Avatar */}
                  <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold-500 text-charcoal-950 flex items-center justify-center shadow-lg border-2 border-[#540D17]">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 fill-charcoal-950" />
                  </div>
                </div>

                <div className="mt-3.5 sm:mt-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 font-body text-[11px] sm:text-xs font-semibold tracking-wide uppercase">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-gold-400 text-gold-400" />
                  <span>Convocation Chief Guest</span>
                </div>
              </div>

              {/* Chief Guest Information & Citation */}
              <div className="lg:col-span-8 flex flex-col justify-center text-center lg:text-left">
                <div className="mb-2">
                  <span className="font-body text-gold-400 text-xs sm:text-base font-semibold tracking-wider uppercase">
                    {CHIEF_GUEST.role}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-1">
                    {CHIEF_GUEST.name}
                  </h3>
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-white/90 font-body text-base sm:text-xl font-medium mt-1.5">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 shrink-0" />
                    <span>{CHIEF_GUEST.designation}</span>
                  </div>
                </div>

                {/* Citation / Bio */}
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/15">
                  <p className="font-body text-white/80 text-xs sm:text-[15px] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    {CHIEF_GUEST.bio}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Secondary Visual Hierarchy: 3 Column Grid for Guest of Honour, Chairperson, and Director */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {DIGNITARIES.map((dignitary) => (
            <div
              key={dignitary.name}
              className="bg-white rounded-2xl sm:rounded-[24px] p-5 sm:p-7 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(94,16,28,0.08)] hover:border-maroon-900/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-maroon-050 text-maroon-900 border border-maroon-900/15 font-body text-[11px] sm:text-xs font-semibold tracking-wide">
                    {dignitary.role}
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cream-100 flex items-center justify-center text-charcoal-500 group-hover:text-maroon-900 transition-colors">
                    <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>

                {/* Avatar / Portrait Photo */}
                <div className="flex items-center gap-3.5 sm:gap-4 mb-4 sm:mb-5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-cream-200 to-cream-100 border border-border flex items-center justify-center text-maroon-900 font-display font-bold text-lg sm:text-xl shadow-xs group-hover:scale-105 transition-transform shrink-0">
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
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-charcoal-900 group-hover:text-maroon-900 transition-colors leading-snug">
                      {dignitary.name}
                    </h3>
                    <span className="font-body text-[11px] sm:text-xs font-semibold text-maroon-900/80 uppercase tracking-wide">
                      {dignitary.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Designation Footer */}
              <div className="pt-3.5 sm:pt-4 border-t border-[#ECE6DC] mt-1 sm:mt-2 flex items-start gap-2">
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
