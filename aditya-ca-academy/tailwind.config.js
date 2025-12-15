/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#ee764e',    // Solid Brand Color
          dark: '#0f172a',      // Slate 900 (Background)
          card: '#1e293b',      // Slate 800 (Card Bg)
          text: '#94a3b8',      // Slate 400 (Muted Text)
          white: '#f8fafc',     // Slate 50 (Main Text)
          border: '#334155',    // Slate 700 (Borders)
        }
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}