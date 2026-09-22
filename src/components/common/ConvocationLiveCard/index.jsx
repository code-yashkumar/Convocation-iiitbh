import React, { useState, useEffect, useRef } from 'react';
import CountdownCard from '../../../sections/Countdown';
import LiveCardFace from './LiveCardFace';
import EndedCardFace from './EndedCardFace';
import { useConvocationLiveState } from '../../../hooks/useConvocationLiveState';

/**
 * 3D Flippable Card Container for Convocation Live State Control
 * States: 'countdown' | 'live' | 'ended'
 * Transitions: Smooth 700ms 3D Card Flip preserving identical size, rounded corners, and shadow.
 */
export function ConvocationLiveCard({ className = '' }) {
  const {
    activeState,
    config,
    testTimeLeft,
  } = useConvocationLiveState();

  // Face Management:
  // We maintain a "front" and "back" face of the physical card.
  // When flipping from 0deg to 180deg, the back face displays the incoming state.
  // After flip completion, we normalize back to 0deg with the new front state.
  const [displayedFrontState, setDisplayedFrontState] = useState(activeState);
  const [displayedBackState, setDisplayedBackState] = useState(activeState);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const prevActiveStateRef = useRef(activeState);
  const flipTimeoutRef = useRef(null);

  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    // If state didn't change, do nothing
    if (activeState === prevActiveStateRef.current) return;

    const previousState = prevActiveStateRef.current;
    prevActiveStateRef.current = activeState;

    if (prefersReducedMotion) {
      setDisplayedFrontState(activeState);
      return;
    }

    // Set the incoming target state on the back face
    setDisplayedBackState(activeState);
    setIsAnimating(true);
    setIsFlipped(true);

    // After animation duration (700ms), normalize card rotation
    if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    flipTimeoutRef.current = setTimeout(() => {
      setDisplayedFrontState(activeState);
      setIsFlipped(false);
      setIsAnimating(false);
    }, 700);

    return () => {
      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    };
  }, [activeState, prefersReducedMotion]);

  // Helper to render face by state name
  const renderCardContent = (stateName) => {
    if (stateName === 'live') {
      return <LiveCardFace liveUrl={config.live_url} />;
    }
    if (stateName === 'ended') {
      return <EndedCardFace recordingUrl={config.recording_url} />;
    }
    // Default countdown state
    return (
      <CountdownCard
        targetDate={config.event_start}
        overrideTimeLeft={testTimeLeft}
        className="w-full h-full shadow-none"
      />
    );
  };

  return (
    <div
      className={`relative w-full select-none ${className}`}
      style={{
        perspective: '1200px',
      }}
    >
      {/* 3D Flippable Box */}
      <div
        className="relative w-full rounded-[1.25rem] transition-transform shadow-[0_0.75rem_2rem_rgba(84,13,23,0.3)]"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transitionDuration: isAnimating ? '700ms' : '0ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Front Face */}
        <div
          className="w-full h-full rounded-[1.25rem] overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {renderCardContent(displayedFrontState)}
        </div>

        {/* Back Face (rotated 180deg initially) */}
        <div
          className="absolute inset-0 w-full h-full rounded-[1.25rem] overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {renderCardContent(displayedBackState)}
        </div>
      </div>
    </div>
  );
}

export default ConvocationLiveCard;
