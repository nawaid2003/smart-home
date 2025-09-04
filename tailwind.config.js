/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#10b981",
        accent: "#fbbf24",
        "card-bg": "rgba(255, 255, 255, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        xl: "0 10px 20px rgba(0, 0, 0, 0.15)",
        "2xl": "0 15px 30px rgba(0, 0, 0, 0.1)",
      },
      transitionTimingFunction: {
        "out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
        "out-quad": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
