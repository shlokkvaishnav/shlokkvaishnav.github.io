/**
 * Theme Configuration
 * Design tokens, colors, spacing, typography
 * Maps to Tailwind config values
 */

export const themeConfig = {
  // Color Palette
  colors: {
    // Primary brand colors
    primary: {
      DEFAULT: '#2563eb', // blue-600
      light: '#3b82f6',   // blue-500
      dark: '#1e40af',    // blue-700
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },

    // Accent colors
    accent: {
      DEFAULT: '#8b5cf6', // violet-500
      light: '#a78bfa',   // violet-400
      dark: '#7c3aed',    // violet-600
      hover: '#7c3aed'
    },

    // Neutral colors
    background: '#ffffff',
    surface: '#f9fafb',    // gray-50
    muted: '#e5e7eb',      // gray-200

    // Text colors
    text: {
      DEFAULT: '#111827',   // gray-900
      secondary: '#6b7280', // gray-500
      muted: '#9ca3af'      // gray-400
    },

    // Semantic colors
    success: '#10b981',     // green-500
    error: '#ef4444',       // red-500
    warning: '#f59e0b',     // amber-500
    info: '#3b82f6'         // blue-500
  },

  // Typography
  typography: {
    fonts: {
      display: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace']
    },

    fontSizes: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem'     // 72px
    },

    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },

    lineHeights: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    }
  },

  // Spacing System
  spacing: {
    xs: '0.5rem',      // 8px
    sm: '0.75rem',     // 12px
    base: '1rem',      // 16px
    md: '1.5rem',      // 24px
    lg: '2rem',        // 32px
    xl: '3rem',        // 48px
    '2xl': '4rem',     // 64px
    '3xl': '6rem',     // 96px
    '4xl': '8rem'      // 128px
  },

  // Border Radius
  radius: {
    none: '0',
    sm: '0.25rem',     // 4px
    base: '0.5rem',    // 8px
    md: '0.75rem',     // 12px
    lg: '1rem',        // 16px
    xl: '1.5rem',      // 24px
    '2xl': '2rem',     // 32px
    full: '9999px'
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
  },

  // Animation Durations
  animation: {
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
    slower: '700ms'
  },

  // Breakpoints (matches Tailwind defaults)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Z-Index Layers
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modal: 40,
    popover: 50,
    tooltip: 60
  }
} as const

export type ThemeConfig = typeof themeConfig
