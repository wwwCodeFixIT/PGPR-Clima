import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pgpr: {
          navy: {
            50: '#edf1f8', 100: '#d0daf0', 200: '#a8bce5', 300: '#7d9cd7',
            400: '#587ec9', 500: '#3864bb', 600: '#2a54a8', 700: '#1e3c7a',
            800: '#152b5c', 900: '#0c1a3d', 950: '#070e22',
          },
          graphite: {
            50: '#f0f2f5', 100: '#d9dde6', 200: '#b8bfcd', 300: '#96a0b3',
            400: '#78849a', 500: '#5c6b80', 600: '#485565', 700: '#35404d',
            800: '#232c38', 900: '#141b24', 950: '#0a1019',
          },
          blue: {
            50: '#e6f0ff', 100: '#bfd5ff', 200: '#94b8ff', 300: '#6699ff',
            400: '#3d7bff', 500: '#1a5eff', 600: '#0044e0', 700: '#0033b8',
            800: '#002290', 900: '#00116e',
          },
          ice: {
            50: '#f0f7ff', 100: '#ddeeff', 200: '#b8dcff', 300: '#87c3ff',
            400: '#54a5ff', 500: '#2888f7', 600: '#1469d6', 700: '#0d4eac',
            800: '#0a3885', 900: '#07245e',
          },
          cyan: {
            50: '#e0fafb', 100: '#b3f3f6', 200: '#7eeaee', 300: '#44dfe6',
            400: '#18d3db', 500: '#06b6d4', 600: '#0891ab', 700: '#076882',
            800: '#054f64', 900: '#033447',
          },
        },
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        card:        { DEFAULT: 'hsl(var(--card))',       foreground: 'hsl(var(--card-foreground))' },
        popover:     { DEFAULT: 'hsl(var(--popover))',    foreground: 'hsl(var(--popover-foreground))' },
        primary:     { DEFAULT: 'hsl(var(--primary))',    foreground: 'hsl(var(--primary-foreground))' },
        secondary:   { DEFAULT: 'hsl(var(--secondary))',  foreground: 'hsl(var(--secondary-foreground))' },
        muted:       { DEFAULT: 'hsl(var(--muted))',      foreground: 'hsl(var(--muted-foreground))' },
        accent:      { DEFAULT: 'hsl(var(--accent))',     foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))',foreground: 'hsl(var(--destructive-foreground))' },
        success:     { DEFAULT: 'hsl(var(--success))',    foreground: 'hsl(var(--success-foreground))' },
        warning:     { DEFAULT: 'hsl(var(--warning))',    foreground: 'hsl(var(--warning-foreground))' },
        border:  'hsl(var(--border))',
        input:   'hsl(var(--input))',
        ring:    'hsl(var(--ring))',
        sidebar: {
          DEFAULT:              'hsl(var(--sidebar-bg))',
          foreground:           'hsl(var(--sidebar-fg))',
          primary:              'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-fg))',
          accent:               'hsl(var(--sidebar-accent))',
          'accent-foreground':  'hsl(var(--sidebar-accent-fg))',
          border:               'hsl(var(--sidebar-border))',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Menlo', 'Monaco', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        xs:    ['0.75rem',  { lineHeight: '1rem' }],
        sm:    ['0.875rem', { lineHeight: '1.25rem' }],
        base:  ['1rem',     { lineHeight: '1.5rem' }],
        lg:    ['1.125rem', { lineHeight: '1.75rem' }],
        xl:    ['1.25rem',  { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem',   { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem',  { lineHeight: '2.5rem' }],
      },
      spacing: {
        sidebar:         '15rem',
        'sidebar-icon':  '3.5rem',
        topbar:          '3.5rem',
        'mobile-bottom': '4rem',
      },
      borderRadius: {
        none: '0', xs: '0.125rem', sm: '0.25rem', DEFAULT: '0.375rem',
        md: '0.5rem', lg: '0.75rem', xl: '1rem', '2xl': '1.5rem', full: '9999px',
      },
      boxShadow: {
        soft:     '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 1px -1px rgb(0 0 0 / 0.04)',
        DEFAULT:  '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
        medium:   '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
        floating: '0 8px 16px -4px rgb(0 0 0 / 0.1), 0 4px 8px -4px rgb(0 0 0 / 0.08)',
        card:     '0 0 0 1px hsl(var(--border)), 0 1px 3px 0 rgb(0 0 0 / 0.05)',
        'card-hover': '0 0 0 1px hsl(var(--border)), 0 4px 12px 0 rgb(0 0 0 / 0.08)',
      },
      transitionDuration: { fast: '100ms', DEFAULT: '150ms', normal: '200ms', slow: '300ms' },
      transitionTimingFunction: {
        standard:   'cubic-bezier(0.2, 0, 0, 1)',
        emphasized: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
        decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
        accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
      },
      screens: {
        xs: '390px', sm: '640px', md: '768px', lg: '1024px',
        xl: '1280px', '2xl': '1440px', '3xl': '1920px',
      },
      zIndex: {
        dropdown: '1000', sticky: '1020', fixed: '1030',
        overlay: '1200', modal: '1300', toast: '1400', tooltip: '1500',
      },
      keyframes: {
        'skeleton-shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        'sync-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
        'slide-down-fade': {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up-fade': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'skeleton-shimmer': 'skeleton-shimmer 1.6s ease-in-out infinite',
        'sync-pulse':       'sync-pulse 1.8s ease-in-out infinite',
        'slide-down-fade':  'slide-down-fade 150ms cubic-bezier(0.2, 0, 0, 1)',
        'slide-up-fade':    'slide-up-fade 150ms cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
