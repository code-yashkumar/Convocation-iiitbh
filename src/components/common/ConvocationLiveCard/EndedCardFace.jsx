import React from 'react';
import { Play } from 'lucide-react';

/**
 * State 3: CONVOCATION ENDED Face
 * Matches existing countdown dimensions, font tokens, borders, and institutional maroon styling.
 */
export function EndedCardFace({
  recordingUrl = '',
  className = '',
}) {
  const cleanRecordingUrl = (recordingUrl || '').replace(/#sitedown=[01]/g, '');
  const isUrlValid = Boolean(cleanRecordingUrl && !cleanRecordingUrl.includes('placeholder'));

  return (
    <div
      className={`bg-[#540D17] text-white rounded-[1.25rem] p-5 shadow-[0_0.75rem_2rem_rgba(84,13,23,0.3)] flex flex-col justify-between select-none border border-white/10 w-full h-full ${className}`}
      aria-label="Convocation Ceremony Concluded"
    >
      {/* Top Status Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/25 border border-white/15">
          <span className="w-2 h-2 rounded-full bg-gold-400" />
          <span className="text-white/90 font-body text-[0.6875rem] font-bold tracking-wider uppercase">
            CONCLUDED
          </span>
        </div>
        <span className="text-white/60 font-body text-[0.6875rem] font-medium">
          26 Sep 2026
        </span>
      </div>

      {/* Main Content Area */}
      <div className="my-2 text-left">
        <h3 className="font-frank font-bold text-2xl sm:text-[1.625rem] text-white tracking-tight leading-tight">
          Convocation Ended
          <span className="block text-gold-400 text-lg sm:text-xl font-medium mt-0.5">
            3rd Edition 2026
          </span>
        </h3>
        <p className="font-body text-white/85 text-xs sm:text-[0.8125rem] leading-snug mt-2">
          The ceremony has concluded. You can watch the full recording of the livestream.
        </p>
      </div>

      {/* Watch Past Stream CTA Button */}
      <div className="pt-3 border-t border-white/10">
        {isUrlValid ? (
          <a
            href={cleanRecordingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 min-h-[2.5rem] px-4 rounded-xl bg-white text-maroon-900 font-body font-bold text-xs sm:text-sm shadow-sm hover:bg-cream-050 active:scale-[0.98] transition-all cursor-pointer group"
          >
            <Play className="w-3.5 h-3.5 fill-maroon-900 text-maroon-900 group-hover:scale-110 transition-transform" />
            <span>Watch Past Stream</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="w-full inline-flex items-center justify-center gap-2 min-h-[2.5rem] px-4 rounded-xl bg-white/20 text-white/60 font-body font-semibold text-xs cursor-not-allowed"
          >
            <Play className="w-3.5 h-3.5 fill-white/40 text-white/40" />
            <span>Recording Uploading</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default EndedCardFace;
