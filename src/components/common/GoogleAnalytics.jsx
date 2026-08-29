import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView } from '../../utils/analytics';

/**
 * GoogleAnalytics Component
 *
 * Automatically initializes GA4 on app mount and tracks SPA route changes
 * when location pathname or search params update.
 */
export function GoogleAnalytics() {
  const location = useLocation();
  const initialRenderRef = useRef(true);

  // Initialize GA4 once on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track page view on route/location change
  useEffect(() => {
    // Delay slightly to let SEO/document.title update on route transition
    const timer = setTimeout(() => {
      const currentPath = location.pathname + location.search;
      trackPageView(currentPath, document.title);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  return null;
}

export default GoogleAnalytics;
