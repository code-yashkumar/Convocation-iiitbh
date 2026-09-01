import React, { useState } from 'react';
import {
  MapPin,
  Plane,
  Train,
  Bus,
  Car,
  ExternalLink,
  Navigation,
  Copy,
  Check,
  Compass,
  Sparkles
} from 'lucide-react';
import Card from '../../components/ui/Card';

const TRANSIT_OPTIONS = [
  {
    id: 'air-purnia',
    title: 'AIR TRAVEL',
    subtext: '(PURNIA AIRPORT)',
    distance: '90 KM',
    description: 'Fly to Purnia. Cab or Train to Bhagalpur.',
    icon: Plane,
  },
  {
    id: 'air-patna',
    title: 'AIR TRAVEL',
    subtext: '(PAT AIRPORT)',
    distance: '240 KM',
    description: 'Fly to Patna (PAT). Cab or Train to Bhagalpur.',
    icon: Plane,
  },
  {
    id: 'by-train',
    title: 'BY TRAIN',
    subtext: '(BGP JUNCTION)',
    distance: '09 KM',
    description: 'Direct rail connectivity from Delhi, Kolkata, Mumbai, Patna.',
    icon: Train,
  },
  {
    id: 'by-road',
    title: 'BY ROAD',
    subtext: '(NH-80)',
    distance: 'DIRECT',
    description: 'Regular luxury buses and highway transit from Patna & Ranchi.',
    icon: Bus,
  },
  {
    id: 'local-cab',
    title: 'LOCAL CAB',
    subtext: '(SABOUR)',
    distance: 'ON SITE',
    description: 'Ola, autos, and private app cabs direct to IIIT Campus, Sabour.',
    icon: Car,
  },
];

export function HowToReachSection() {
  const [copied, setCopied] = useState(false);

  const campusAddress = 'Indian Institute of Information Technology Bhagalpur, Sabour, Bhagalpur, Bihar 813210';
  const googleMapsUrl = 'https://maps.google.com/?q=Indian+Institute+of+Information+Technology+Bhagalpur+Sabour';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(campusAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full pt-6 pb-6 sm:pt-8 sm:pb-8 bg-cream-100 relative scroll-mt-20 sm:scroll-mt-24" id="how-to-reach">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Container Card */}
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-[#E8E2D8] shadow-[0_12px_40px_rgba(94,16,28,0.06)] p-5 sm:p-10 lg:p-12 overflow-hidden">
          
          {/* Header Row */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-xs sm:text-sm font-semibold mb-3 border border-maroon-900/10 shadow-xs">
              <Compass className="w-4 h-4 text-maroon-900 shrink-0" />
              <span>Campus Directions & Travel Guide</span>
            </div>

            <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight leading-tight">
              How To Reach?
            </h2>
            <p className="font-body text-charcoal-600 text-sm sm:text-lg mt-3 max-w-2xl mx-auto leading-relaxed">
              Comprehensive transit routes by air, rail, highway, and local cabs to the permanent campus of IIIT Bhagalpur at Sabour.
            </p>
          </div>

          {/* 2-Column Main Layout: Left Map + Right Transit Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
            
            {/* Left Column: Interactive Map & Direction Card */}
            <div className="lg:col-span-7 flex flex-col justify-between relative rounded-[1.25rem] sm:rounded-[1.75rem] overflow-hidden border border-[#E8E2D8] bg-[#F5F2EB] shadow-sm min-h-[20rem] sm:min-h-[28rem] lg:min-h-0 h-full">
              
              {/* Top Floating Badge on Desktop (sm+) only */}
              <div className="hidden sm:block sm:absolute sm:top-4 sm:left-4 sm:right-auto sm:max-w-xs p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E8E2D8] shadow-md z-10 pointer-events-auto">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <h3 className="font-display font-bold text-sm sm:text-base text-charcoal-900 leading-tight">
                      Indian Institute of Information Technology Bhagalpur
                    </h3>
                    <p className="font-body text-xs text-charcoal-600">
                      Sabour, Bhagalpur, Bihar 813210
                    </p>
                  </div>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-maroon-050 hover:bg-maroon-900 text-maroon-900 hover:text-white flex items-center justify-center shrink-0 border border-maroon-900/15 transition-colors focus:outline-none focus-visible:outline-none"
                    title="Open in Google Maps"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#ECE6DC] text-xs font-body text-charcoal-600">
                  <span className="text-amber-500 font-bold">4.3 ★</span>
                  <span>(318+ reviews)</span>
                  <span className="text-charcoal-300">•</span>
                  <span className="text-emerald-700 font-semibold">Campus Open</span>
                </div>
              </div>

              {/* Embedded Google Maps View - Fills full container on sm+ without grey gap */}
              <div className="w-full h-[20rem] sm:h-full sm:absolute sm:inset-0">
                <iframe
                  title="IIIT Bhagalpur Campus Map Location"
                  src="https://maps.google.com/maps?q=Indian%20Institute%20of%20Information%20Technology%20Bhagalpur%20Sabour&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 outline-none focus:outline-none"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              {/* Combined Unified Address & Map Actions Card (Floating on Desktop, Clean Bottom Card on Mobile) */}
              <div className="p-4 rounded-t-none sm:rounded-2xl bg-maroon-900 text-white shadow-xl border-t sm:border border-maroon-700/50 backdrop-blur-md z-10 sm:absolute sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-mono text-[0.6875rem] text-gold-400 font-bold uppercase tracking-wider">
                    IIIT Bhagalpur Campus
                  </div>
                  <div className="font-body text-xs text-white/90 leading-tight">
                    Sabour, Bhagalpur — 813210 (Bihar)
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center min-h-[2.375rem] px-4 rounded-pill bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-body font-bold text-xs shadow-sm transition-all gap-1.5 cursor-pointer focus:outline-none focus-visible:outline-none whitespace-nowrap"
                  >
                    <span>Open Map</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="w-9 h-9 rounded-pill bg-white/15 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:outline-none shrink-0"
                    title="Copy full address"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: 5 Transit Mode Option Cards (Title fits 1 line on mobile) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-2.5 sm:space-y-3.5">
              {TRANSIT_OPTIONS.map((transit) => {
                const IconComponent = transit.icon;

                return (
                  <div
                    key={transit.id}
                    className="rounded-[1.125rem] sm:rounded-[1.25rem] p-3.5 sm:p-4 border border-[#ECE6DC] bg-cream-050/60 hover:bg-white hover:border-maroon-900 hover:shadow-[0_8px_24px_rgba(94,16,28,0.08)] outline-none focus:outline-none transition-all duration-300 flex items-center justify-between gap-3 sm:gap-4 group cursor-default select-none"
                  >
                    {/* Left: Icon + Title & Description */}
                    <div className="flex items-start gap-3 sm:gap-3.5 min-w-0 flex-1">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 bg-maroon-050 text-maroon-900 border border-maroon-900/15 group-hover:bg-maroon-900 group-hover:text-white group-hover:shadow-sm transition-colors duration-200 mt-0.5">
                        <IconComponent className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                      </div>

                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-nowrap min-w-0">
                            <span className="font-display font-bold text-[0.78125rem] min-[360px]:text-[0.84375rem] sm:text-[0.9375rem] text-charcoal-900 group-hover:text-maroon-900 transition-colors whitespace-nowrap">
                              {transit.title}
                            </span>
                            <span className="font-body text-[0.65625rem] min-[360px]:text-[0.6875rem] sm:text-xs text-charcoal-500 font-semibold whitespace-nowrap">
                              {transit.subtext}
                            </span>
                          </div>

                          {/* Mobile Distance Badge in top header line */}
                          <span className="sm:hidden inline-block px-2 py-0.5 rounded-full font-mono text-[0.65625rem] font-bold whitespace-nowrap bg-maroon-050 text-maroon-900 border border-maroon-900/15 shrink-0">
                            {transit.distance}
                          </span>
                        </div>

                        <p className="font-body text-charcoal-600 text-[0.6875rem] min-[360px]:text-[0.75rem] sm:text-[0.8125rem] mt-0.5 sm:mt-1 leading-relaxed">
                          {transit.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Distance Badge on Desktop/Tablet */}
                    <div className="hidden sm:block shrink-0">
                      <span className="inline-block px-3 py-1 rounded-full font-mono text-xs font-bold whitespace-nowrap bg-maroon-050 text-maroon-900 border border-maroon-900/15 group-hover:bg-maroon-900 group-hover:text-white group-hover:shadow-xs transition-colors duration-200">
                        {transit.distance}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HowToReachSection;
