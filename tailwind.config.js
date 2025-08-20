/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4B2B',
        secondary: '#FF416C'
      },
      keyframes: {
        show: {
          '0%, 49.99%': { opacity: '0', zIndex: '1' },
          '50%, 100%': { opacity: '1', zIndex: '5' },
        },
      },
      animation: {
        show: 'show 0.6s ease-in forwards',
      },
    },
  },
  plugins: [],
}
