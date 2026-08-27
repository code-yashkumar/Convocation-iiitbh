import React from 'react';
import { Calendar, Clock, MapPin, Award } from 'lucide-react';

const INFO_ITEMS = [
  {
    icon: Calendar,
    label: 'Date',
    value: 'November 20, 2026',
    subtext: 'Friday',
  },
  {
    icon: Clock,
    label: 'Time',
    value: '10:00 AM IST',
    subtext: 'Reporting: 08:30 AM',
  },
  {
    icon: MapPin,
    label: 'Venue',
    value: 'Main Auditorium',
    subtext: 'BCE Campus, Sabour',
  },
  {
    icon: Award,
    label: 'Edition',
    value: '5th Convocation',
    subtext: 'Class of 2026',
  },
];

/**
 * Information Bar component conforming to DESIGN_SYSTEM.md Section 5.5
 */
export function InformationBar({ className = '' }) {
  return (
    <div
      className={`w-full bg-bg-surface border border-border rounded-lg shadow-feature p-6 sm:p-8 ${className}`}
      aria-label="Event Key Information"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
        {INFO_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex items-start gap-4 ${
                idx !== 0 ? 'pt-4 md:pt-0 md:pl-6 lg:pl-8' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-maroon-050 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-maroon-900 stroke-[1.75]" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="type-label text-text-muted uppercase tracking-wider text-[12px]">
                  {item.label}
                </span>
                <span className="font-body font-semibold text-text-default text-[17px] leading-snug mt-0.5">
                  {item.value}
                </span>
                <span className="type-body-sm text-text-muted mt-0.5">
                  {item.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InformationBar;
