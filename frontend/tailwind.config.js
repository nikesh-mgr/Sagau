/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#10B981",

        dark: "#064E3B",

        background: "#F8FAFC",
      },

      boxShadow: {
        card: "0 10px 25px rgba(0,0,0,0.08)",
      },
    },
  },

  plugins: [],
};
