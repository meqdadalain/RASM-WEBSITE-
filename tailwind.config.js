/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#02040a',
          900: '#04060f',
          850: '#070b18',
          800: '#0a0f20',
          700: '#0f1628',
          600: '#162038',
        },
        cyan: {
          50: '#e6fbff',
          100: '#c4f4ff',
          200: '#8ee9ff',
          300: '#4dd8ff',
          400: '#1cc4ff',
          500: '#00a8e8',
          600: '#0086c0',
          700: '#006a99',
          800: '#00557a',
          900: '#003a54',
        },
        electric: '#19e3ff',
        signal: '#3b82f6',
        warn: '#ff9d3c',
        danger: '#ff4d5e',
        safe: '#3dffb0',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        ultra: '-0.06em',
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        'spin-rev': 'spin-rev 24s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'drift': 'drift 12s ease-in-out infinite',
        'scan': 'scan 4s ease-in-out infinite',
        'flicker': 'flicker 6s linear infinite',
      },
      keyframes: {
        'spin-rev': {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'drift': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'scan': {
          '0%, 100%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.4' },
          '94%': { opacity: '1' },
          '97%': { opacity: '0.7' },
          '98%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
