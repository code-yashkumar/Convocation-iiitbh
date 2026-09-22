import { useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import {
  TEST_MODE,
  TEST_ROLL_DURATION_MS,
  TEST_ZERO_HOLD_MS,
  TEST_LIVE_DURATION_SECONDS,
  DEFAULT_EVENT_START,
  DEFAULT_EVENT_END,
  DEFAULT_LIVE_URL,
  DEFAULT_RECORDING_URL,
} from '../config/convocationLiveConfig';

const LOCAL_STORAGE_KEY = 'convocation_live_state_override';

export function useConvocationLiveState() {
  // Config state
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      mode: 'auto',
      live_url: DEFAULT_LIVE_URL,
      recording_url: DEFAULT_RECORDING_URL,
      event_start: DEFAULT_EVENT_START,
      event_end: DEFAULT_EVENT_END,
    };
  });

  // Effective displayed state: 'countdown' | 'live' | 'ended'
  const [activeState, setActiveState] = useState('countdown');
  const [isTestModeActive, setIsTestModeActive] = useState(TEST_MODE);
  const [testRunId, setTestRunId] = useState(0);
  const [testTimeLeft, setTestTimeLeft] = useState(null);

  const restartTestSequence = () => {
    setIsTestModeActive(true);
    setTestRunId((prev) => prev + 1);
  };

  // 1. Fetch remote state from Supabase if configured
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    const fetchRemoteState = async () => {
      try {
        const { data, error } = await supabase
          .from('convocation_state')
          .select('*')
          .eq('id', 'current')
          .single();

        if (data && !error) {
          setConfig(data);
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
          } catch {
            // ignore
          }
        }
      } catch (err) {
        console.warn('Supabase state fetch error, using local fallback:', err);
      }
    };

    fetchRemoteState();

    // Setup Realtime Subscription
    const channel = supabase
      .channel('convocation_state_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'convocation_state' },
        (payload) => {
          if (payload.new) {
            setConfig(payload.new);
            try {
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload.new));
            } catch {
              // ignore
            }
          }
        }
      )
      .subscribe();

    // 15-second polling fallback in case WebSockets fail
    const pollInterval = setInterval(fetchRemoteState, 15000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(pollInterval);
    };
  }, []);

  // 2. State Resolution Engine (Test Mode vs Auto Schedule vs Manual Override)
  useEffect(() => {
    // If TEST_MODE is active, run the 2-second fast roll sequence:
    // All digits roll rapidly across Days, Hours, Mins, Secs and cascade to 00 00 00 00,
    // hold briefly at zero, and then card flips to LIVE (all within 2 seconds).
    if (isTestModeActive) {
      setActiveState('countdown');

      const START_DAYS = 28;
      const START_HOURS = 14;
      const START_MINS = 36;
      const START_SECS = 48;

      setTestTimeLeft({
        days: START_DAYS,
        hours: START_HOURS,
        minutes: START_MINS,
        seconds: START_SECS,
      });

      const ROLL_DURATION = TEST_ROLL_DURATION_MS || 1500; // 1.5s rapid roll
      const ZERO_HOLD = TEST_ZERO_HOLD_MS || 500;          // 0.5s zero hold
      const TOTAL_BEFORE_FLIP = ROLL_DURATION + ZERO_HOLD; // 2.0s total

      // Staggered lock times for cascading zeroes
      const LOCK_DAYS = ROLL_DURATION * 0.68;   // ~1020ms
      const LOCK_HOURS = ROLL_DURATION * 0.78;  // ~1170ms
      const LOCK_MINS = ROLL_DURATION * 0.88;   // ~1320ms
      const LOCK_SECS = ROLL_DURATION;          // 1500ms

      let animationFrameId;
      let toEndedTimer;
      let lastFrameTime = 0;
      const startTime = performance.now();

      const computeValue = (startVal, lockTime, maxRange, elapsed) => {
        if (elapsed >= lockTime) return 0;
        const remaining = 1 - elapsed / lockTime;
        const decay = Math.pow(remaining, 1.6);
        const base = Math.floor(startVal * decay);
        const jitter = Math.floor(Math.random() * Math.max(1, Math.floor(maxRange * decay * 0.4)));
        return Math.max(0, Math.min(maxRange, base + jitter));
      };

      const animateRoll = (now) => {
        const elapsed = now - startTime;

        if (elapsed < TOTAL_BEFORE_FLIP) {
          // Throttle state update to ~32ms (~30fps) for crisp, readable rolling motion
          if (now - lastFrameTime >= 32) {
            lastFrameTime = now;

            setTestTimeLeft({
              days: computeValue(START_DAYS, LOCK_DAYS, 30, elapsed),
              hours: computeValue(START_HOURS, LOCK_HOURS, 24, elapsed),
              minutes: computeValue(START_MINS, LOCK_MINS, 60, elapsed),
              seconds: computeValue(START_SECS, LOCK_SECS, 60, elapsed),
            });
          }
          animationFrameId = requestAnimationFrame(animateRoll);
        } else {
          // Exactly 00 across all fields at end of 2 seconds
          setTestTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          });

          // Trigger 3D Card Flip to LIVE at exactly 2 seconds
          setActiveState('live');

          // Stay in LIVE for TEST_LIVE_DURATION_SECONDS before flipping to ENDED
          toEndedTimer = setTimeout(() => {
            setActiveState('ended');
          }, TEST_LIVE_DURATION_SECONDS * 1000);
        }
      };

      animationFrameId = requestAnimationFrame(animateRoll);

      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (toEndedTimer) clearTimeout(toEndedTimer);
      };
    }

    // PRODUCTION / NORMAL MODE:
    setTestTimeLeft(null);

    const resolveProductionState = () => {
      if (config.mode === 'countdown') {
        setActiveState('countdown');
        return;
      }
      if (config.mode === 'live') {
        setActiveState('live');
        return;
      }
      if (config.mode === 'ended') {
        setActiveState('ended');
        return;
      }

      // Mode is 'auto': calculate based on local system time
      const now = new Date().getTime();
      const startTime = new Date(config.event_start || DEFAULT_EVENT_START).getTime();
      const endTime = new Date(config.event_end || DEFAULT_EVENT_END).getTime();

      if (now < startTime) {
        setActiveState('countdown');
      } else if (now >= startTime && now < endTime) {
        setActiveState('live');
      } else {
        setActiveState('ended');
      }
    };

    resolveProductionState();
    const interval = setInterval(resolveProductionState, 1000);
    return () => clearInterval(interval);
  }, [isTestModeActive, testRunId, config]);

  return {
    activeState,
    config,
    setConfig,
    isTestModeActive,
    setIsTestModeActive,
    testTimeLeft,
    restartTestSequence,
  };
}

export default useConvocationLiveState;
