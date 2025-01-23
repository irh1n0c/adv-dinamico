/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Remove Deloise from the default 'sans' font family
        'sans': ['Montserrat', ...defaultTheme.fontFamily.sans],
        'Poppins': ['Poppins', 'sans-serif'],
        'Ubuntu': ['Ubuntu', 'sans-serif'],
        'Montserrat': ['Montserrat', 'sans-serif'],
        'Deloise': ['Deloise', 'sans-serif'], // Keep this if you want to use Deloise specifically
      },
    },
  },
  plugins: [],
}