// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {}, // We can add custom colors here later
  },
  plugins: [
    require('@tailwindcss/forms'),      // Resets form styles for easy customization
    require('@tailwindcss/typography'), // Provides beautiful typography defaults
  ],
}