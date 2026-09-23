import React, { useEffect, useState } from 'react';

/**
 * Pixel-Perfect Native Browser "This site can’t be reached" Screen
 * Matches Image 1 (Chromium / Brave / Edge native neterror screen):
 * - Document title: domain name
 * - Chromium Sad Document Icon (folded corner + sad face)
 * - Heading: "This site can’t be reached"
 * - Subtext: "{hostname}’s DNS address could not be found. Diagnosing the problem."
 * - Error code: "DNS_PROBE_POSSIBLE"
 * - Native "Reload" button with window.location.reload()
 * - Full Dark Mode / Light Mode support matching the browser
 */
export function BrowserDefault404() {
  const hostname =
    typeof window !== 'undefined' ? window.location.hostname : 'convocation.iiitbh.ac.in';

  // Detect browser dark mode preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // default to dark mode matching user's browser in screenshots
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set document title to exact hostname as native browser does
    const originalTitle = document.title;
    document.title = hostname;

    // Listen for dark mode changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);

    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    }

    return () => {
      document.title = originalTitle;
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      }
    };
  }, [hostname]);

  const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  // Color tokens matching native Chromium neterror in light / dark mode
  const theme = isDarkMode
    ? {
        bg: '#202124',
        heading: '#e8eaed',
        text: '#9aa0a6',
        icon: '#9aa0a6',
        buttonBg: '#a8c7fa',
        buttonText: '#062e6f',
      }
    : {
        bg: '#ffffff',
        heading: '#202124',
        text: '#5f6368',
        icon: '#5f6368',
        buttonBg: '#1a73e8',
        buttonText: '#ffffff',
      };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.bg,
        color: theme.text,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        fontSize: '14px',
        lineHeight: '1.5',
        margin: 0,
        padding: 0,
        zIndex: 9999999,
        overflow: 'auto',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          width: '100%',
          marginTop: '16vh',
          padding: '0 24px',
          boxSizing: 'border-box',
          textAlign: 'left',
        }}
      >
        {/* Chromium Sad Page Icon (folded top-right corner, 2 square eyes, sad mouth) */}
        <div style={{ marginBottom: '28px' }}>
          <svg
            viewBox="0 0 48 48"
            width="44"
            height="44"
            style={{ fill: theme.icon, display: 'block' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 4C9.79086 4 8 5.79086 8 8V40C8 42.2091 9.79086 44 12 44H36C38.2091 44 40 42.2091 40 40V16L28 4H12ZM26 6.82843L37.1716 18H28C26.8954 18 26 17.1046 26 16V6.82843ZM12 7C11.4477 7 11 7.44772 11 8V40C11 40.5523 11.4477 41 12 41H36C36.5523 41 37 40.5523 37 40V21H27C24.7909 21 23 19.2091 23 17V7H12ZM16 23H20V27H16V23ZM32 23H28V27H32V23ZM18 36C18 32.6863 20.6863 30 24 30C27.3137 30 30 32.6863 30 36H27C27 34.3431 25.6569 33 24 33C22.3431 33 21 34.3431 21 36H18Z"
            />
          </svg>
        </div>

        {/* Heading: Exactly matching Image 1 */}
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 500,
            lineHeight: 1.3,
            color: theme.heading,
            margin: '0 0 16px 0',
            letterSpacing: '-0.01em',
          }}
        >
          This site can’t be reached
        </h1>

        {/* Subtext: Domain DNS could not be found */}
        <p
          style={{
            fontSize: '14px',
            color: theme.text,
            margin: '0 0 14px 0',
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: theme.heading, fontWeight: 600 }}>{hostname}</strong>’s DNS
          address could not be found. Diagnosing the problem.
        </p>

        {/* Error Code: DNS_PROBE_POSSIBLE */}
        <div
          style={{
            marginTop: '22px',
            marginBottom: '32px',
            fontSize: '11px',
            color: theme.text,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          DNS_PROBE_POSSIBLE
        </div>

        {/* Native Pill Reload Button */}
        <div>
          <button
            type="button"
            onClick={handleReload}
            style={{
              backgroundColor: theme.buttonBg,
              color: theme.buttonText,
              border: 'none',
              borderRadius: '100px',
              padding: '8px 24px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  );
}

export default BrowserDefault404;
