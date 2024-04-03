/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["futura-pt", "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        15: "repeat(15, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
