/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design Language Palette
        pure: '#FFFFFF',
        'neutral-warm': '#F5F4F1',
        'neutral-light': '#E4E4E1',
        'neutral-mid': '#6B6B68',
        charcoal: '#1C1C1C',
        'stone-accent': '#2C2C2A',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glass-sm': '0 4px 20px 0 rgba(0, 0, 0, 0.03)',
        'glass-md': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'glass-lg': '0 12px 40px 0 rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        'glass': '18px',
      }
    },
  },
  plugins: [],
}
