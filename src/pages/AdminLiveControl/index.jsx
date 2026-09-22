import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../services/supabaseClient';
import {
  DEFAULT_EVENT_START,
  DEFAULT_EVENT_END,
  DEFAULT_LIVE_URL,
  DEFAULT_RECORDING_URL,
} from '../../config/convocationLiveConfig';
import {
  Radio,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Save,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Video,
  Calendar,
  X,
  Sparkles,
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'convocation_live_state_override';

export function AdminLiveControl() {
  const [formData, setFormData] = useState({
    mode: 'auto', // 'auto' | 'countdown' | 'live' | 'ended'
    live_url: DEFAULT_LIVE_URL,
    recording_url: DEFAULT_RECORDING_URL,
    event_start: DEFAULT_EVENT_START,
    event_end: DEFAULT_EVENT_END,
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ open: false, targetState: null });

  // Load initial data from Supabase or localStorage
  useEffect(() => {
    const loadState = async () => {
      setLoading(true);
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from('convocation_state')
            .select('*')
            .eq('id', 'current')
            .single();

          if (data && !error) {
            setFormData(data);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn('Could not fetch from Supabase, checking local cache:', err);
        }
      }

      // Local fallback
      try {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cached) {
          setFormData(JSON.parse(cached));
        }
      } catch {
        // use defaults
      }
      setLoading(false);
    };

    loadState();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveStateToBackend = async (dataToSave) => {
    setLoading(true);
    setStatusMessage(null);

    // Always update local cache for instant UI feedback
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // ignore
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('convocation_state')
          .upsert({
            id: 'current',
            ...dataToSave,
            updated_at: new Date().toISOString(),
          });

        if (error) {
          throw error;
        }

        setStatusMessage({
          type: 'success',
          text: 'Changes saved to Supabase! The public website will update automatically.',
        });
      } catch (err) {
        setStatusMessage({
          type: 'error',
          text: `Supabase save failed: ${err.message || 'Unknown error'}. Saved locally in browser storage.`,
        });
      }
    } else {
      setStatusMessage({
        type: 'warning',
        text: 'Changes saved locally. Add Supabase environment variables in .env to broadcast live across all devices.',
      });
    }

    setLoading(false);
  };

  const handleQuickActivate = (targetMode) => {
    setConfirmModal({
      open: true,
      targetState: targetMode,
    });
  };

  const confirmQuickActivate = async () => {
    const updated = {
      ...formData,
      mode: confirmModal.targetState,
    };
    setFormData(updated);
    setConfirmModal({ open: false, targetState: null });
    await saveStateToBackend(updated);
  };

  const getEffectiveStateDisplay = () => {
    if (formData.mode === 'countdown') return { label: 'COUNTDOWN', color: 'bg-amber-100 text-amber-900 border-amber-300' };
    if (formData.mode === 'live') return { label: '🔴 LIVE NOW', color: 'bg-red-100 text-red-900 border-red-300 animate-pulse' };
    if (formData.mode === 'ended') return { label: 'CONVOCATION ENDED', color: 'bg-stone-200 text-stone-900 border-stone-300' };

    // Auto mode calculation
    const now = new Date().getTime();
    const start = new Date(formData.event_start).getTime();
    const end = new Date(formData.event_end).getTime();

    if (now < start) {
      return { label: 'AUTO: COUNTDOWN', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
    }
    if (now >= start && now < end) {
      return { label: 'AUTO: 🔴 LIVE NOW', color: 'bg-red-100 text-red-900 border-red-300 animate-pulse' };
    }
    return { label: 'AUTO: CONVOCATION ENDED', color: 'bg-stone-200 text-stone-900 border-stone-300' };
  };

  const activeDisplay = getEffectiveStateDisplay();

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-charcoal-900 font-body py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-050 border border-maroon-900/10 text-maroon-900 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-maroon-900" />
              <span>Admin Live Control</span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900">
              Convocation Live State Control
            </h1>
            <p className="text-charcoal-600 text-xs sm:text-sm mt-1">
              Direct remote administration panel for the 3-state Hero Convocation Card.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[0.6875rem] font-bold text-charcoal-500 uppercase tracking-wider">
              Current Public State
            </span>
            <div className={`mt-1 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-bold tracking-wide shadow-xs ${activeDisplay.color}`}>
              {activeDisplay.label}
            </div>
          </div>
        </div>

        {/* Status Message Notification */}
        {statusMessage && (
          <div
            className={`p-4 rounded-2xl border text-sm font-medium flex items-center justify-between gap-3 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : statusMessage.type === 'error'
                ? 'bg-red-50 text-red-900 border-red-200'
                : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-charcoal-500 hover:text-charcoal-900 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Quick Instant Activators */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-4">
          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-charcoal-900">
              Quick State Activation
            </h2>
            <p className="text-charcoal-600 text-xs sm:text-sm mt-0.5">
              Instantly flip the public website card to any state on demand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Countdown Button */}
            <button
              type="button"
              onClick={() => handleQuickActivate('countdown')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                formData.mode === 'countdown'
                  ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/30'
                  : 'bg-[#FAF8F5] border-[#E8E2D8] hover:border-amber-300 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-charcoal-900">COUNTDOWN</span>
                <Clock className="w-4 h-4 text-amber-700" />
              </div>
              <span className="text-[0.6875rem] text-charcoal-600">
                Show pre-event countdown clock
              </span>
              <span className="text-xs font-semibold text-amber-800">
                {formData.mode === 'countdown' ? '● Active Mode' : 'Activate →'}
              </span>
            </button>

            {/* Live Button */}
            <button
              type="button"
              onClick={() => handleQuickActivate('live')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                formData.mode === 'live'
                  ? 'bg-red-50 border-red-500 ring-2 ring-red-500/30'
                  : 'bg-[#FAF8F5] border-[#E8E2D8] hover:border-red-400 hover:bg-red-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-red-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  🔴 LIVE NOW
                </span>
                <Radio className="w-4 h-4 text-red-700" />
              </div>
              <span className="text-[0.6875rem] text-charcoal-600">
                Stream is live right now
              </span>
              <span className="text-xs font-semibold text-red-800">
                {formData.mode === 'live' ? '● Active Mode' : 'Activate →'}
              </span>
            </button>

            {/* Ended Button */}
            <button
              type="button"
              onClick={() => handleQuickActivate('ended')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                formData.mode === 'ended'
                  ? 'bg-stone-100 border-stone-400 ring-2 ring-stone-400/30'
                  : 'bg-[#FAF8F5] border-[#E8E2D8] hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-charcoal-900">CONCLUDED</span>
                <CheckCircle2 className="w-4 h-4 text-stone-700" />
              </div>
              <span className="text-[0.6875rem] text-charcoal-600">
                Ceremony finished / show recording
              </span>
              <span className="text-xs font-semibold text-stone-800">
                {formData.mode === 'ended' ? '● Active Mode' : 'Activate →'}
              </span>
            </button>
          </div>
        </div>

        {/* Detailed Configuration Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-6">
          <div className="border-b border-[#ECE6DC] pb-4">
            <h2 className="font-display font-bold text-lg sm:text-xl text-charcoal-900">
              Control Mode & URLs
            </h2>
            <p className="text-charcoal-600 text-xs sm:text-sm mt-0.5">
              Choose between automatic schedule-based switching and manual state override.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700">
              Operational Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.mode === 'auto'
                    ? 'bg-maroon-050/60 border-maroon-900/40 text-maroon-900 ring-1 ring-maroon-900/20'
                    : 'bg-[#FAF8F5] border-[#E8E2D8] text-charcoal-800 hover:bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="control_mode"
                  checked={formData.mode === 'auto'}
                  onChange={() => handleChange('mode', 'auto')}
                  className="mt-1 accent-maroon-900"
                />
                <div>
                  <span className="font-bold text-sm block">AUTO Mode</span>
                  <span className="text-xs text-charcoal-600 block mt-0.5 leading-relaxed">
                    Automatically triggers Countdown before start, Live during ceremony, and Ended after finish time.
                  </span>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.mode !== 'auto'
                    ? 'bg-maroon-050/60 border-maroon-900/40 text-maroon-900 ring-1 ring-maroon-900/20'
                    : 'bg-[#FAF8F5] border-[#E8E2D8] text-charcoal-800 hover:bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="control_mode"
                  checked={formData.mode !== 'auto'}
                  onChange={() => handleChange('mode', 'countdown')}
                  className="mt-1 accent-maroon-900"
                />
                <div>
                  <span className="font-bold text-sm block">MANUAL Mode</span>
                  <span className="text-xs text-charcoal-600 block mt-0.5 leading-relaxed">
                    Directly enforces the selected state regardless of current date or clock time.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Livestream URL */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700">
              YouTube Live Stream URL
            </label>
            <div className="relative">
              <input
                type="url"
                value={formData.live_url || ''}
                onChange={(e) => handleChange('live_url', e.target.value)}
                placeholder="https://youtube.com/live/..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] bg-[#FAF8F5] focus:bg-white text-sm font-mono text-charcoal-900 focus:outline-none focus:border-maroon-900"
              />
            </div>
            <p className="text-[0.6875rem] text-charcoal-500">
              Opened by the "▶ Watch Live" button on the 🔴 LIVE NOW card face.
            </p>
          </div>

          {/* Recording URL */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700">
              YouTube Recording / Past Stream URL
            </label>
            <div className="relative">
              <input
                type="url"
                value={formData.recording_url || ''}
                onChange={(e) => handleChange('recording_url', e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] bg-[#FAF8F5] focus:bg-white text-sm font-mono text-charcoal-900 focus:outline-none focus:border-maroon-900"
              />
            </div>
            <p className="text-[0.6875rem] text-charcoal-500">
              Opened by the "▶ Watch Past Stream" button on the CONVOCATION ENDED card face.
            </p>
          </div>

          {/* Start and End Times for Auto Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#ECE6DC]">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700">
                Ceremony Start (Local Time)
              </label>
              <input
                type="text"
                value={formData.event_start || ''}
                onChange={(e) => handleChange('event_start', e.target.value)}
                placeholder="2026-09-26T10:00:00+05:30"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] bg-[#FAF8F5] focus:bg-white text-sm font-mono text-charcoal-900 focus:outline-none focus:border-maroon-900"
              />
              <p className="text-[0.6875rem] text-charcoal-500">
                Default: 26 Sep 2026, 10:00 AM IST
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700">
                Ceremony End (Local Time)
              </label>
              <input
                type="text"
                value={formData.event_end || ''}
                onChange={(e) => handleChange('event_end', e.target.value)}
                placeholder="2026-09-26T14:30:00+05:30"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] bg-[#FAF8F5] focus:bg-white text-sm font-mono text-charcoal-900 focus:outline-none focus:border-maroon-900"
              />
              <p className="text-[0.6875rem] text-charcoal-500">
                Extendable if ceremony runs longer
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-maroon-900 transition-colors"
            >
              <span>View Public Homepage</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              disabled={loading}
              onClick={() => saveStateToBackend(formData)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-maroon-900 text-white font-body font-bold text-sm shadow-sm hover:bg-maroon-700 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-white" />
              <span>{loading ? 'Saving...' : 'Save Configuration'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E8E2D8] space-y-4">
            <div className="flex items-center gap-3 text-maroon-900">
              <div className="w-10 h-10 rounded-2xl bg-maroon-050 flex items-center justify-center border border-maroon-900/15">
                <Radio className="w-5 h-5 text-maroon-900" />
              </div>
              <h3 className="font-display font-bold text-xl text-charcoal-900">
                Confirm State Change
              </h3>
            </div>

            <p className="text-sm text-charcoal-600 leading-relaxed">
              Are you sure you want to immediately switch the public Convocation card state to{' '}
              <strong className="text-charcoal-900 font-bold uppercase">
                {confirmModal.targetState === 'live' ? '🔴 LIVE NOW' : confirmModal.targetState}
              </strong>
              ?
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ECE6DC]">
              <button
                type="button"
                onClick={() => setConfirmModal({ open: false, targetState: null })}
                className="px-5 py-2.5 rounded-xl border border-[#D9D0C5] text-charcoal-700 font-semibold text-sm hover:bg-[#FAF8F5] active:scale-[0.98] transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmQuickActivate}
                className="px-6 py-2.5 rounded-xl bg-maroon-900 text-white font-semibold text-sm hover:bg-maroon-700 active:scale-[0.98] transition-all shadow-sm"
              >
                Confirm Switch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminLiveControl;
