/**
 * Telemetry and Metrics Tracker (GA4)
 *
 * Designed to be completely resilient against ad-blockers and browser shields.
 * If blocked by the client, it fails silently without disrupting the application.
 */

export const GA_MEASUREMENT_ID =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_GA_MEASUREMENT_ID) ||
  '';

let isInitialized = false;

/**
 * Initializes Google Analytics (gtag.js)
 */
export function initTelemetry() {
  try {
    if (typeof window === 'undefined') return;

    const measurementId = GA_MEASUREMENT_ID ? GA_MEASUREMENT_ID.trim() : '';
    if (!measurementId || isInitialized || document.getElementById('gtag-script')) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false,
    });

    const script = document.createElement('script');
    script.id = 'gtag-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

    // Handle adblocker blocking gracefully
    script.onerror = () => {
      // Adblocker blocked tracking script — ignore silently
    };

    document.head.appendChild(script);
    isInitialized = true;
  } catch (err) {
    // Fail silently
  }
}

/**
 * Tracks route / page view changes
 */
export function trackPageView(path, title) {
  try {
    if (typeof window === 'undefined') return;
    const measurementId = GA_MEASUREMENT_ID ? GA_MEASUREMENT_ID.trim() : '';
    if (!measurementId || typeof window.gtag !== 'function') return;

    const currentPath = path || window.location.pathname + window.location.search;
    const currentTitle = title || document.title;

    window.gtag('event', 'page_view', {
      page_path: currentPath,
      page_location: window.location.href,
      page_title: currentTitle,
      send_to: measurementId,
    });
  } catch (err) {
    // Fail silently
  }
}

/**
 * Tracks custom user interactions
 */
export function trackCustomEvent(eventName, eventParams = {}) {
  try {
    if (typeof window === 'undefined' || !eventName) return;
    const measurementId = GA_MEASUREMENT_ID ? GA_MEASUREMENT_ID.trim() : '';
    if (!measurementId || typeof window.gtag !== 'function') return;

    window.gtag('event', eventName, eventParams);
  } catch (err) {
    // Fail silently
  }
}
