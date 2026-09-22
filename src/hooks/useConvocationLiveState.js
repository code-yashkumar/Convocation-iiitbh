import { useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import {
  TEST_MODE,
  TEST_COUNTDOWN_SECONDS,
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
  const [testTimeLeft, setTestTimeLeft] = useState(null);

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
    // If TEST_MODE is active, run the test sequence:
    // Countdown 10 -> 0, pause 750ms -> Live 15s -> pause -> Ended
    if (isTestModeActive) {
      let secondsLeft = TEST_COUNTDOWN_SECONDS;
      setTestTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: secondsLeft,
      });
      setActiveState('countdown');

      const countdownInterval = setInterval(() => {
        secondsLeft -= 1;
        if (secondsLeft >= 0) {
          setTestTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: secondsLeft,
          });
        }

        if (secondsLeft <= 0) {
          clearInterval(countdownInterval);

          // Brief pause at zero (750ms) before flipping to LIVE
          const toLiveTimer = setTimeout(() => {
            setActiveState('live');

            // Stay in LIVE for TEST_LIVE_DURATION_SECONDS before flipping to ENDED
            const toEndedTimer = setTimeout(() => {
              setActiveState('ended');
            }, TEST_LIVE_DURATION_SECONDS * 1000);

            return () => clearTimeout(toEndedTimer);
          }, 750);

          return () => clearTimeout(toLiveTimer);
        }
      }, 1000);

      return () => clearInterval(countdownInterval);
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
  }, [isTestModeActive, config]);

  return {
    activeState,
    config,
    setConfig,
    isTestModeActive,
    setIsTestModeActive,
    testTimeLeft,
  };
}

export default useConvocationLiveState;
