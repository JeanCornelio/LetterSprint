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
    },
  },
  plugins: [],
}

