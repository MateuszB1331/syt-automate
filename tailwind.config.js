/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:    '#f5f0e8',
        'cream-t':'#fdf9f3',
        'cream-d':'#d4ccba',
        navy:     '#1e1432',
        'navy-d': '#0d0a1a',
        'navy-t': '#f0eef6',
        violet:   '#6d3fd1',
        'violet-d':'#4a28a0',
        'violet-t':'#f0ecfa',
        'violet-l':'#c9aaff',
        amber:    '#c97b3a',
        'amber-d':'#9a5a22',
        'amber-t':'#faf2eb',
        green:    '#4a7c59',
        'green-d':'#2e5238',
        'green-t':'#edf2ee',
      },
      fontFamily: {
        sans:   ['Inter', 'system-ui', 'sans-serif'],
        serif:  ['"Instrument Serif"', 'Georgia', 'serif'],
        hand:   ['Caveat', 'cursive'],
      },
      letterSpacing: {
        tight:  '-0.03em',
        tighter:'-0.04em',
        label:  '0.1em',
      },
      lineHeight: {
        tight:  '1.1',
        snug:   '1.25',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(.22,1,.36,1)',
      },
    },
  },
  plugins: [],
}
