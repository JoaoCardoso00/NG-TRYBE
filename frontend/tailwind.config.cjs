/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-gray-100": "#e1e1e6",
        "brand-gray-400": "#7C7C8A",
        "brand-gray-800": "#202024",
      },
    },
  },
  plugins: [],
};
