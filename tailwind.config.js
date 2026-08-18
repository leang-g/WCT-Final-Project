/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#06080C',
          900: '#0B0F17',
          850: '#0F1522',
          800: '#141C2B',
          700: '#1C263A',
          600: '#283652',
          500: '#3B4D72',
        },
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
        neon: {
          emerald: '#00F59B',
          lime: '#22C55E',
          cyan: '#06B6D4',
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
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.2)',
        'card': '0 10px 30px -4px rgba(0, 0, 0, 0.5), 0 4px 10px -2px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 20px 40px -6px rgba(0, 245, 155, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.4)',
        'card-dark': '0 12px 36px -4px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.07)',
        'card-dark-hover': '0 20px 50px -6px rgba(0, 245, 155, 0.18), 0 0 0 1px rgba(0, 245, 155, 0.35)',
        'neon-glow': '0 0 25px rgba(0, 245, 155, 0.35)',
        'brass-glow': '0 0 25px rgba(197, 154, 69, 0.35)',
        'cyan-glow': '0 0 25px rgba(6, 182, 212, 0.35)',
      }
    },
  },
  plugins: [],
}
