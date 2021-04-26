module.exports = {
  purge: {
    content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.js', './src/**/*.postcss'],
    options: {
      safelist: [/bg-[a-z]{1,}-100$/]
    },
  },
  darkMode: false,
  theme: {
    extend: {
      colors: {
        steel: {
          '50': '#FDFBFD',
          '300': '#4C4C4C',
          '400': '#353537',
          '500': '#272727',
          '600': '#1F1F1F',
          '700': '#141414',
          '800': '#0D0D0D',
          '900': '#090909',
        }
      }
    }
  },
  variants: {
  },
  plugins: [],
}
