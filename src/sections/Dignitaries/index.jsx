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
};

const DIGNITARIES = [
  {
    name: 'Prof. Pragati Kumar',
    role: 'Guest of Honour',
    designation: 'Vice Chancellor, SMVD University',
    badge: 'Guest of Honour',
    badgeVariant: 'secondary',
    initials: 'PK',
  },
  {
    name: 'Dr. Ashok Khade',
    role: 'Chairperson',
    designation: 'Board of Governors, IIIT Bhagalpur',
    badge: 'Chairperson',
    badgeVariant: 'primary',
    initials: 'AK',
  },
  {
    name: 'Prof. Madhusudan Singh',
    role: 'Director',
    designation: 'IIIT Bhagalpur',
    badge: 'Director',
    badgeVariant: 'primary',
    initials: 'MS',
  },
];

export function DignitariesSection() {
  return (
    <section id="dignitaries" className="w-full py-16 sm:py-20 bg-cream-100 relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-xs sm:text-sm font-semibold mb-4 border border-maroon-900/10 shadow-xs">
            <Award className="w-4 h-4 text-maroon-900" />
            <span>Honourable Guests & Leadership</span>
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight">
            Eminent Dignitaries
          </h2>
          <p className="font-body text-charcoal-600 text-base sm:text-lg mt-3">
            Distinguished academicians, industry leaders, and institutional leadership gracing the 3rd Convocation.
          </p>
        </div>

        {/* Highest Visual Hierarchy: Chief Guest Featured Banner */}
        <div className="mb-10 sm:mb-12">
          <div className="bg-gradient-to-br from-[#540D17] to-[#731322] rounded-[28px] sm:rounded-[32px] text-white p-8 sm:p-10 lg:p-12 shadow-[0_16px_40px_rgba(84,13,23,0.18)] relative overflow-hidden border border-maroon-700/50">
            {/* Background Aesthetic Elements */}
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gold-500/10 pointer-events-none blur-2xl" />
            <div className="absolute right-1/4 -bottom-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Chief Guest Avatar / Photo Placeholder with Gold Seal */}
              <div className="lg:col-span-4 flex flex-col items-center sm:items-start lg:items-center text-center">
                <div className="relative">
                  {/* Outer Gold Ring */}
                  <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600 p-1.5 shadow-2xl flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#3F0A11] flex flex-col items-center justify-center text-white border-2 border-white/20">
                      <span className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-gold-300">
                        {CHIEF_GUEST.initials}
                      </span>
                      <span className="font-body text-[11px] text-gold-200/80 uppercase tracking-widest mt-1">
                        Dignitary
                      </span>
                    </div>
                  </div>

                  {/* Gold Star Badge on Avatar */}
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-10 h-10 rounded-full bg-gold-500 text-charcoal-950 flex items-center justify-center shadow-lg border-2 border-[#540D17]">
                    <Sparkles className="w-5 h-5 fill-charcoal-950" />
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 font-body text-xs font-semibold tracking-wide uppercase">
                  <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  <span>Convocation Chief Guest</span>
                </div>
              </div>

              {/* Chief Guest Information & Citation */}
              <div className="lg:col-span-8 flex flex-col justify-center text-center sm:text-left">
                <div className="mb-2">
                  <span className="font-body text-gold-400 text-sm sm:text-base font-semibold tracking-wider uppercase">
                    {CHIEF_GUEST.role}
                  </span>
                  <h3 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-1">
                    {CHIEF_GUEST.name}
                  </h3>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-white/90 font-body text-lg sm:text-xl font-medium mt-1.5">
                    <Building2 className="w-5 h-5 text-gold-400 shrink-0" />
                    <span>{CHIEF_GUEST.designation}</span>
                  </div>
                </div>

                {/* Citation / Bio */}
                <div className="mt-4 pt-4 border-t border-white/15">
                  <p className="font-body text-white/80 text-sm sm:text-[15px] leading-relaxed max-w-2xl">
                    {CHIEF_GUEST.bio}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Secondary Visual Hierarchy: 3 Column Grid for Guest of Honour, Chairperson, and Director */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {DIGNITARIES.map((dignitary) => (
            <div
              key={dignitary.name}
              className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(94,16,28,0.08)] hover:border-maroon-900/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-maroon-050 text-maroon-900 border border-maroon-900/15 font-body text-xs font-semibold tracking-wide">
                    {dignitary.role}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center text-charcoal-500 group-hover:text-maroon-900 transition-colors">
                    <UserCheck className="w-4 h-4" />
                  </div>
                </div>

                {/* Avatar Placeholder */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cream-200 to-cream-100 border border-border flex items-center justify-center text-maroon-900 font-display font-bold text-xl shadow-xs group-hover:scale-105 transition-transform">
                    {dignitary.initials}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xl text-charcoal-900 group-hover:text-maroon-900 transition-colors leading-snug">
                      {dignitary.name}
                    </h4>
                    <span className="font-body text-xs font-semibold text-maroon-900/80 uppercase tracking-wide">
                      {dignitary.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Designation Footer */}
              <div className="pt-4 border-t border-[#ECE6DC] mt-2 flex items-start gap-2">
                <Building2 className="w-4 h-4 text-charcoal-500 shrink-0 mt-0.5" />
                <span className="font-body text-sm font-medium text-charcoal-700 leading-snug">
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
