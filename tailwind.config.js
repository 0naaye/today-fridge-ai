/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#FEFBF7',
          100: '#F5F0E8',
          200: '#EBE2D8',
          300: '#E1D4C8',
          400: '#D4C4B0',
          500: '#C9B8A0',
          600: '#B8A490',
          700: '#A69480',
          800: '#8B7D6B',
          900: '#6B6258',
        },
        warm: {
          50: '#FDF8F3',
          100: '#F9F1E8',
          200: '#F0E1CC',
          300: '#E8D5B7',
          400: '#DBC099',
          500: '#CEA876',
          600: '#C19560',
          700: '#B07E4A',
          800: '#9B6F3E',
          900: '#7D5A30',
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        receipt: ['Courier New', 'Courier', 'monospace'],
      },
      animation: {
        'cook-bounce': 'cookBounce 1.5s infinite',
        'cook-spin': 'cookSpin 2s linear infinite',
      },
      keyframes: {
        cookBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        cookSpin: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
