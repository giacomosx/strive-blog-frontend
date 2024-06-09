/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'retro': '0.25rem 0.25rem #000',
      }
    },
  },
  plugins: [],
}

