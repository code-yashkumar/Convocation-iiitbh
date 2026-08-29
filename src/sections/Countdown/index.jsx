import React, { useState, useEffect } from 'react';

/**
 * Compact Maroon Countdown Card matching the reference mockup
 *
 * @param {string | Date} targetDate
 * @param {string} className
 */
export function CountdownCard({
  targetDate = '2026-09-26T10:00:00+05:30',
  className = '',
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 29,
    hours: 8,
    minutes: 45,
    seconds: 12,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div
      className={`bg-[#540D17] text-white rounded-[22px] sm:rounded-[26px] p-5 sm:p-5.5 shadow-[0_12px_32px_rgba(84,13,23,0.3)] flex flex-col justify-between select-none border border-white/10 ${className}`}
      aria-label="Convocation Event Countdown"
    >
      {/* Header text */}
      <div className="text-white/80 font-body text-[13px] font-medium tracking-tight">
        Convocation Begins In
      </div>

      {/* Main Dominant Days Numeral */}
      <div className="my-1.5 sm:my-2">
        <div className="font-mono font-bold text-[52px] sm:text-[58px] leading-[0.92] text-white tracking-tight tabular-nums">
          {String(timeLeft.days).padStart(2, '0')}
        </div>
        <div className="text-white/90 font-body text-[14px] sm:text-[15px] font-medium mt-0.5">
          Days
        </div>
      </div>

      {/* Bottom Sub-Time Units */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-white/80 font-body text-[11px] sm:text-[12px] tracking-tight">
        <span className="tabular-nums font-medium">
          {String(timeLeft.hours).padStart(2, '0')} Hours
        </span>
        <span className="tabular-nums font-medium">
          {String(timeLeft.minutes).padStart(2, '0')} Mins
        </span>
        <span className="tabular-nums font-medium">
          {String(timeLeft.seconds).padStart(2, '0')} Secs
        </span>
      </div>

      {/* Accessible target date text */}
      <span className="sr-only">
        Convocation ceremony will take place on 26 September 2026 at 10:00 AM.
      </span>
    </div>
  );
}

export default CountdownCard;
