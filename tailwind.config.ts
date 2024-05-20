import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      flex: {
        2: '1 0 auto',
      },
      colors: {
        Rausch: {
          df: '#FF5A5F',
        },
        Babu: {
          df: '#00A699',
        },
        Arches: {
          df: '#FC642D',
        },
        Hof: {
          df: '#484848',
        },
        Foggy: {
          df: '#767676',
        },
      },
      boxShadow: {
        box: '0px 3px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config;
