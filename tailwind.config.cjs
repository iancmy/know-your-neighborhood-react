const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        kyn: {
          primary: "#253964",
          secondary: "#4F6BB7",
          accent: "#CCD4B0",
          "accent-focus": "#7ED397",
          neutral: "#F5F5F5",
          "base-100": "#FFFFFF",
        },
      },
    ],
  },
});
