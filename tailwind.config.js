/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF8EF',
          100: '#F6F0DF',
          200: '#EDDFAF',
          300: '#E4CE7F',
          400: '#DBBD4F',
          500: '#C6A84B', // Primary Brand Gold
          600: '#A38734',
          700: '#7A6427',
          800: '#52431A',
          900: '#2B230E',
          accent: '#E2CC85',
        },
        dark: {
          950: '#050505',
          900: '#0A0A0A', // Dark Canvas
          850: '#121212', // Surface Elevated
          800: '#1A1A1A', // Card Surface
          700: '#262626',
          600: '#333333',
        },
        janzeemRed: '#B91C1C', // Subdued Red Accent from Logo
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E2CC85 0%, #C6A84B 50%, #8B7632 100%)',
        'radial-glow': 'radial-gradient(circle at center, rgba(198, 168, 75, 0.12) 0%, transparent 70%)',
        'dark-glass': 'linear-gradient(180deg, rgba(26, 26, 26, 0.7) 0%, rgba(10, 10, 10, 0.85) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 35px rgba(198, 168, 75, 0.18)',
        'gold-glow-lg': '0 0 60px rgba(198, 168, 75, 0.25)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      }
    },
  },
  plugins: [],
}