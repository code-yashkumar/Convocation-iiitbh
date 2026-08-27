/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '375px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
    },
    extend: {
      colors: {
        /* Primitive Tokens */
        maroon: {
          900: 'var(--color-maroon-900)',
          700: 'var(--color-maroon-700)',
          '050': 'var(--color-maroon-050)',
        },
        cream: {
          100: 'var(--color-cream-100)',
          '050': 'var(--color-cream-050)',
        },
        charcoal: {
          900: 'var(--color-charcoal-900)',
          600: 'var(--color-charcoal-600)',
          300: 'var(--color-charcoal-300)',
        },
        gold: {
          500: 'var(--color-gold-500)',
        },
        border: {
          subtle: 'var(--color-border-subtle)',
          DEFAULT: 'var(--color-border-default)',
        },
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        'focus-ring': 'var(--color-focus-ring)',

        /* Semantic Tokens */
        'bg-page': 'var(--color-bg-page)',
        'bg-surface': 'var(--color-bg-surface)',
        'bg-surface-subtle': 'var(--color-bg-surface-subtle)',
        'bg-inverse': 'var(--color-bg-inverse)',

        'action-primary': 'var(--color-action-primary)',
        'action-primary-hover': 'var(--color-action-primary-hover)',
        'action-secondary': 'var(--color-action-secondary)',
        'action-secondary-hover': 'var(--color-action-secondary-hover)',

        'text-default': 'var(--color-text-default)',
        'text-muted': 'var(--color-text-muted)',
        'text-disabled': 'var(--color-text-disabled)',
        'text-on-primary': 'var(--color-text-on-primary)',

        'icon-default': 'var(--color-icon-default)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      spacing: {
        1: 'var(--space-1)',   /* 4px */
        2: 'var(--space-2)',   /* 8px */
        3: 'var(--space-3)',   /* 12px */
        4: 'var(--space-4)',   /* 16px */
        6: 'var(--space-6)',   /* 24px */
        8: 'var(--space-8)',   /* 32px */
        12: 'var(--space-12)', /* 48px */
        16: 'var(--space-16)', /* 64px */
        24: 'var(--space-24)', /* 96px */
      },
      borderRadius: {
        sm: 'var(--radius-sm)',     /* 8px */
        md: 'var(--radius-md)',     /* 12px */
        lg: 'var(--radius-lg)',     /* 24px */
        pill: 'var(--radius-pill)', /* 999px */
        full: 'var(--radius-pill)',
      },
      boxShadow: {
        card: 'var(--elevation-card)',
        feature: 'var(--elevation-feature)',
        modal: 'var(--elevation-modal)',
      },
      maxWidth: {
        container: 'var(--container-max-width)',
        modal: '560px',
      },
      transitionDuration: {
        button: 'var(--motion-button)',
        modal: 'var(--motion-modal)',
        nav: 'var(--motion-nav)',
      }
    },
  },
  plugins: [],
}
