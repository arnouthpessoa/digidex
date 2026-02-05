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
        // Background
        "bg-dark": "#0a0a0a",
        "bg-panel": "#1a1a2e",
        "bg-card": "#16213e",

        // Text
        "text-primary": "#e0e0e0",
        "text-secondary": "#a0a0a0",
        "text-accent": "#00ff88",

        // Accents
        "accent-green": "#00ff88",
        "accent-blue": "#00d4ff",
        "accent-purple": "#b388ff",
        "accent-orange": "#ff9800",
        "accent-red": "#ff5252",

        // Stage Colors
        "stage-baby": "#ffeb3b",
        "stage-rookie": "#4caf50",
        "stage-champion": "#2196f3",
        "stage-ultimate": "#9c27b0",
        "stage-special": "#ff5722",

        // UI
        "border-pixel": "#3a3a5c",
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "cursive"],
        retro: ["VT323", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 255, 136, 0.4)",
        "glow-blue": "0 0 20px rgba(0, 212, 255, 0.4)",
        "glow-purple": "0 0 20px rgba(179, 136, 255, 0.4)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 136, 0.4)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 255, 136, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
