/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-blue": "#3294F8",
        "color-base-title": "#E7EDF4",
        "color-base-subtitle": "#C4D4E3",
        "color-base-text": "#AFC2D4",
        "color-base-span": "#7B96B2",
        "color-base-lable": "#3A536B",
        "color-base-border": "#1C2F41",
        "color-base-post": "#112131",
        "color-base-profile": "#0B1B2B",
        "color-base-background": "#071422",
        "color-base-input": "#040F1A",
      },
      fontFamily: {
        "font-nunito": "'Nunito'",
      },
    },
  },
  plugins: [],
};
