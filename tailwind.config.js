js;
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        lalezar: ['var(--font-lalezar)']
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
};
