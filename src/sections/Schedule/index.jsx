import React from 'react';
import { Clock, MapPin, CheckCircle2 } from 'lucide-react';
import Card from '../../components/ui/Card';

const SCHEDULE_DATA = [
  {
    time: '08:30 AM – 09:30 AM',
    title: 'Registration & Regalia Distribution',
    venue: 'Academic Block Lobby',
    details: 'Robes collection, photo registration, and rehearsal briefing for graduating candidates.',
  },
  {
    time: '09:45 AM – 10:00 AM',
    title: 'Academic Procession Assembly',
    venue: 'Senate Hall to Main Lecture Hall',
    details: 'Assembly of the Board of Governors, Senate members, Director, and Chief Guest.',
  },
  {
    time: '10:00 AM – 10:30 AM',
    title: 'Inauguration & Presidential Address',
    venue: 'Main Lecture Hall',
    details: 'National Anthem, lighting of the lamp, welcome address by Director, and Opening Declaration.',
  },
  {
    time: '10:30 AM – 11:15 AM',
    title: 'Convocation Address by Chief Guest',
    venue: 'Main Lecture Hall',
    details: 'Keynote address by the Chief Guest to the graduating batch.',
  },
  {
    time: '11:15 AM – 01:15 PM',
    title: 'Conferment of Degrees & Medals Awarding',
    venue: 'Main Lecture Hall',
    details: 'Presentation of B.Tech, M.Tech, and Ph.D. degrees, President Gold Medal, and Institute Medals.',
  },
  {
    time: '01:15 PM – 02:30 PM',
    title: 'Convocation Lunch & Photo Sessions',
    venue: 'Institute Lawn',
    details: 'Celebratory lunch with faculty, graduates, and their accompanying parents.',
  },
];

export function ScheduleSection() {
  return (
    <section className="py-16 max-w-container mx-auto px-5 sm:px-10 lg:px-20 scroll-mt-20 sm:scroll-mt-24" id="schedule">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-maroon-050 mb-3">
          <span className="type-label text-maroon-900 uppercase">Program Sequence</span>
        </div>
        <h2 className="type-display-lg text-text-default">Convocation Day Schedule</h2>
        <p className="type-body-lg text-text-muted mt-2">
          Detailed timeline of ceremonial events, academic procession, and degree distribution.
        </p>
      </div>

      <div className="relative border-l-2 border-border ml-4 sm:ml-32 md:ml-40 space-y-8">
        {SCHEDULE_DATA.map((item, idx) => (
          <div key={idx} className="relative pl-6 sm:pl-8 group">
            {/* Timeline indicator node */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-maroon-900 ring-4 ring-bg-page flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            </div>

            {/* Time label on desktop left */}
            <div className="sm:absolute sm:-left-40 sm:top-1 sm:w-32 sm:text-right font-mono text-[13px] font-semibold text-maroon-900 pb-1 sm:pb-0">
              {item.time}
            </div>

            {/* Card Content */}
            <Card variant="standard" className="hover:border-maroon-900/30 transition-colors">
              <div className="mb-2">
                <h3 className="type-display-md text-text-default text-[20px] leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-text-muted type-body-sm mb-3">
                <MapPin className="w-4 h-4 text-maroon-900" />
                <span>{item.venue}</span>
              </div>

              <p className="type-body-md text-text-muted">{item.details}</p>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ScheduleSection;
