import { useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

const LOCAL_STORAGE_KILLSWITCH_KEY = 'convocation_site_killswitch_active';

export function useSiteAvailability() {
  const [isSiteDown, setIsSiteDown] = useState(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KILLSWITCH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Helper to extract down state from Supabase payload or row
  const parseIsDown = (row) => {
    if (!row) return false;
    if (row.site_down === true) return true;
    if (typeof row.recording_url === 'string' && row.recording_url.includes('#sitedown=1')) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    const fetchRemoteAvailability = async () => {
      try {
        const { data, error } = await supabase
          .from('convocation_state')
          .select('*')
          .eq('id', 'current')
          .single();

        if (data && !error) {
          const down = parseIsDown(data);
          setIsSiteDown(down);
          setLastUpdated(data.updated_at || new Date().toISOString());
          try {
            localStorage.setItem(LOCAL_STORAGE_KILLSWITCH_KEY, down ? 'true' : 'false');
          } catch {
            // ignore
          }
        }
      } catch (err) {
        console.warn('Could not fetch site availability state from Supabase:', err);
      }
    };

    fetchRemoteAvailability();

    // Setup Realtime Subscription for instantaneous broadcast across all devices
    let channel = null;
    try {
      const channelId = `site_avail_${Math.random().toString(36).substring(2, 9)}`;
      channel = supabase
        .channel(channelId)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'convocation_state' },
          (payload) => {
            if (payload?.new) {
              const down = parseIsDown(payload.new);
              setIsSiteDown(down);
              setLastUpdated(payload.new.updated_at || new Date().toISOString());
              try {
                localStorage.setItem(LOCAL_STORAGE_KILLSWITCH_KEY, down ? 'true' : 'false');
              } catch {
                // ignore
              }
            }
          }
        )
        .subscribe();
    } catch (subErr) {
      console.warn('Realtime subscription error for site availability:', subErr);
    }

    // 10-second polling fallback
    const pollInterval = setInterval(fetchRemoteAvailability, 10000);

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

  const toggleSiteDown = async (shouldBeDown) => {
    setLoading(true);

    // Immediate local feedback
    setIsSiteDown(shouldBeDown);
    try {
      localStorage.setItem(LOCAL_STORAGE_KILLSWITCH_KEY, shouldBeDown ? 'true' : 'false');
    } catch {
      // ignore
    }

    if (isSupabaseConfigured && supabase) {
      try {
        // Fetch current recording_url to cleanly append or remove the flag
        const { data: currentData } = await supabase
          .from('convocation_state')
          .select('recording_url')
          .eq('id', 'current')
          .single();

        const rawUrl = currentData?.recording_url || 'https://youtube.com/watch?v=placeholder';
        const cleanUrl = rawUrl.replace(/#sitedown=[01]/g, '');
        const targetRecordingUrl = shouldBeDown ? `${cleanUrl}#sitedown=1` : cleanUrl;

        const { error } = await supabase
          .from('convocation_state')
          .update({
            recording_url: targetRecordingUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', 'current');

        if (error) {
          throw error;
        }

        setLastUpdated(new Date().toISOString());
      } catch (err) {
        console.error('Failed to update kill switch state in Supabase:', err);
        setLoading(false);
        throw err;
      }
    }

    setLoading(false);
    return true;
  };

  return {
    isSiteDown,
    loading,
    lastUpdated,
    toggleSiteDown,
  };
}

export default useSiteAvailability;
