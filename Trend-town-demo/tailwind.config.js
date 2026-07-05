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
          neutral: {
            50: '#fafafa',
            100: '#f4f4f5',
            200: '#e4e4e7',
            300: '#d4d4d8',
            400: '#a1a1aa',
            500: '#71717a',
            600: '#52525b',
            700: '#3f3f46',
            800: '#27272a',
            900: '#18181b',
            950: '#09090b',
          },
          accent: {
            DEFAULT: '#d97706', // Premium Mustard / Amber-600
            light: '#f59e0b',   // Amber-500
            dark: '#b45309',    // Amber-700
            hover: '#c2410c',   // Orange-700 for high-contrast hovers
            bg: '#fef3c7',      // Amber-100
          }
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      letterSpacing: {
        widest: '.2em',
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
        'premium-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
