import React, { useState, useEffect } from 'react';

/**
 * Countdown Card strictly conforming to DESIGN_SYSTEM.md Section 5.4 & Section 6
 *
 * @param {string | Date} targetDate
 * @param {string} className
 */
export function CountdownCard({
  targetDate = '2026-11-20T10:00:00+05:30',
  className = '',
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div
      className={`card-inverse p-6 sm:p-8 flex flex-col items-center justify-center text-center select-none ${className}`}
      aria-label="Convocation Event Countdown"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" aria-hidden="true" />
        <p className="type-label text-gold-500 uppercase tracking-widest text-[12px]">
          Event Countdown
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full">
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center justify-center p-2 rounded-md bg-white/5 border border-white/10">
            <span className="type-numeral-countdown text-white font-bold block">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="type-label text-white/75 uppercase tracking-wider text-[11px] sm:text-[12px] mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Accessible target date text for assistive technology (Section 5.4) */}
      <span className="sr-only">
        Convocation ceremony will commence on November 20, 2026 at 10:00 AM IST.
      </span>
    </div>
  );
}

export default CountdownCard;
