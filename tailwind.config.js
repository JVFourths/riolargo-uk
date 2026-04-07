/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Breede River Valley palette
        mountain: {
          DEFAULT: '#1A2317',
          900: '#1A2317',
          950: '#0C0F0A',
        },
        limestone: {
          DEFAULT: '#F7F3EE',
          50:  '#F7F3EE',
          100: '#F2EDE3',
          200: '#EDE5D8',
          300: '#E2D8C5',
        },
        fynbos: {
          DEFAULT: '#C9A84C',
          400: '#D4B860',
          500: '#C9A84C',
          600: '#B5933A',
          700: '#9A7C2C',
        },
        sage: {
          DEFAULT: '#6B7B5A',
          400: '#8A9A78',
          500: '#6B7B5A',
          600: '#586647',
          700: '#4D5A40',
          800: '#3A4530',
        },
        clay: {
          DEFAULT: '#B5683A',
          500: '#B5683A',
          600: '#9A5530',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      fontSize: {
        // editorial scale
        'eyebrow':  ['12px', { lineHeight: '16px', letterSpacing: '0.12em', fontWeight: '500' }],
        'display':  ['clamp(44px, 7vw, 72px)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h1':       ['clamp(36px, 5.5vw, 56px)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2':       ['clamp(28px, 3.5vw, 40px)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'h3':       ['clamp(22px, 2.4vw, 28px)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        eyebrow: '0.12em',
      },
      maxWidth: {
        'container': '1200px',
        'prose':     '65ch',
      },
      borderRadius: {
        // editorial = sharp; max 2px
        'sharp': '2px',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
