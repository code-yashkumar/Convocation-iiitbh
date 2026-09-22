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
  const isRollingRef = useRef(false);
  const rollTimerRef = useRef(null);

  const restartTestSequence = () => {
    if (rollTimerRef.current) {
      clearInterval(rollTimerRef.current);
      rollTimerRef.current = null;
    }
    hasPlayedLiveRollRef.current = false;
    isRollingRef.current = false;
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
          setConfig((prev) => {
            if (
              prev &&
              prev.mode === data.mode &&
              prev.live_url === data.live_url &&
              prev.recording_url === data.recording_url &&
              prev.event_start === data.event_start &&
              prev.event_end === data.event_end
            ) {
              return prev;
            }
            return data;
          });
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
              setConfig((prev) => {
                if (
                  prev &&
                  prev.mode === payload.new.mode &&
                  prev.live_url === payload.new.live_url &&
                  prev.recording_url === payload.new.recording_url &&
                  prev.event_start === payload.new.event_start &&
                  prev.event_end === payload.new.event_end
                ) {
                  return prev;
                }
                return payload.new;
              });
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
    let toEndedTimer = null;
    let resetOverrideTimer = null;

    // Helper to start the fast 2-second roll and trigger flip to live
    const playFastRollToLive = (onFlipComplete) => {
      if (rollTimerRef.current) {
        clearInterval(rollTimerRef.current);
        rollTimerRef.current = null;
      }

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

      const TOTAL_STEPS = 50;     // 50 steps * 40ms = 2000ms = exactly 2.0s
      const LOCK_DAYS_STEP = 33;  // ~1.32s
      const LOCK_HOURS_STEP = 38; // ~1.52s
      const LOCK_MINS_STEP = 43;  // ~1.72s
      const LOCK_SECS_STEP = 47;  // ~1.88s

      let currentStep = 0;

      const computeStepVal = (startVal, lockStep, maxRange) => {
        if (currentStep >= lockStep) return 0;
        const remaining = 1 - currentStep / lockStep;
        const decay = Math.pow(remaining, 1.6);
        const base = Math.floor(startVal * decay);
        const jitter = Math.floor(Math.random() * Math.max(1, Math.floor(maxRange * decay * 0.4)));
        return Math.max(0, Math.min(maxRange, base + jitter));
      };

      rollTimerRef.current = setInterval(() => {
        currentStep++;

        if (currentStep < TOTAL_STEPS) {
          setTestTimeLeft({
            days: computeStepVal(START_DAYS, LOCK_DAYS_STEP, 30),
            hours: computeStepVal(START_HOURS, LOCK_HOURS_STEP, 24),
            minutes: computeStepVal(START_MINS, LOCK_MINS_STEP, 60),
            seconds: computeStepVal(START_SECS, LOCK_SECS_STEP, 60),
          });
        } else {
          // Exactly step 50 (2000ms = 2.0s) reached!
          clearInterval(rollTimerRef.current);
          rollTimerRef.current = null;

          setTestTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          });

          hasPlayedLiveRollRef.current = true;
          isRollingRef.current = false;

          // Trigger 3D Card Flip to LIVE at exactly 2.0 seconds
          setActiveState('live');

          // Keep 00 visible for 800ms during the 700ms card flip so it doesn't flicker
          resetOverrideTimer = setTimeout(() => {
            setTestTimeLeft(null);
          }, 800);

          if (onFlipComplete) {
            onFlipComplete();
          }
        }
      }, 40);
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

    // If currently rolling, let the 50-step roll complete uninterrupted!
    if (isRollingRef.current) {
      return;
    }

    if (target === 'test') {
      isRollingRef.current = true;
      playFastRollToLive(() => {
        toEndedTimer = setTimeout(() => {
          setActiveState('ended');
        }, TEST_LIVE_DURATION_SECONDS * 1000);
      });
    } else if (target === 'live') {
      // If we haven't played the fast-roll sequence yet (e.g. on page load / refresh or live transition)
      if (!hasPlayedLiveRollRef.current) {
        isRollingRef.current = true;
        playFastRollToLive();
      } else {
        setTestTimeLeft(null);
        setActiveState('live');
      }
    } else if (target === 'ended') {
      hasPlayedLiveRollRef.current = false;
      isRollingRef.current = false;
      if (rollTimerRef.current) {
        clearInterval(rollTimerRef.current);
        rollTimerRef.current = null;
      }
      setTestTimeLeft(null);
      setActiveState('ended');
    } else {
      // 'countdown'
      hasPlayedLiveRollRef.current = false;
      isRollingRef.current = false;
      if (rollTimerRef.current) {
        clearInterval(rollTimerRef.current);
        rollTimerRef.current = null;
      }
      setTestTimeLeft(null);
      setActiveState('countdown');
    }

    // Interval to poll auto schedule if mode is auto
    const interval = setInterval(() => {
      if (config.mode === 'auto') {
        const nextTarget = computeCurrentTarget();
        if (nextTarget === 'live' && !hasPlayedLiveRollRef.current && !isRollingRef.current) {
          isRollingRef.current = true;
          playFastRollToLive();
        } else if (nextTarget === 'ended' && activeState !== 'ended') {
          hasPlayedLiveRollRef.current = false;
          isRollingRef.current = false;
          if (rollTimerRef.current) {
            clearInterval(rollTimerRef.current);
            rollTimerRef.current = null;
          }
          setTestTimeLeft(null);
          setActiveState('ended');
        }
      }
    }, 1000);

    return () => {
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
