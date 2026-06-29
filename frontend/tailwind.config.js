/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        campus: "#2454d6",
        ink: "#182033",
        paper: "#f7f9fc",
        line: "#dde5ef",
        mint: "#087f5b",
        coral: "#c2410c"
      },
      boxShadow: {
        soft: "0 12px 32px rgba(24, 32, 51, 0.08)"
      }
    }
  },
  plugins: []
};
