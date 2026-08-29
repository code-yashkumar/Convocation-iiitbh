import React from 'react';

/**
 * Official IIIT Bhagalpur Emblem / College Logo
 */
export function InstitutionCrest({ className = 'w-11 h-11', ...props }) {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      {...props}
    >
      <img
        src="/assets/iiitbh-logo.png"
        alt="Official Emblem of Indian Institute of Information Technology Bhagalpur"
        width="44"
        height="44"
        className="w-full h-full object-contain select-none"
      />
    </div>
  );
}

export default InstitutionCrest;
