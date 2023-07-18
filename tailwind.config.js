/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}', './app.vue'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      marge: '900px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      purple: '#3f3cbb',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#ecebff',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca',
      black: '#000000',
      red: '#FF2626',
      blue: '#4726FF',
      'honeydew-purple': '#5E39F5',
      'honeydew-purple2': '#a192f2',
      'honeydew-green': '#5fb257',
      'honeydew-orange': '#FFF7E5',
      'honeydew-gray': '#F2F4F7',
      'honeydew-bg': '#f6f9fe',
      'honeydew-bg2': '#f9f9fa',
      'honeydew-bg3': '#f8f9fe',
      'honeydew-bg4': '#FBFBFE',
      'honeydew-bg5': '#FAF9FF',
      'honeydew-bg6': '#F7F9FE',
      'honeydew-bg7': '#EDEDED',
      'gray-1': '#A09DB1',
      'gray-2': '#E1E0E6',
      'gray-3': '#403E48',
      'gray-4': '#667085',
      'gray-5': '#6C6A7C',
    },
    extend: {
      fontFamily: {
        'cera-black': ['Cera Pro Black', 'sans-serif'],
        'cera-bold-italic': ['Cera Pro Bold Italic', 'sans-serif'],
        // Define more font families and weights for other fonts as needed
      },
      fontWeight: {
        100: 100,
        200: 200,
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800,
        900: 900,
      },
    },
  },
  plugins: [],
}
