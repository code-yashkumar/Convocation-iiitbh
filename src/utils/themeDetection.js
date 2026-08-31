/**
 * Dark Reader Hero & Event Bar Isolation Engine
 * 
 * Strict Dual-Layer Specification:
 * 1. MAIN HERO AREA: Protected 100% from Dark Reader.
 *    - Photograph, cream background, headings, subtitle, date/venue, buttons, and countdown remain original light.
 *    - Top transparent navbar remains in authentic dark text over the light hero.
 * 2. EVENT INFORMATION BAR: Custom intentional dark design when Dark Reader is enabled.
 *    - Background: Dark Maroon (#380B13)
 *    - Text / Values: Pure White (#FFFFFF)
 *    - Labels: Warm Off-White / Gold (#E8D5B5)
 *    - Icons: Light Rose Accent (#F87171)
 *    - In Light mode: White bar with dark text and maroon icons.
 * 3. EVERYTHING BELOW HERO: Normal Dark Reader transformation enabled.
 */

const HERO_DARKREADER_CSS = `
/* ==========================================================================
   1. MAIN HERO AREA & TOP NAVBAR: 100% LIGHT-MODE PROTECTION
   ========================================================================== */

#main-hero-area,
#main-hero-area *,
#hero-section .hero-bg-layer,
#hero-section .countdown-card,
#hero-section .countdown-card *,
header[data-navbar-hero="true"],
header[data-navbar-hero="true"] * {
  --darkreader-inline-color: inherit !important;
  --darkreader-inline-bgcolor: transparent !important;
  --darkreader-inline-bgimage: none !important;
  --darkreader-inline-border-top: initial !important;
  --darkreader-inline-border-right: initial !important;
  --darkreader-inline-border-bottom: initial !important;
  --darkreader-inline-border-left: initial !important;
  color-scheme: light !important;
}

/* Base Hero Section Background */
html body #hero-section,
html[data-darkreader-scheme] body #hero-section,
html[data-darkreader-mode] body #hero-section,
html.dark-reader-active body #hero-section {
  background-color: #FBF9F5 !important;
}

/* Photographic Background Layer - Strictly Desktop (lg+) only, Completely Removed on Mobile */
html body #hero-section .hero-bg-layer,
html[data-darkreader-scheme] body #hero-section .hero-bg-layer,
html[data-darkreader-mode] body #hero-section .hero-bg-layer,
html.dark-reader-active body #hero-section .hero-bg-layer {
  display: none !important;
}

@media (min-width: 1024px) {
  html body #hero-section .hero-bg-layer,
  html[data-darkreader-scheme] body #hero-section .hero-bg-layer,
  html[data-darkreader-mode] body #hero-section .hero-bg-layer,
  html.dark-reader-active body #hero-section .hero-bg-layer {
    display: block !important;
    background-image: url('/assets/convocation-hero-bg.png') !important;
    background-color: transparent !important;
    background-repeat: no-repeat !important;
    background-position: right top !important;
    background-size: contain !important;
    filter: none !important;
    opacity: 1 !important;
    visibility: visible !important;
  }
}

/* Hero Typography: "CONVOCATION 2026" */
html body #main-hero-area .hero-title-main,
html body #main-hero-area h1 span.hero-title-main,
html[data-darkreader-scheme] body #main-hero-area .hero-title-main,
html[data-darkreader-scheme] body #main-hero-area h1 span.hero-title-main,
html[data-darkreader-mode] body #main-hero-area .hero-title-main,
html.dark-reader-active body #main-hero-area .hero-title-main {
  color: #1A1A1A !important;
  -webkit-text-fill-color: #1A1A1A !important;
}

html body #main-hero-area .hero-title-maroon,
html body #main-hero-area h1 span.hero-title-maroon,
html[data-darkreader-scheme] body #main-hero-area .hero-title-maroon,
html[data-darkreader-scheme] body #main-hero-area h1 span.hero-title-maroon,
html[data-darkreader-mode] body #main-hero-area .hero-title-maroon,
html.dark-reader-active body #main-hero-area .hero-title-maroon {
  color: #5E101C !important;
  -webkit-text-fill-color: #5E101C !important;
}

/* Hero Subtitle Statement */
html body #main-hero-area .hero-subtitle,
html body #main-hero-area .hero-subtitle span,
html body #main-hero-area p.hero-subtitle,
html body #main-hero-area p.hero-subtitle span,
html[data-darkreader-scheme] body #main-hero-area .hero-subtitle,
html[data-darkreader-scheme] body #main-hero-area .hero-subtitle span,
html[data-darkreader-mode] body #main-hero-area .hero-subtitle,
html.dark-reader-active body #main-hero-area .hero-subtitle {
  color: #404040 !important;
  -webkit-text-fill-color: #404040 !important;
}

/* Event Quick Info Meta (Date + Venue) inside Main Hero */
html body #main-hero-area .hero-meta-title,
html body #main-hero-area .hero-meta-title span,
html[data-darkreader-scheme] body #main-hero-area .hero-meta-title,
html[data-darkreader-mode] body #main-hero-area .hero-meta-title,
html.dark-reader-active body #main-hero-area .hero-meta-title {
  color: #1A1A1A !important;
  -webkit-text-fill-color: #1A1A1A !important;
}

html body #main-hero-area .hero-meta-sub,
html body #main-hero-area .hero-meta-sub span,
html[data-darkreader-scheme] body #main-hero-area .hero-meta-sub,
html[data-darkreader-mode] body #main-hero-area .hero-meta-sub,
html.dark-reader-active body #main-hero-area .hero-meta-sub {
  color: #525252 !important;
  -webkit-text-fill-color: #525252 !important;
}

html body #main-hero-area .hero-icon-maroon,
html[data-darkreader-scheme] body #main-hero-area .hero-icon-maroon,
html[data-darkreader-mode] body #main-hero-area .hero-icon-maroon,
html.dark-reader-active body #main-hero-area .hero-icon-maroon {
  color: #5E101C !important;
  stroke: #5E101C !important;
}

html body #main-hero-area .hero-icon-maroon *,
html[data-darkreader-scheme] body #main-hero-area .hero-icon-maroon *,
html.dark-reader-active body #main-hero-area .hero-icon-maroon * {
  stroke: #5E101C !important;
}

html body #main-hero-area .hero-icon-maroon circle,
html[data-darkreader-scheme] body #main-hero-area .hero-icon-maroon circle,
html.dark-reader-active body #main-hero-area .hero-icon-maroon circle {
  fill: #5E101C !important;
  stroke: none !important;
}

/* Action Buttons */
html body #main-hero-area .hero-btn-primary,
html[data-darkreader-scheme] body #main-hero-area .hero-btn-primary,
html[data-darkreader-mode] body #main-hero-area .hero-btn-primary,
html.dark-reader-active body #main-hero-area .hero-btn-primary {
  background-color: #5E101C !important;
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  border-color: transparent !important;
}

html body #main-hero-area .hero-btn-secondary,
html[data-darkreader-scheme] body #main-hero-area .hero-btn-secondary,
html[data-darkreader-mode] body #main-hero-area .hero-btn-secondary,
html.dark-reader-active body #main-hero-area .hero-btn-secondary {
  background-color: #FBF9F6 !important;
  color: #5E101C !important;
  -webkit-text-fill-color: #5E101C !important;
  border-color: #5E101C !important;
}

html body #main-hero-area .hero-btn-secondary *,
html[data-darkreader-scheme] body #main-hero-area .hero-btn-secondary *,
html.dark-reader-active body #main-hero-area .hero-btn-secondary * {
  color: #5E101C !important;
  -webkit-text-fill-color: #5E101C !important;
  stroke: #5E101C !important;
}

/* Countdown Card */
html body #hero-section .countdown-card,
html[data-darkreader-scheme] body #hero-section .countdown-card,
html[data-darkreader-mode] body #hero-section .countdown-card,
html.dark-reader-active body #hero-section .countdown-card {
  background-color: #540D17 !important;
  color: #FFFFFF !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 12px 32px rgba(84, 13, 23, 0.3) !important;
}

html body #hero-section .countdown-card *,
html[data-darkreader-scheme] body #hero-section .countdown-card *,
html.dark-reader-active body #hero-section .countdown-card * {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

/* Top Transparent Navbar (when resting over Hero) */
html body header[data-navbar-hero="true"],
html[data-darkreader-scheme] body header[data-navbar-hero="true"],
html[data-darkreader-mode] body header[data-navbar-hero="true"],
html.dark-reader-active body header[data-navbar-hero="true"] {
  background-color: transparent !important;
  color-scheme: light !important;
}

html body header[data-navbar-hero="true"] .navbar-title,
html body header[data-navbar-hero="true"] .navbar-title span,
html[data-darkreader-scheme] body header[data-navbar-hero="true"] .navbar-title,
html[data-darkreader-scheme] body header[data-navbar-hero="true"] .navbar-title span,
html[data-darkreader-mode] body header[data-navbar-hero="true"] .navbar-title,
html.dark-reader-active body header[data-navbar-hero="true"] .navbar-title {
  color: #1A1A1A !important;
  -webkit-text-fill-color: #1A1A1A !important;
}

html body header[data-navbar-hero="true"] .navbar-subtext,
html body header[data-navbar-hero="true"] .navbar-subtext span,
html[data-darkreader-scheme] body header[data-navbar-hero="true"] .navbar-subtext,
html[data-darkreader-scheme] body header[data-navbar-hero="true"] .navbar-subtext span,
html[data-darkreader-mode] body header[data-navbar-hero="true"] .navbar-subtext,
html.dark-reader-active body header[data-navbar-hero="true"] .navbar-subtext {
  color: #525252 !important;
  -webkit-text-fill-color: #525252 !important;
}

html body header[data-navbar-hero="true"] .navbar-link,
html body header[data-navbar-hero="true"] .navbar-link span,
html body header[data-navbar-hero="true"] a.navbar-link,
html body header[data-navbar-hero="true"] a.navbar-link span,
html[data-darkreader-scheme] body header[data-navbar-hero="true"] .navbar-link,
html[data-darkreader-scheme] body header[data-navbar-hero="true"] .navbar-link span,
html[data-darkreader-scheme] body header[data-navbar-hero="true"] a.navbar-link,
html[data-darkreader-scheme] body header[data-navbar-hero="true"] a.navbar-link span,
html[data-darkreader-mode] body header[data-navbar-hero="true"] .navbar-link,
html.dark-reader-active body header[data-navbar-hero="true"] .navbar-link {
  color: rgba(26, 26, 26, 0.8) !important;
  -webkit-text-fill-color: rgba(26, 26, 26, 0.8) !important;
}

html body header[data-navbar-hero="true"] .navbar-link.active,
html body header[data-navbar-hero="true"] .navbar-link.active span,
html body header[data-navbar-hero="true"] a.navbar-link.active,
html body header[data-navbar-hero="true"] a.navbar-link.active span,
html[data-darkreader-scheme] body header[data-navbar-hero="true"] .navbar-link.active,
html[data-darkreader-scheme] body header[data-navbar-hero="true"] .navbar-link.active span,
html[data-darkreader-mode] body header[data-navbar-hero="true"] .navbar-link.active,
html.dark-reader-active body header[data-navbar-hero="true"] .navbar-link.active {
  color: #5E101C !important;
  -webkit-text-fill-color: #5E101C !important;
}

html body header[data-navbar-hero="true"] .navbar-btn-cta,
html[data-darkreader-scheme] body header[data-navbar-hero="true"] .navbar-btn-cta,
html[data-darkreader-mode] body header[data-navbar-hero="true"] .navbar-btn-cta,
html.dark-reader-active body header[data-navbar-hero="true"] .navbar-btn-cta {
  background-color: #5E101C !important;
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

html body header[data-navbar-hero="true"] .navbar-hamburger-btn svg,
html[data-darkreader-scheme] body header[data-navbar-hero="true"] .navbar-hamburger-btn svg,
html[data-darkreader-mode] body header[data-navbar-hero="true"] .navbar-hamburger-btn svg,
html.dark-reader-active body header[data-navbar-hero="true"] .navbar-hamburger-btn svg {
  color: #5E101C !important;
  stroke: #5E101C !important;
}

/* ==========================================================================
   2. EVENT INFORMATION BAR: CUSTOM INTENTIONAL DARK DESIGN UNDER DARK READER
   ========================================================================== */

html[data-darkreader-active="true"] body .event-info-bar,
html[data-darkreader-scheme="dark"] body .event-info-bar,
html[data-darkreader-mode] body .event-info-bar,
html.dark-reader-active body .event-info-bar {
  background-color: #380B13 !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45) !important;
}

html[data-darkreader-active="true"] body .event-info-bar .info-bar-label,
html[data-darkreader-scheme="dark"] body .event-info-bar .info-bar-label,
html[data-darkreader-mode] body .event-info-bar .info-bar-label,
html.dark-reader-active body .event-info-bar .info-bar-label {
  color: #E8D5B5 !important;
  -webkit-text-fill-color: #E8D5B5 !important;
}

html[data-darkreader-active="true"] body .event-info-bar .info-bar-value,
html[data-darkreader-scheme="dark"] body .event-info-bar .info-bar-value,
html[data-darkreader-mode] body .event-info-bar .info-bar-value,
html.dark-reader-active body .event-info-bar .info-bar-value {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

html[data-darkreader-active="true"] body .event-info-bar .info-bar-icon,
html[data-darkreader-scheme="dark"] body .event-info-bar .info-bar-icon,
html[data-darkreader-mode] body .event-info-bar .info-bar-icon,
html.dark-reader-active body .event-info-bar .info-bar-icon {
  color: #F87171 !important;
}

html[data-darkreader-active="true"] body .event-info-bar svg,
html[data-darkreader-scheme="dark"] body .event-info-bar svg,
html[data-darkreader-mode] body .event-info-bar svg,
html.dark-reader-active body .event-info-bar svg {
  color: #F87171 !important;
  stroke: #F87171 !important;
}

html[data-darkreader-active="true"] body .event-info-bar svg path,
html[data-darkreader-scheme="dark"] body .event-info-bar svg path,
html[data-darkreader-mode] body .event-info-bar svg path {
  fill: #F87171 !important;
}

html[data-darkreader-active="true"] body .event-info-bar .edition-dot,
html[data-darkreader-scheme="dark"] body .event-info-bar .edition-dot,
html[data-darkreader-mode] body .event-info-bar .edition-dot {
  fill: #FBBF24 !important;
}
`;

export function initDarkReaderHeroProtection() {
  if (typeof document === 'undefined') return;

  const checkDarkReaderActive = () => {
    const isDarkReader =
      Boolean(document.querySelector('meta[name="darkreader"]')) ||
      Boolean(document.querySelector('style.darkreader')) ||
      Boolean(document.querySelector('style[class*="darkreader"]')) ||
      document.documentElement.hasAttribute('data-darkreader-mode') ||
      document.documentElement.hasAttribute('data-darkreader-scheme') ||
      document.documentElement.getAttribute('data-darkreader-scheme') === 'dark';

    if (isDarkReader) {
      document.documentElement.setAttribute('data-darkreader-active', 'true');
      document.documentElement.classList.add('dark-reader-active');
    } else {
      document.documentElement.removeAttribute('data-darkreader-active');
      document.documentElement.classList.remove('dark-reader-active');
    }
  };

  const cleanProtectedElements = () => {
    const targets = document.querySelectorAll(
      '#main-hero-area, #main-hero-area *, header[data-navbar-hero="true"], header[data-navbar-hero="true"] *'
    );
    targets.forEach((el) => {
      const attrs = el.getAttributeNames();
      for (const attr of attrs) {
        if (attr.startsWith('data-darkreader-inline-')) {
          el.removeAttribute(attr);
        }
      }
    });
  };

  const ensureStyleTag = () => {
    checkDarkReaderActive();
    cleanProtectedElements();

    let styleTag = document.getElementById('hero-darkreader-controller');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'hero-darkreader-controller';
      styleTag.setAttribute('data-darkreader-ignore', 'true');
      styleTag.textContent = HERO_DARKREADER_CSS;
      document.head.appendChild(styleTag);
    } else {
      if (!styleTag.hasAttribute('data-darkreader-ignore')) {
        styleTag.setAttribute('data-darkreader-ignore', 'true');
      }
      if (document.head.lastElementChild !== styleTag) {
        document.head.appendChild(styleTag);
      }
    }
  };

  ensureStyleTag();

  const headObserver = new MutationObserver(() => {
    ensureStyleTag();
  });

  headObserver.observe(document.head, {
    childList: true,
    subtree: true,
    attributes: true,
  });

  const docObserver = new MutationObserver(() => {
    checkDarkReaderActive();
    cleanProtectedElements();
  });

  docObserver.observe(document.body || document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-darkreader-inline-color', 'data-darkreader-inline-bgcolor', 'style'],
  });

  const interval = setInterval(ensureStyleTag, 800);

  return () => {
    headObserver.disconnect();
    docObserver.disconnect();
    clearInterval(interval);
  };
}
