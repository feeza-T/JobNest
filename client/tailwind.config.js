/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        lato : "'Lato', sans-serif",
      }
    },
  },
  plugins: [require('daisyui')],
}