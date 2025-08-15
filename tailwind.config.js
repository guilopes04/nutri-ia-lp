/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#10b981',
        brandAlt: '#0ea5e9',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

