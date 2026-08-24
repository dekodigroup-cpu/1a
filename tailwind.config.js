/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* One place to re-tune the whole site. Swap `navy` for the firm's
           exact brand blue and every section, scrim and gradient follows. */
        ink: '#050910',
        'navy-deep': '#061529',
        'navy-mid': '#081A31',
        navy: '#0B2545',
        slate: '#0F1B2E',
        plate: '#0A1526',
        brass: '#C6A15B',
        'brass-lit': '#D8B571',
        onbrass: '#07121F',
        bone: '#EAF0F7',
        ember: '#E88A72',
      },
    },
  },
  plugins: [],
}
