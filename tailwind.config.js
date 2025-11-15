/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        animation: {
      fadeIn: "fadeIn 0.4s ease-out",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0, transform: "translateY(10px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
    },
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