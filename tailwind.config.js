/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        olive: {
          50:  '#f6f7ee',
          100: '#eaedd4',
          200: '#d4dcac',
          300: '#b8c57d',
          400: '#9bae54',
          500: '#7d9239',
          600: '#62742b',
          700: '#4c5a23',
          800: '#3d481e',
          900: '#353e1d',
        },
        cream: '#FAF7F0',
        gold:  '#C9A84C',
      },
      fontFamily: {
        sans:  ['Inter', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
