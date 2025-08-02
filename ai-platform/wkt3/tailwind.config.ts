import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        theme1: "#0ea5e9",
        theme2: "#22c55e",
        theme3: "#f97316",
        theme4: "#a855f7",
      },
    },
  },
  plugins: [],
};

export default config;
