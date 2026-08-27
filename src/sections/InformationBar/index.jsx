import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

/**
 * Custom Ceremonial Lotus / Crest Icon for Edition
 */
function EditionIcon({ className = 'w-7 h-7 text-maroon-900' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M16 6C16 6 13 11 13 14C13 15.6569 14.3431 17 16 17C17.6569 17 19 15.6569 19 14C19 11 16 6 16 6Z"
        fill="#5E101C"
      />
      <path
        d="M8.5 17C10.5 17 12.5 15.5 13.5 13.5C12.5 17.5 10 20 7 20.5C6.5 18.5 7.5 17 8.5 17Z"
        fill="#5E101C"
      />
      <path
        d="M23.5 17C21.5 17 19.5 15.5 18.5 13.5C19.5 17.5 22 20 25 20.5C25.5 18.5 24.5 17 23.5 17Z"
        fill="#5E101C"
      />
      <path
        d="M10 23C13.5 24.5 18.5 24.5 22 23C20 26 16 26.5 16 26.5C16 26.5 12 26 10 23Z"
        fill="#5E101C"
      />
      <circle cx="16" cy="4" r="1.5" fill="#C9A24B" />
      <circle cx="9" cy="14" r="1.2" fill="#C9A24B" />
      <circle cx="23" cy="14" r="1.2" fill="#C9A24B" />
    </svg>
  );
}

/**
 * Calendar Icon with dots matching the exact design
 */
function CalendarDesignIcon({ className = 'w-7 h-7 text-maroon-900' }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="3" y="6" width="22" height="18" rx="4" stroke="#5E101C" strokeWidth="2" />
      <line x1="3" y1="11" x2="25" y2="11" stroke="#5E101C" strokeWidth="1.75" />
      <line x1="8" y1="3.5" x2="8" y2="7.5" stroke="#5E101C" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="3.5" x2="20" y2="7.5" stroke="#5E101C" strokeWidth="2" strokeLinecap="round" />
      <circle cx="8.5" cy="16" r="1.2" fill="#5E101C" />
      <circle cx="14" cy="16" r="1.2" fill="#5E101C" />
      <circle cx="19.5" cy="16" r="1.2" fill="#5E101C" />
      <circle cx="8.5" cy="20" r="1.2" fill="#5E101C" />
      <circle cx="14" cy="20" r="1.2" fill="#5E101C" />
    </svg>
  );
}

/**
 * Map Pin Icon matching the design
 */
function MapPinDesignIcon({ className = 'w-7 h-7 text-maroon-900' }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M14 24C14 24 22 17.5 22 11.5C22 7.08172 18.4183 3.5 14 3.5C9.58172 3.5 6 7.08172 6 11.5C6 17.5 14 24 14 24Z"
        stroke="#5E101C"
        strokeWidth="2"
      />
      <circle cx="14" cy="11.5" r="3.5" stroke="#5E101C" strokeWidth="1.75" />
    </svg>
  );
}

/**
 * Clock Icon matching the design
 */
function ClockDesignIcon({ className = 'w-7 h-7 text-maroon-900' }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="14" cy="14" r="10" stroke="#5E101C" strokeWidth="2" />
      <polyline points="14 8 14 14 18 16" stroke="#5E101C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const INFO_BAR_ITEMS = [
  {
    icon: CalendarDesignIcon,
    label: 'DATE',
    value: '18 January 2026',
  },
  {
    icon: ClockDesignIcon,
    label: 'TIME',
    value: '10:00 AM Onwards',
  },
  {
    icon: MapPinDesignIcon,
    label: 'VENUE',
    value: 'Main Convocation Hall',
  },
  {
    icon: EditionIcon,
    label: 'EDITION',
    value: '14th Convocation',
  },
];

/**
 * Information Bar matching the exact design mockup
 */
export function InformationBar({ className = '' }) {
  return (
    <div
      className={`w-full bg-white rounded-[24px] sm:rounded-[28px] border border-[#E4DED4] shadow-[0_8px_30px_rgba(0,0,0,0.06)] px-6 py-6 sm:px-10 sm:py-6 ${className}`}
      aria-label="Convocation Key Information"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center">
        {INFO_BAR_ITEMS.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-4">
              <div className="shrink-0 flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-maroon-900" />
              </div>
              <div className="flex flex-col">
                <span className="font-body text-[12px] font-semibold tracking-wider text-charcoal-600 uppercase">
                  {item.label}
                </span>
                <span className="font-body font-medium text-charcoal-900 text-[15px] sm:text-[16px] leading-tight mt-0.5 whitespace-nowrap">
                  {item.value}
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
