import React, { useEffect } from 'react';

/**
 * Authentic Browser-Default 404 Error Screen
 * Strictly unstyled and completely decoupled from website styling to replicate
 * native Chromium/Chrome/Brave "This page isn't working / No webpage found" screen.
 */
export function BrowserDefault404() {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'convocation.iiitbh.ac.in';
  const fullUrl = typeof window !== 'undefined' ? window.location.href : `https://${hostname}/`;

  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'This page isn’t working';

    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff',
        color: '#202124',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        fontSize: '14px',
        lineHeight: '1.5',
        margin: 0,
        padding: '0',
        zIndex: 999999,
        overflow: 'auto',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '12vh auto 0 auto',
          padding: '0 24px',
          boxSizing: 'border-box',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 500,
            lineHeight: 1.3,
            color: '#202124',
            margin: '0 0 16px 0',
          }}
        >
          This page isn’t working
        </h1>

        <p
          style={{
            fontSize: '14px',
            color: '#5f6368',
            margin: '0 0 12px 0',
            lineHeight: 1.6,
          }}
        >
          <strong>{hostname}</strong> can't find this page.
        </p>

        <p
          style={{
            fontSize: '14px',
            color: '#5f6368',
            margin: '0 0 24px 0',
            lineHeight: 1.6,
            wordBreak: 'break-all',
          }}
        >
          No webpage was found for the web address:{' '}
          <span style={{ color: '#202124', fontWeight: 500 }}>{fullUrl}</span>
        </p>

        <div
          style={{
            marginTop: '36px',
            paddingTop: '16px',
            fontSize: '12px',
            color: '#5f6368',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          HTTP ERROR 404
        </div>
      </div>
    </div>
  );
}

export default BrowserDefault404;
