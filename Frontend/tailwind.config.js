/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        secondary: "#06131d",
        dimWhite: "rgba(255, 255, 255, 0.5)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        'eternity' : 'url("./src/assets/eternity.jpg")',
        'fade' : 'url("./src/assets/fade.jpg")',
        'orbitals' : 'url("./src/assets/orbitals.jpg")',
        'portal' : 'url("./src/assets/portal.jpg")'
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
  mode: 'jit',
};
