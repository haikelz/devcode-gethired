/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#16ABF8",
        secondary: "#F4F4F4",
        danger: "#ED4C5C",
        black: "#111111",
      },
      colors: {
        gray: "#888888",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
