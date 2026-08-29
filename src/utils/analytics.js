/**
 * Google Analytics 4 (GA4) Native Integration Utility
 *
 * Provides non-blocking asynchronous script injection, route tracking,
 * and custom event dispatching with zero external dependencies.
 */

// Read Measurement ID from Vite environment variable
export const GA_MEASUREMENT_ID =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_GA_MEASUREMENT_ID) ||
  '';

let isGAInitialized = false;

/**
 * Initializes Google Analytics 4 (gtag.js)
 * Ensures single initialization and prevents duplicate script loading.
 */
export function initGA() {
  if (typeof window === 'undefined') return;

  const measurementId = GA_MEASUREMENT_ID ? GA_MEASUREMENT_ID.trim() : '';

  if (!measurementId) {
    if (import.meta.env.DEV) {
      console.info(
        '[GA4] No VITE_GA_MEASUREMENT_ID found in environment variables. Analytics is disabled.'
      );
    }
    return;
  }

  if (isGAInitialized || document.getElementById('ga4-tag-script')) {
    return;
  }

  // 1. Initialize dataLayer and gtag global function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());

  // Disable automatic pageview on config so we accurately track SPA client-side route changes
  window.gtag('config', measurementId, {
    send_page_view: false,
  });

  // 2. Inject the gtag.js script asynchronously
  const script = document.createElement('script');
  script.id = 'ga4-tag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  isGAInitialized = true;

  if (import.meta.env.DEV) {
    console.info(`[GA4] Initialized successfully with ID: ${measurementId}`);
  }
}

/**
 * Tracks a page view event in Google Analytics 4
 * @param {string} path - URL path (e.g. '/notices' or '/gallery')
 * @param {string} title - Document title
 */
export function trackPageView(path, title) {
  if (typeof window === 'undefined') return;

  const measurementId = GA_MEASUREMENT_ID ? GA_MEASUREMENT_ID.trim() : '';
  const currentPath = path || window.location.pathname + window.location.search;
  const currentTitle = title || document.title;

  if (import.meta.env.DEV) {
    console.log(`[GA4 Track PageView] -> Path: ${currentPath} | Title: "${currentTitle}"`);
  }

  if (!measurementId || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: currentPath,
    page_location: window.location.href,
    page_title: currentTitle,
    send_to: measurementId,
  });
}

/**
 * Tracks a custom event in Google Analytics 4
 * @param {string} eventName - Name of the event (e.g. 'download_notice', 'submit_registration')
 * @param {Object} eventParams - Optional custom parameters
 */
export function trackEvent(eventName, eventParams = {}) {
  if (typeof window === 'undefined' || !eventName) return;

  const measurementId = GA_MEASUREMENT_ID ? GA_MEASUREMENT_ID.trim() : '';

  if (import.meta.env.DEV) {
    console.log(`[GA4 Track Event] -> "${eventName}":`, eventParams);
  }

  if (!measurementId || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', eventName, eventParams);
}
