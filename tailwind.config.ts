import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "rgb(var(--main-color) / <alpha-value>)",
        mainColorLight: "rgb(var(--main-color-light) / <alpha-value>)",
        mainColorDark: "rgb(var(--main-color-dark) / <alpha-value>)",

        // bg colors
        bgColor: "rgb(var(--bg-color) / <alpha-value>)",
        bgColorLight: "rgb(var(--bg-color-light) / <alpha-value>)",
        bgColorLighter: "rgb(var(--bg-color-lighter) / <alpha-value>)",

        // theme based color (for text)
        themeColor: "rgb(var(--theme-color) / <alpha-value>)",
        themeColorLight: "rgb(var(--theme-color-light) / <alpha-value>)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
