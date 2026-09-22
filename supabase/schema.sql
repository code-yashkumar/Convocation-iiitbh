-- ==============================================================================
-- Convocation Live State Control Table
-- Execute this script in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ==============================================================================

-- 1. Create table for convocation state
CREATE TABLE IF NOT EXISTS public.convocation_state (
  id TEXT PRIMARY KEY DEFAULT 'current',
  mode TEXT NOT NULL DEFAULT 'auto' CHECK (mode IN ('auto', 'countdown', 'live', 'ended')),
  live_url TEXT DEFAULT 'https://youtube.com/live/placeholder',
  recording_url TEXT DEFAULT 'https://youtube.com/watch?v=placeholder',
  event_start TIMESTAMPTZ DEFAULT '2026-09-26T10:00:00+05:30',
  event_end TIMESTAMPTZ DEFAULT '2026-09-26T14:30:00+05:30',
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Insert initial singleton record if missing
INSERT INTO public.convocation_state (id, mode, live_url, recording_url, event_start, event_end)
VALUES (
  'current',
  'auto',
  'https://youtube.com/live/placeholder',
  'https://youtube.com/watch?v=placeholder',
  '2026-09-26T10:00:00+05:30',
  '2026-09-26T14:30:00+05:30'
)
ON CONFLICT (id) DO NOTHING;

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.convocation_state ENABLE ROW LEVEL SECURITY;

-- 4. Policies: Allow read and update access so the direct-access admin panel can manage it
DROP POLICY IF EXISTS "Public can view convocation state" ON public.convocation_state;
CREATE POLICY "Public can view convocation state"
  ON public.convocation_state FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Direct admin can update convocation state" ON public.convocation_state;
CREATE POLICY "Direct admin can update convocation state"
  ON public.convocation_state FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- 5. Enable Supabase Realtime broadcast for instant updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.convocation_state;
