/**
 * Convocation Live & Countdown Configuration
 * 
 * TEST MODE CONTROLS:
 * - TEST_MODE: When true, runs a 10s countdown, pauses at 0, flips to LIVE for 15s, then flips to ENDED.
 *              When false, runs in normal production mode using Supabase or local schedule.
 * - TEST_COUNTDOWN_SECONDS: Visible countdown duration in seconds before reaching zero.
 * - TEST_LIVE_DURATION_SECONDS: Visible live state duration before flipping to ended state.
 */

export const TEST_MODE = true;
export const TEST_ROLL_DURATION_MS = 1500; // 1.5 seconds of high-speed rolling digits
export const TEST_ZERO_HOLD_MS = 500;      // 0.5s pause with all digits at 00 before card flip (total = 2.0 seconds)
export const TEST_LIVE_DURATION_SECONDS = 15;

/**
 * Production Default Schedule (26 September 2026)
 * Start: 10:00 AM IST
 * End:   02:30 PM IST (configurable in admin panel)
 */
export const DEFAULT_EVENT_START = '2026-09-26T10:00:00+05:30';
export const DEFAULT_EVENT_END = '2026-09-26T14:30:00+05:30';

/**
 * Stream Placeholders (Editable via Admin Panel)
 */
export const DEFAULT_LIVE_URL = 'https://youtube.com/live/placeholder';
export const DEFAULT_RECORDING_URL = 'https://youtube.com/watch?v=placeholder';
