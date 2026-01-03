/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#7df9ff",
        dark: "#0b0f1a",
      },
    },
  },
  plugins: [],
}
