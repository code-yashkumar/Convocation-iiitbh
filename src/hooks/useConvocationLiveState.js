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
  const [isTestModeActive, setIsTestModeActive] = useState(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('test') === 'true') return true;
      if (searchParams.get('test') === 'false') return false;
    }
    return TEST_MODE;
  });
  const [testRunId, setTestRunId] = useState(0);
  const [testTimeLeft, setTestTimeLeft] = useState(null);
  const hasPlayedLiveRollRef = useRef(false);

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

    // Setup Realtime Subscription with unique channel name per instance
    let channel = null;
    try {
      const channelId = `convocation_live_${Math.random().toString(36).substring(2, 9)}`;
      channel = supabase
        .channel(channelId)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'convocation_state' },
          (payload) => {
            if (payload?.new) {
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
    } catch (subErr) {
      console.warn('Realtime channel error, falling back to polling:', subErr);
    }

    // 15-second polling fallback in case WebSockets fail
    const pollInterval = setInterval(fetchRemoteState, 15000);

    return () => {
      if (channel) {
        try {
          supabase.removeChannel(channel);
        } catch {
          // ignore
        }
      }
      clearInterval(pollInterval);
    };
  }, []);

  // 2. State Resolution Engine (Test Mode vs Auto Schedule vs Manual Override)
  useEffect(() => {
    let animationFrameId = null;
    let toEndedTimer = null;
    let resetOverrideTimer = null;

    // Helper to start the fast 2-second roll and trigger flip to live
    const playFastRollToLive = (onFlipComplete) => {
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

      const LOCK_DAYS = ROLL_DURATION * 0.68;
      const LOCK_HOURS = ROLL_DURATION * 0.78;
      const LOCK_MINS = ROLL_DURATION * 0.88;
      const LOCK_SECS = ROLL_DURATION;

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

          // Keep 00 visible for 800ms during the 700ms card flip so it doesn't flicker
          resetOverrideTimer = setTimeout(() => {
            setTestTimeLeft(null);
          }, 800);

          if (onFlipComplete) {
            onFlipComplete();
          }
        }
      };

      animationFrameId = requestAnimationFrame(animateRoll);
    };

    // Calculate current target state
    const computeCurrentTarget = () => {
      if (isTestModeActive) return 'test';
      if (config.mode === 'countdown') return 'countdown';
      if (config.mode === 'live') return 'live';
      if (config.mode === 'ended') return 'ended';

      // 'auto' mode
      const now = new Date().getTime();
      const startTime = new Date(config.event_start || DEFAULT_EVENT_START).getTime();
      const endTime = new Date(config.event_end || DEFAULT_EVENT_END).getTime();

      if (now < startTime) return 'countdown';
      if (now >= startTime && now < endTime) return 'live';
      return 'ended';
    };

    const target = computeCurrentTarget();

    if (target === 'test') {
      hasPlayedLiveRollRef.current = true;
      playFastRollToLive(() => {
        toEndedTimer = setTimeout(() => {
          setActiveState('ended');
        }, TEST_LIVE_DURATION_SECONDS * 1000);
      });
    } else if (target === 'live') {
      // If we haven't played the fast-roll sequence yet (e.g. on page load / refresh or live transition)
      if (!hasPlayedLiveRollRef.current) {
        hasPlayedLiveRollRef.current = true;
        playFastRollToLive();
      } else {
        setTestTimeLeft(null);
        setActiveState('live');
      }
    } else if (target === 'ended') {
      hasPlayedLiveRollRef.current = false;
      setTestTimeLeft(null);
      setActiveState('ended');
    } else {
      // 'countdown'
      hasPlayedLiveRollRef.current = false;
      setTestTimeLeft(null);
      setActiveState('countdown');
    }

    // Interval to poll auto schedule if mode is auto
    const interval = setInterval(() => {
      if (config.mode === 'auto') {
        const nextTarget = computeCurrentTarget();
        if (nextTarget === 'live' && !hasPlayedLiveRollRef.current) {
          hasPlayedLiveRollRef.current = true;
          playFastRollToLive();
        } else if (nextTarget === 'ended' && activeState !== 'ended') {
          hasPlayedLiveRollRef.current = false;
          setTestTimeLeft(null);
          setActiveState('ended');
        }
      }
    }, 1000);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (toEndedTimer) clearTimeout(toEndedTimer);
      if (resetOverrideTimer) clearTimeout(resetOverrideTimer);
      clearInterval(interval);
    };
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
