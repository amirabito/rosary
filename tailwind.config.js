/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf2f4',
          100: '#fce3e8',
          200: '#f9ccd6',
          300: '#f3a3b6',
          400: '#e96f8d',
          500: '#d8426a',
          600: '#b92952',
          700: '#9a1e44',
          800: '#7f1c3c',
          900: '#6c1b37',
          950: '#3c0b1a',
        },
      },
    },
  },
  plugins: [],
}
