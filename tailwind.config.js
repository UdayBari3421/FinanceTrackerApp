/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "own-uday": "var(--shadow)",
        glow: "0 0 10px 2px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
