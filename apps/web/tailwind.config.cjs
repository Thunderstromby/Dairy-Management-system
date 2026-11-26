/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        border: 'var(--color-border)',

        // Stitch Home visual tokens — ACR-003 port.
        'deep-forest': '#183F30',
        'pasture-green': '#397A58',
        'warm-ivory': '#F7F7F1',
        'harvest-gold': '#D5A64A',
        'deep-charcoal': '#25332C',
        'secondary-text': '#58675D',
        'muted-text': '#849087',
        'border-subtle': '#DCE3DA',
        'sage-mist': '#E9EFE5',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
        'serif-display': ['"DM Serif Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
