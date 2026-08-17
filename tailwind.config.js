/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F4EFEA',
          300: '#EBE4DA',
          400: '#DDD4C7',
          500: '#CFC2B1',
        },
        stone: {
          850: '#23201E',
          950: '#141210',
        },
        brass: {
          50: '#FBF7EE',
          100: '#F5ECDA',
          200: '#EBD8B2',
          300: '#DEC085',
          400: '#D2AB5C',
          500: '#C59A45',
          600: '#B48432',
          700: '#956927',
          800: '#795423',
          900: '#644520',
        },
        timber: {
          light: '#EADBC8',
          DEFAULT: '#D4B896',
          dark: '#B89870',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(28, 25, 23, 0.05), 0 2px 6px -1px rgba(28, 25, 23, 0.03)',
        'card': '0 10px 30px -4px rgba(28, 25, 23, 0.06), 0 4px 10px -2px rgba(28, 25, 23, 0.03)',
        'card-hover': '0 20px 40px -6px rgba(197, 154, 69, 0.12), 0 8px 16px -4px rgba(28, 25, 23, 0.04)',
        'brass-glow': '0 0 25px rgba(197, 154, 69, 0.25)',
      }
    },
  },
  plugins: [],
}
