/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic Naming Convention
        primary: '#ee764e',      // Was brand-orange
        background: '#0f172a',   // Was brand-dark
        surface: '#1e293b',      // Was brand-card
        muted: '#94a3b8',        // Was brand-text
        foreground: '#f8fafc',   // Was brand-white
        border: '#334155',       // Was brand-border
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}