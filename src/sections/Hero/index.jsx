import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import CountdownCard from '../Countdown';

/**
 * Hero Section strictly conforming to DESIGN_SYSTEM.md Section 5.3
 */
export function Hero() {
  return (
    <section className="relative w-full pt-6 pb-16 lg:py-20 overflow-hidden bg-bg-page">
      <div className="max-w-container mx-auto px-5 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Content & Actions (approx 50% / 6 cols on desktop) */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8 z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-maroon-050 border border-maroon-900/10">
              <span className="type-label text-maroon-900 uppercase tracking-widest text-[12px]">
                Indian Institute of Information Technology Bhagalpur
              </span>
            </div>

            {/* Title & Event Year */}
            <div>
              <h1 className="type-display-xl text-text-default tracking-tight">
                CONVOCATION
              </h1>
              <div className="type-display-accent text-maroon-900 font-bold mt-1">
                2026
              </div>
            </div>

            {/* Subtext / Lead copy */}
            <p className="type-body-lg text-text-muted max-w-xl">
              Celebrating academic excellence, innovation, and leadership as the graduating Class of 2026 embarks on transforming the future of technology and society.
            </p>

            {/* Date / Venue Metadata */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-text-muted type-body-md border-t border-border/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-maroon-900 stroke-[1.75]" aria-hidden="true" />
                <span>November 20, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-maroon-900 stroke-[1.75]" aria-hidden="true" />
                <span>Main Auditorium, BCE Campus</span>
              </div>
            </div>

            {/* Actions (Primary + Secondary with arrow) */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button to="/registration" variant="primary">
                Register for Degree
              </Button>
              <Button
                to="/schedule"
                variant="secondary"
                iconRight={<ArrowRight className="w-4 h-4 stroke-[2]" />}
              >
                View Schedule
              </Button>
            </div>
          </div>

          {/* Right Column: Photography & Overlapping Countdown Card */}
          <div className="lg:col-span-6 relative">
            {/* Institutional Regalia Photography Frame */}
            <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] rounded-lg overflow-hidden border border-border shadow-feature bg-cream-050">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop"
                alt="IIIT Bhagalpur graduates in academic regalia celebrating at convocation"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Overlapping Countdown Card (Section 5.3 & 5.4) */}
            <div className="mt-6 lg:mt-0 lg:absolute lg:-bottom-10 lg:-left-12 lg:w-[420px] z-20">
              <CountdownCard />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
