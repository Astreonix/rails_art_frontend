/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0b4a56',
          dark: '#083840',
          light: '#14687a',
        },
        cream: {
          DEFAULT: '#eceee8',
          dark: '#e2e5de',
        },
        ink: '#1f2933',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
