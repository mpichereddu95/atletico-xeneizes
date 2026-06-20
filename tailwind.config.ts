import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./data/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        axBlack: "#111111",
        axGold: "#D4AF37",
        axWhite: "#FFFFFF"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Montserrat", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        gold: "0 18px 60px rgba(212, 175, 55, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
