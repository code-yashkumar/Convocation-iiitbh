import React, { useState, useEffect } from 'react';

/**
 * Countdown Card matching the exact visual design in the mockup
 *
 * @param {string | Date} targetDate
 * @param {string} className
 */
export function CountdownCard({
  targetDate = '2026-01-18T10:00:00+05:30',
  className = '',
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 23,
    hours: 8,
    minutes: 45,
    seconds: 12,
  });

  useEffect(() => {
    // If target date is in the future, calculate real difference
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
      className={`bg-[#580F1B] text-white rounded-[22px] p-6 sm:p-7 shadow-2xl flex flex-col justify-between select-none ${className}`}
      aria-label="Convocation Event Countdown"
    >
      {/* Header text */}
      <div className="text-white/80 font-body text-[14px] sm:text-[15px] font-medium tracking-tight">
        Convocation Begins In
      </div>

      {/* Main Dominant Days Numeral */}
      <div className="my-2 sm:my-3">
        <div className="font-body font-bold text-[68px] sm:text-[76px] leading-[1] text-white tracking-tight tabular-nums">
          {String(timeLeft.days).padStart(2, '0')}
        </div>
        <div className="text-white/90 font-body text-[16px] sm:text-[17px] font-medium mt-1">
          Days
        </div>
      </div>

      {/* Bottom Sub-Time Units */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-white/80 font-body text-[12px] sm:text-[13px] tracking-tight">
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
        Convocation ceremony will take place on 18 January 2026 at 10:00 AM.
      </span>
    </div>
  );
}

export default CountdownCard;
