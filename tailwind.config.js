const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
 
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        mulegreen: '#c8f7c5',
        darkmulegreen: '#16a085'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
