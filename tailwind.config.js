/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#120F1D",
        secondary: "#DE1EFD",
        "light-white": "#777E90",
        "transparent-color": "rgba(27, 28, 32, 0.6)",
        "transparent-deep": "rgba(35, 38, 47, 0.78)",
        "transparent-1": "rgba(217, 217, 217, 0.1)",
        "light-2": "#ECECEC",
        "light-3": "#E6E8EC",
        "light-4": "#FCFCFD",
        harsh: "#353945",
        "light-harsh": "#777E91",
        dark: "#141416",
        "dark-2": "#2F3941",
        "dark-3": "#212531",
        "light-secondary": "#8076fe",
        "deep-secondary": "#1C182D",
        "gray-600": "#68737D",
        "gray-300": "#D8DCDE",
        "neutrals-5": "#B1B5C4",
        "neutrals-6": "#343745",
        blue: "#9099FC",
      },
      fontFamily: {
        sans: ["Aeonik Pro", ...defaultTheme.fontFamily.sans],
        "aeonik-pro": "Aeonik Pro",
        "aeonik-pro-bold": "Aeonik Pro Bold",
        poppins: "Poppins",
        "poppins-semi-bold": "Poppins Semi Bold",
        "poppins-light": "Poppins Light",
        "poppins-bold": "Poppins Bold",
        "dm-sans": "DM Sans",
        "dm-sans-bold": "DM Sans Bold",
        "sf-pro-text": "SF Pro Text",
        "sf-pro-text-semi-bold": "SF Pro Text Semibold",
        "sf-pro-text-bold": "SF Pro Text Bold",
      },
      fontSize: {
        heading: "30px",
        "sub-heading": "23px",
        "semi-heading": "20px",
        lg: "17px",
        "caption-0.5": "10px",
        "caption-1": "12px",
        "caption-2": "13px",
        "caption-3": "15px",
      },
      backgroundImage: {
        "theme-bg": "url('/theme-bg.png')",
        // "transparent-color": "rgba(27, 28, 32, 0.6)",
        "secondary-gradient":
          "linear-gradient(98.88deg, #8C01FA 31%, #EB08A4 102.28%)",
      },
      lineHeight: {
        "leading-24": "24px",
      },
    },
  },
  plugins: [],
};
