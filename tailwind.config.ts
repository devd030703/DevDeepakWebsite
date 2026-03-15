import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        electric: {
          100: "#dfe7ff",
          200: "#b9cbff",
          300: "#88a5ff",
          400: "#5f7eff",
          500: "#3563ff",
          600: "#234ce0",
          700: "#1734a1",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(95,126,255,0.18), 0 24px 80px rgba(9, 17, 42, 0.5)",
      },
      fontFamily: {
        body: ["var(--font-body)"],
        display: ["var(--font-display)"],
      },
    },
  },
  plugins: [],
};

export default config;

