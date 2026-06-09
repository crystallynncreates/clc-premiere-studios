/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        jade: {
          50:  "#f0fdf6",
          100: "#dcfcec",
          200: "#bbf7d9",
          300: "#86efb8",
          400: "#4ade8e",
          500: "#00A86B",
          600: "#008A55",
          700: "#006B40",
          800: "#004D2D",
          900: "#002E1A",
          950: "#001A0F",
        },
        cream: "#FFF8F0",
        blush: "#FFE4E6",
      },
      fontFamily: {
        script: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
