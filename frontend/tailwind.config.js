/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navyy: "#181E4B",
        purplee: "#5E6282",
        orangee: "#F1A501",
        blackbluee: "#14183E",
        pinkk: "#DF6951",
        greenn: "#006380",
        lightbluee: "#747DEF",
        darkbluee: "#5E3BE1",
        lightpinkk: "#FF946D",
        darkpinkk: "#FF946D",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      openSans: ["Open Sans", "sans-serif"],
      volkhov: ["Volkhov", "serif"],
    },
  },
  plugins: [],
};
