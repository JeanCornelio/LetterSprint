/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sprint-home': '#222831',
        'sprint-config': '#1D222A',
        'sprint-blue':'#3194D1'
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

