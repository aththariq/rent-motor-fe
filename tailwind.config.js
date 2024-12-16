/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00B4D8",
          extra: "#CAF0F8",
          light: "#90E0EF", 
          dark: "#0077B6", 
        },
        secondary: "#03045E", 
        danger: "#EF4444", 
      },
    },
  },

  plugins: [],
};
