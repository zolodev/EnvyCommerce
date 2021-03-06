const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      // Build your palette here
      transparent: "transparent",
      current: "currentColor",
      gray: colors.neutral,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber,
      indigo: colors.indigo,
      cyan: colors.cyan,
      teal: colors.teal,
      pink: colors.pink,
      black: colors.black,
      white: colors.white,
      blueGray: colors.slate,
    },
  },
  variants: {
    extend: {
      textOpacity: ["dark"],
    },
  },
  plugins: [],
};
