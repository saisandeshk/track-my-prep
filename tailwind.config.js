/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        moss: {
          50: "#f3f7f2",
          100: "#e2ede0",
          200: "#c5d9c1",
          300: "#9cbd96",
          400: "#729c6b",
          500: "#527e4d",
          600: "#3f633b",
          700: "#344f32",
          800: "#2c402b",
          900: "#253624"
        },
        paper: "#f7f4ed",
        amber: "#c17932"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(28, 42, 32, 0.08)",
        card: "0 2px 10px rgba(28, 42, 32, 0.06)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Newsreader", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};
