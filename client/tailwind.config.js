/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d0d0d",
        secondary: { 100: "#1a1a1a", 200: "#262626" },
        accent: { DEFAULT: "#a631ff", 50: "#c77dff" },
      },
    },
  },
  plugins: [],
};
