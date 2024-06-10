import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        ...colors,
      }
    },
    colors: {
      darkBg: '#0D101B',
      btnPurple: 'rgba(107, 80, 255, 1)',
      skPurple: "rgba(129, 110, 205, 0.25)",
      muted: "rgb(152, 155, 167)",
      white: "white",
      lightBg: "#222530",
      shadcnMuted: "hsl(210, 40%, 96.1%)",
    },
    linearBorderGradients: {
      colors: ['#C063F9', '#8B7CFF'],
      directions: ['to top'],
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
