import React, { useState } from 'react';
import { Clock, MapPin, Calendar, FileText, ArrowRight, Download, X, Sparkles } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';

const SUMMARY_SCHEDULE = [
  {
    id: 1,
    time: '09:00 AM',
    title: 'Registration',
    description: 'Student registration and kit distribution',
  },
  {
    id: 2,
    time: '10:00 AM',
    title: 'Academic Procession',
    description: 'Procession of dignitaries and graduates',
  },
  {
    id: 3,
    time: '10:30 AM',
    title: 'Convocation Ceremony',
    description: 'Welcome address and conferment of degrees',
  },
  {
    id: 4,
    time: '12:30 PM',
    title: 'Degree Distribution',
    description: 'Distribution of degrees to graduates',
  },
  {
    id: 5,
    time: '01:30 PM',
    title: 'Photography & Reception',
    description: 'Group photography and hi-tea',
  },
];

const DETAILED_SCHEDULE = [
  {
    time: '08:30 AM – 09:30 AM',
    title: 'Registration & Regalia Distribution',
    venue: 'Academic Block Lobby',
    details: 'Robes & stoles collection, photo registration, and rehearsal briefing for graduating candidates.',
  },
  {
    time: '09:45 AM – 10:00 AM',
    title: 'Academic Procession Assembly',
    venue: 'Academic Corridor to Main Lecture Hall',
    details: 'Assembly and ceremonial entry of the Board of Governors, Senate members, Director, and Chief Guest.',
  },
  {
    time: '10:00 AM – 10:30 AM',
    title: 'Inauguration & Presidential Address',
    venue: 'Main Lecture Hall',
    details: 'National Anthem, Vedic invocation, lighting of the lamp (Deep Prajwalan), welcome address by Director, and Opening Declaration.',
  },
  {
    time: '10:30 AM – 11:15 AM',
    title: 'Convocation Address by Chief Guest',
    venue: 'Main Lecture Hall',
    details: 'Keynote address by Prof. T N Singh (Director, IIT Patna) to the graduating batch and assembly.',
  },
  {
    time: '11:15 AM – 01:15 PM',
    title: 'Conferment of Degrees & Medals Awarding',
    venue: 'Main Lecture Hall',
    details: 'Presentation of B.Tech, M.Tech, and Ph.D. degrees, President Gold Medal, Director Gold Medal, and Institute Medals.',
  },
  {
    time: '01:15 PM – 02:30 PM',
    title: 'Convocation Lunch & Photo Sessions',
    venue: 'Institute Lawn Pavilion',
    details: 'Celebratory fellowship lunch and batch photography with faculty, graduates, and accompanying parents.',
  },
];

export function ScheduleSection() {
  const [isFullScheduleOpen, setIsFullScheduleOpen] = useState(false);

  return (
    <section className="w-full pt-6 pb-6 sm:pt-8 sm:pb-8 bg-cream-100 relative scroll-mt-20 sm:scroll-mt-24" id="schedule">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Main Schedule Container Card */}
        <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#E8E2D8] shadow-[0_12px_40px_rgba(94,16,28,0.06)] p-6 sm:p-10 lg:p-12 overflow-hidden">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <span className="font-body font-bold text-xs sm:text-[13px] text-maroon-900 tracking-wider uppercase block mb-1">
                Event Schedule
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight">
                Schedule of Events
              </h2>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setIsFullScheduleOpen(true)}
                className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-pill bg-white border border-maroon-900/30 text-charcoal-900 hover:text-maroon-900 hover:border-maroon-900 hover:bg-cream-050 shadow-xs font-body font-semibold text-sm transition-all cursor-pointer"
              >
                View Full Schedule
              </button>
            </div>
          </div>

          {/* 2-Column Grid: Left Timeline + Right College Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left Column: Balanced Symmetrical Timeline List */}
            <div className="lg:col-span-6 flex flex-col justify-between py-1">
              <div className="flex flex-col">
                {SUMMARY_SCHEDULE.map((item, idx) => {
                  const isFirst = idx === 0;
                  const isLast = idx === SUMMARY_SCHEDULE.length - 1;
                  return (
                    <div key={item.id} className="flex items-stretch gap-3.5 sm:gap-5 group">
                      
                      {/* Column 1: Vertical Center Line + Bullet Node */}
                      <div className="flex flex-col items-center shrink-0 w-6 relative">
                        {/* Top Line Segment connecting directly to bullet center */}
                        <div
                          className={`w-[2px] bg-[#E8E2D8] ${
                            isFirst ? 'h-5 opacity-0' : 'h-5'
                          }`}
                        />

                        {/* Circular Maroon Bullet Node */}
                        <div className="w-4 h-4 rounded-full bg-maroon-900 ring-4 ring-white shadow-xs flex items-center justify-center shrink-0 z-10">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        </div>

                        {/* Bottom Line Segment */}
                        <div
                          className={`w-[2px] bg-[#E8E2D8] flex-1 ${
                            isLast ? 'opacity-0' : 'opacity-100'
                          }`}
                        />
                      </div>

                      {/* Column 2: Event Time */}
                      <div className={`w-16 sm:w-20 shrink-0 ${isFirst ? 'pt-2.5' : 'pt-4 sm:pt-4.5'}`}>
                        <span className="font-body font-bold text-xs sm:text-sm text-charcoal-700 whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>

                      {/* Column 3: Title & Description with Balanced Dividing Lines */}
                      <div
                        className={`flex-1 border-b border-[#ECE6DC] group-last:border-b-0 min-w-0 ${
                          isFirst ? 'pt-2 pb-4 sm:pb-5' : 'pt-4 sm:pt-4.5 pb-4 sm:pb-5'
                        } group-last:pb-2`}
                      >
                        <h3 className="font-display font-bold text-base sm:text-[17px] text-charcoal-900 leading-snug group-hover:text-maroon-900 transition-colors">
                          {item.title}
                        </h3>
                        <p className="font-body text-charcoal-600 text-xs sm:text-sm mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: College Campus Side Image */}
            <div className="lg:col-span-6 flex items-center">
              <div className="relative w-full h-[320px] sm:h-[380px] lg:h-full min-h-[340px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#E8E2D8] shadow-sm bg-cream-100 group">
                <img
                  src="/assets/iiitbh-campus-schedule.jpg"
                  alt="IIIT Bhagalpur Permanent Campus at Sunset — Convocation Venue"
                  width="640"
                  height="480"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                />
                
                {/* Subtle Gradient Shadow Overlay at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-charcoal-950/10 to-transparent pointer-events-none" />

                {/* Campus Location Caption Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                    <div>
                      <h3 className="font-display font-bold text-xs sm:text-sm text-white leading-tight">
                        IIIT Bhagalpur Campus
                      </h3>
                      <span className="font-body text-[11px] sm:text-xs text-white/80">
                        Main Lecture Hall & Academic Block
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/20 text-white shrink-0 hidden sm:inline-block">
                    26 Sept 2026
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Comprehensive Detailed Schedule Modal */}
      {isFullScheduleOpen && (
        <Modal
          isOpen={isFullScheduleOpen}
          onClose={() => setIsFullScheduleOpen(false)}
          title="Complete Convocation Day Schedule"
          size="lg"
        >
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-cream-050 border border-border flex items-center justify-between text-xs font-body text-charcoal-700">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-maroon-900" />
                <span>Date: <strong>26 September 2026 (Saturday)</strong></span>
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-maroon-900" />
                <span>Venue: <strong>Main Lecture Hall</strong></span>
              </span>
            </div>

            {/* Timeline in Modal with Balanced Symmetrical Spacing */}
            <div className="flex flex-col">
              {DETAILED_SCHEDULE.map((item, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === DETAILED_SCHEDULE.length - 1;
                return (
                  <div key={idx} className="flex items-stretch gap-4">
                    {/* Line Column */}
                    <div className="flex flex-col items-center shrink-0 w-5 relative">
                      <div className={`w-[2px] bg-border ${isFirst ? 'h-3 opacity-0' : 'h-3'}`} />
                      <div className="w-3.5 h-3.5 rounded-full bg-maroon-900 ring-4 ring-white shadow-xs shrink-0 z-10" />
                      <div className={`w-[2px] bg-border flex-1 ${isLast ? 'opacity-0' : 'opacity-100'}`} />
                    </div>

                    {/* Details Column */}
                    <div
                      className={`flex-1 min-w-0 border-b border-border/60 ${
                        isFirst ? 'pt-1 pb-4' : 'pt-3 pb-4'
                      } ${isLast ? 'border-b-0 pb-1' : ''}`}
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold text-maroon-900">
                            {item.time}
                          </span>
                          <span className="text-xs font-body text-charcoal-500">
                            {item.venue}
                          </span>
                        </div>

                        <h4 className="font-display font-bold text-base text-charcoal-900">
                          {item.title}
                        </h4>

                        <p className="font-body text-charcoal-600 text-xs sm:text-sm leading-relaxed">
                          {item.details}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-border flex items-center justify-end">
              <Button variant="primary" onClick={() => setIsFullScheduleOpen(false)}>
                Close Schedule
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

export default ScheduleSection;
