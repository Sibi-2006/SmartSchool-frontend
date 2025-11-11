/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#047857",   // Emerald Green
        secondary: "#10B981", // Mint Green
        accent: "#FCD34D",    // Soft Yellow
        dark: "#111827",      // Text color
        light: "#F9FAFB",     // Background
      },
    },
  },
  plugins: [],
}