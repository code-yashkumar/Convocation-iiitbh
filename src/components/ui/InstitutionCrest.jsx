import React from 'react';

/**
 * Institutional Emblem / Crest SVG matching the design system
 */
export function InstitutionCrest({ className = 'w-10 h-10', ...props }) {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-maroon-050 border border-maroon-900/20 p-1.5 shadow-sm ${className}`} {...props}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-maroon-900"
      >
        {/* Outer Laurel / Sunburst circle */}
        <circle cx="24" cy="24" r="21" stroke="#5E101C" strokeWidth="1.5" strokeDasharray="2 2" />
        <circle cx="24" cy="24" r="18.5" stroke="#5E101C" strokeWidth="1" />
        
        {/* Inner Flame / Torch of Wisdom */}
        <path
          d="M24 10C24 10 21 15 21 18C21 19.6569 22.3431 21 24 21C25.6569 21 27 19.6569 27 18C27 15 24 10 24 10Z"
          fill="#C9A24B"
        />
        
        {/* Open Book / Pillars */}
        <path
          d="M16 27C19 25.5 22 26 24 27.5C26 26 29 25.5 32 27V34C29 32.5 26 33 24 34.5C22 33 19 32.5 16 34V27Z"
          fill="#5E101C"
        />
        <path
          d="M24 27.5V34.5"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Academic Pillar Lines */}
        <line x1="19" y1="28" x2="19" y2="32.5" stroke="#FFFFFF" strokeWidth="0.75" />
        <line x1="29" y1="28" x2="29" y2="32.5" stroke="#FFFFFF" strokeWidth="0.75" />
        
        {/* Base Foundation */}
        <rect x="14" y="35" width="20" height="2" rx="1" fill="#C9A24B" />
      </svg>
    </div>
  );
}

export default InstitutionCrest;
