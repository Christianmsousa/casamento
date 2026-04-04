import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
    ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        /* Paleta alinhada ao manual dos padrinhos */
        cream: {
          DEFAULT: "#F7EFE8",
          50: "#FDF8F5",
          100: "#F2E8DF",
          200: "#EAD9CC",
          300: "#DECCBB",
        },
        charcoal: {
          DEFAULT: "#3d3030",
          400: "#6b5c5c",
          500: "#5a4a4a",
          600: "#4a3a3a",
          700: "#3d3030",
          800: "#2e2424",
        },
        navy: {
          DEFAULT: "#2a4a6e",
          600: "#2a4a6e",
          700: "#1e3a5f",
          800: "#152a47",
        },
        gold: {
          50:  '#FDF9F0',
          100: '#F8EFD8',
          200: '#F0DEB0',
          300: '#E5C880',
          400: '#D9B25A',
          500: '#C9A96E',
          600: '#B8943E',
          700: '#9A7B30',
          800: '#7A6026',
        },
        terracota: {
          50: "#FDF8F5",
          100: "#f0e0dc",
          200: "#e0c4bc",
          300: "#c99386",
          400: "#b07565",
          500: "#A65E4E",
          600: "#8e4f42",
          700: "#764036",
          800: "#5e332b",
          900: "#4c2a24",
          950: "#28150f",
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.4s ease-out',
        'slide-out': 'slide-out 0.4s ease-in',
      },
    },
  },
  plugins: [],
}
export default config

