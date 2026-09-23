import React, { useState } from 'react';
import { useSiteAvailability } from '../../hooks/useSiteAvailability';
import {
  AlertOctagon,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Radio,
  ExternalLink,
  Power,
  RotateCcw,
  X,
  Lock,
} from 'lucide-react';

export function AdminEmergencyControl() {
  const { isSiteDown, loading, lastUpdated, toggleSiteDown } = useSiteAvailability();
  const [confirmModal, setConfirmModal] = useState({ open: false, targetDown: false });
  const [statusMessage, setStatusMessage] = useState(null);

  const handleActionClick = (targetDownState) => {
    setConfirmModal({
      open: true,
      targetDown: targetDownState,
    });
  };

  const executeAction = async () => {
    const targetState = confirmModal.targetDown;
    setConfirmModal({ open: false, targetDown: false });

    try {
      await toggleSiteDown(targetState);
      setStatusMessage({
        type: targetState ? 'error' : 'success',
        text: targetState
          ? '🔴 Kill switch activated! The entire website is now down. Visitors will see a browser default 404 error.'
          : '🟢 Website successfully restored! All public pages are now online and accessible.',
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: `Failed to update site availability: ${err.message || 'Unknown error'}.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-charcoal-900 font-body py-10 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Top Secret Badge & Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-900 text-xs font-semibold uppercase tracking-wider mb-2">
              <Lock className="w-3.5 h-3.5 text-red-700" />
              <span>Master Emergency Control</span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900">
              Website Kill Switch
            </h1>
            <p className="text-charcoal-600 text-xs sm:text-sm mt-1">
              Direct emergency shutdown switch to immediately take down or restore the entire public website.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[0.6875rem] font-bold text-charcoal-500 uppercase tracking-wider">
              Current Live Status
            </span>
            <div
              className={`mt-1.5 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-bold tracking-wide shadow-xs flex items-center gap-2 ${
                isSiteDown
                  ? 'bg-red-100 text-red-900 border-red-300 animate-pulse'
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300'
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isSiteDown ? 'bg-red-600' : 'bg-emerald-600'
                }`}
              />
              <span>{isSiteDown ? 'SITE TAKEN DOWN' : 'SITE ONLINE'}</span>
            </div>
          </div>
        </div>

        {/* Status Message Notification */}
        {statusMessage && (
          <div
            className={`p-4 rounded-2xl border text-sm font-medium flex items-center justify-between gap-3 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : 'bg-red-50 text-red-900 border-red-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              ) : (
                <AlertOctagon className="w-5 h-5 text-red-700 shrink-0" />
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

        {/* Master Control Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-6">
          <div className="border-b border-[#ECE6DC] pb-4">
            <h2 className="font-display font-bold text-lg sm:text-xl text-charcoal-900">
              Single-Button Master Shutdown
            </h2>
            <p className="text-charcoal-600 text-xs sm:text-sm mt-0.5">
              {isSiteDown
                ? 'The kill switch is currently ACTIVE. Visitors to any page see only a default browser 404.'
                : 'The website is currently OPERATIONAL and publicly accessible to all visitors.'}
            </p>
          </div>

          {/* Status Details Box */}
          {isSiteDown ? (
            <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200 text-red-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-red-900">
                <AlertOctagon className="w-4 h-4 text-red-700" />
                <span>Website is Taken Down Across All Devices</span>
              </div>
              <p className="text-xs text-red-800 leading-relaxed">
                All public routes (homepage, notices, gallery, schedule) and the live control dashboard are
                completely blocked. Browsers are displaying the native unstyled <em>"This page isn't working (HTTP ERROR 404)"</em> error screen.
              </p>
              <p className="text-[0.6875rem] text-red-700 font-semibold pt-1">
                Only this secret route (<code className="bg-red-100 px-1 py-0.5 rounded">/admin/live-control-blz1170</code>) remains accessible to restore the website.
              </p>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Normal Operations Active</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                The public portal is online. All visitors can browse pages and view the live convocation status card normally.
              </p>
            </div>
          )}

          {/* Action Trigger Button */}
          <div className="pt-2">
            {isSiteDown ? (
              <button
                type="button"
                disabled={loading}
                onClick={() => handleActionClick(false)}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-bold text-base shadow-sm flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-50"
              >
                <RotateCcw className="w-5 h-5 text-white" />
                <span>{loading ? 'Restoring Website...' : 'Restore Website (Bring Back Online)'}</span>
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={() => handleActionClick(true)}
                className="w-full py-4 px-6 rounded-2xl bg-red-700 hover:bg-red-800 active:scale-[0.99] text-white font-bold text-base shadow-sm flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-50"
              >
                <Power className="w-5 h-5 text-white" />
                <span>{loading ? 'Executing Shutdown...' : 'Turn Entire Website Down (Kill Switch)'}</span>
              </button>
            )}
          </div>

          {/* Navigation & Help Links */}
          <div className="pt-4 border-t border-[#ECE6DC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <a
              href="/admin/live-control"
              className="inline-flex items-center gap-1.5 text-maroon-900 font-semibold hover:underline"
            >
              <span>Go to Live State Control Panel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-charcoal-600 hover:text-charcoal-900 font-medium"
            >
              <span>View Public URL in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E8E2D8] space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
                  confirmModal.targetDown
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                {confirmModal.targetDown ? (
                  <AlertOctagon className="w-5 h-5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
              </div>
              <h3 className="font-display font-bold text-xl text-charcoal-900">
                {confirmModal.targetDown ? 'Confirm Site Shutdown' : 'Confirm Website Restoration'}
              </h3>
            </div>

            <p className="text-sm text-charcoal-600 leading-relaxed">
              {confirmModal.targetDown ? (
                <>
                  Are you sure you want to <strong>turn down the entire website</strong>? Visitors to all pages will immediately see a default browser <em>"This page isn't working"</em> 404 error.
                </>
              ) : (
                <>
                  Are you sure you want to <strong>restore the website</strong>? All public pages and live controls will immediately be brought back online for all visitors.
                </>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ECE6DC]">
              <button
                type="button"
                onClick={() => setConfirmModal({ open: false, targetDown: false })}
                className="px-5 py-2.5 rounded-xl border border-[#D9D0C5] text-charcoal-700 font-semibold text-sm hover:bg-[#FAF8F5] active:scale-[0.98] transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeAction}
                className={`px-6 py-2.5 rounded-xl text-white font-semibold text-sm active:scale-[0.98] transition-all shadow-sm ${
                  confirmModal.targetDown
                    ? 'bg-red-700 hover:bg-red-800'
                    : 'bg-emerald-700 hover:bg-emerald-800'
                }`}
              >
                {confirmModal.targetDown ? 'Yes, Turn Site Down' : 'Yes, Restore Site'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEmergencyControl;
