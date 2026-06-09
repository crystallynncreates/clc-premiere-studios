/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        },
      },
      fontFamily: {
        script: ["Dancing Script", "cursive"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
