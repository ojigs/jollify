/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /(bg|text|border|decoration|from|via|accent)-(pop|rock|bubble)/,
      variants: ["hover", "focus", "active"],
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0d0d0d",
        secondary: { 100: "#1a1a1a", 200: "#262626" },
        pop: { DEFAULT: "#a631ff", 50: "#c77dff" },
        rock: { DEFAULT: "#0d9488", 50: "#11beae" },
        bubble: { DEFAULT: "#ed0eff", 50: "#ef2dff" },
      },
    },
  },
  plugins: [],
};
