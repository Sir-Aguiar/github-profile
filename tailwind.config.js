/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#091114",
        "blue-marine": "#159A9C",
        "deep-blue": "#002333",
        "light-white": "#F7F7F7",
      },
      screens: {
        mobile: { max: "800px" },
        tablet: { min: "801px", max: "1200px" },
        desktop: { min: "1201px" },
      },
      width: {
        mobile: "328px",
        tablet: "770px",
        desktop: "1120px",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};

