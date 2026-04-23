/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sprint-home': 'rgb(var(--sprint-home) / <alpha-value>)',
        'sprint-config': 'rgb(var(--sprint-config) / <alpha-value>)',
        'sprint-blue':'#3194D1',
        'sprint-foreground': 'rgb(var(--sprint-foreground) / <alpha-value>)',
        'sprint-muted': 'rgb(var(--sprint-muted) / <alpha-value>)',
        'sprint-border': 'rgb(var(--sprint-border) / <alpha-value>)',
        'sprint-input-border': 'rgb(var(--sprint-input-border) / <alpha-value>)',
        'sprint-ring': 'rgb(var(--sprint-ring) / <alpha-value>)',
        'sprint-surface-hover': 'rgb(var(--sprint-surface-hover) / <alpha-value>)',
        'sprint-switch-off': 'rgb(var(--sprint-switch-off) / <alpha-value>)',
        'sprint-elevated-border': 'rgb(var(--sprint-elevated-border) / <alpha-value>)',
        'sprint-overlay': 'rgb(var(--sprint-overlay) / <alpha-value>)'
      },
      keyframes: {
        'fade-in-bottom': {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },

        'fade-out-bottom': {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(20px)',
            opacity: '0',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        'fade-in-bottom': 'fade-in-bottom 3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        'fade-out-bottom': 'fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'fade-out': 'fade-out 0.3s ease-out both',
        'fade-in': 'fade-in 0.3s ease-out both',
      },
    },
  },
  plugins: [],
}
