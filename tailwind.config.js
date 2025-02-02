/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFD6E0',
          blue: '#C1E3FF',
          green: '#C1FFD7',
          yellow: '#FFF5C1',
          purple: '#E5C1FF',
          background: '#F8F9FF'
        }
      }
    },
  },
  plugins: [],
};