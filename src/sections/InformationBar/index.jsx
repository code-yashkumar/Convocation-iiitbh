import React from 'react';

/**
 * Custom Ceremonial Lotus / Crest Icon for Edition
 */
function EditionIcon({ className = 'w-7 h-7 text-maroon-900' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M16 6C16 6 13 11 13 14C13 15.6569 14.3431 17 16 17C17.6569 17 19 15.6569 19 14C19 11 16 6 16 6Z"
        fill="currentColor"
      />
      <path
        d="M8.5 17C10.5 17 12.5 15.5 13.5 13.5C12.5 17.5 10 20 7 20.5C6.5 18.5 7.5 17 8.5 17Z"
        fill="currentColor"
      />
      <path
        d="M23.5 17C21.5 17 19.5 15.5 18.5 13.5C19.5 17.5 22 20 25 20.5C25.5 18.5 24.5 17 23.5 17Z"
        fill="currentColor"
      />
      <path
        d="M10 23C13.5 24.5 18.5 24.5 22 23C20 26 16 26.5 16 26.5C16 26.5 12 26 10 23Z"
        fill="currentColor"
      />
      <circle cx="16" cy="4" r="1.5" className="edition-dot" fill="#C9A24B" />
      <circle cx="9" cy="14" r="1.2" className="edition-dot" fill="#C9A24B" />
      <circle cx="23" cy="14" r="1.2" className="edition-dot" fill="#C9A24B" />
    </svg>
  );
}

/**
 * Calendar Icon with dots matching the exact design
 */
function CalendarDesignIcon({ className = 'w-7 h-7 text-maroon-900' }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="3" y="6" width="22" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
      <line x1="3" y1="11" x2="25" y2="11" stroke="currentColor" strokeWidth="1.75" />
      <line x1="8" y1="3.5" x2="8" y2="7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="3.5" x2="20" y2="7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="8.5" cy="16" r="1.2" fill="currentColor" />
      <circle cx="14" cy="16" r="1.2" fill="currentColor" />
      <circle cx="19.5" cy="16" r="1.2" fill="currentColor" />
      <circle cx="8.5" cy="20" r="1.2" fill="currentColor" />
      <circle cx="14" cy="20" r="1.2" fill="currentColor" />
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
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="14" cy="11.5" r="3.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

/**
 * Clock Icon matching the design
 */
function ClockDesignIcon({ className = 'w-7 h-7 text-maroon-900' }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2" />
      <polyline points="14 8 14 14 18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const INFO_BAR_ITEMS = [
  {
    icon: CalendarDesignIcon,
    label: 'DATE',
    value: '26 September 2026',
  },
  {
    icon: ClockDesignIcon,
    label: 'TIME',
    value: '10:00 AM Onwards',
  },
  {
    icon: MapPinDesignIcon,
    label: 'VENUE',
    value: 'Main Lecture Hall',
  },
  {
    icon: EditionIcon,
    label: 'EDITION',
    value: '3rd Convocation',
  },
];

/**
 * Information Bar matching the exact design mockup
 * Light Mode: White card with dark text and maroon icons
 * Dark Mode / Dark Reader: Custom Dark Maroon card with white text and light icons
 */
export function InformationBar({ className = '' }) {
  return (
    <div
      id="event-info-bar"
      data-darkreader-ignore="true"
      className={`event-info-bar w-full bg-white rounded-[22px] sm:rounded-[28px] 2xl:rounded-[36px] border border-[#E4DED4] shadow-[0_8px_30px_rgba(0,0,0,0.06)] px-4 py-4 sm:px-10 sm:py-6 2xl:px-14 2xl:py-9 transition-colors duration-200 ${className}`}
      aria-label="Convocation Key Information"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-4 sm:gap-8 2xl:gap-12 items-center">
        {INFO_BAR_ITEMS.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.label} className="flex items-start sm:items-center gap-2.5 sm:gap-4 2xl:gap-6">
              <div className="info-bar-icon shrink-0 flex items-center justify-center mt-0.5 sm:mt-0 text-maroon-900">
                <IconComponent className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6 sm:w-8 sm:h-8 2xl:w-12 2xl:h-12" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="info-bar-label font-body text-[10px] sm:text-[12px] 2xl:text-[16px] font-semibold tracking-wider text-charcoal-600 uppercase">
                  {item.label}
                </span>
                <span className="info-bar-value font-body font-medium text-charcoal-900 text-[12.5px] min-[370px]:text-[13.5px] sm:text-[16px] 2xl:text-[22px] leading-snug sm:leading-tight mt-0.5 2xl:mt-1 whitespace-normal lg:whitespace-nowrap break-words">
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

