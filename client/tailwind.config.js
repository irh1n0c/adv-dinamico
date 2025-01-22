/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme') // para aplicar funete custom en taildwind
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
          'Poppins': ['Poppins', 'sans-serif'], //aqui aplica
        },
        fontFamily: {
          'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
          'Ubuntu': ['Ubuntu', 'sans-serif'], //aqui aplica
        },
      },
      
    },
    plugins: [],
  }
