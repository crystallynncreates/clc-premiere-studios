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
          500: "#00D485",
          600: "#00A86B",
          700: "#008A55",
          800: "#006B40",
          900: "#004D2D",
        },
        surface: {
          DEFAULT: "#13131E",
          1: "#13131E",
          2: "#1C1C2C",
          3: "#242436",
          border: "rgba(255,255,255,0.07)",
        },
        dark: {
          bg: "#0D0D14",
        },
        violet: {
          400: "#A78BFA",
          500: "#7C5CF6",
          600: "#6D48E5",
        },
      },
      fontFamily: {
        script: ["Dancing Script", "cursive"],
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "jade-gradient": "linear-gradient(135deg, #00D485 0%, #00A86B 100%)",
        "violet-gradient": "linear-gradient(135deg, #7C5CF6 0%, #9D6FF7 100%)",
        "hero-gradient": "linear-gradient(135deg, #0D0D14 0%, #131325 50%, #0D0D14 100%)",
      },
    },
  },
  plugins: [],
};
