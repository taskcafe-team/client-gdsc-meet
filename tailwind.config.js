/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        success: "#28a745",
        danger: "#dc3545",
        warning: "#ffc107",
        info: "#17a2b8",
        light: "#f8f9fa",
        dark: "#343a40",
        cltext: "#4A4A4A",
      },
      backgroundImage: {
        primary: "linear-gradient(109deg, #4367FF 1.57%, #913DFD 100%)",
        secondary:
          "linear-gradient(109deg, rgba(201, 201, 201, 0.80) 1.57%, rgba(196, 196, 196, 0.10) 100%)",
      },
    },
  },
  plugins: [],
};
