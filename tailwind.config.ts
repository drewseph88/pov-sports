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
        background: "#000000",
        foreground: "#FFFFFF",
        accent: "#0EA5E9",
        surface: "rgba(255, 255, 255, 0.05)",
        "surface-hover": "rgba(255, 255, 255, 0.08)",
        "text-muted": "rgba(255, 255, 255, 0.6)",
        "text-subtle": "rgba(255, 255, 255, 0.4)",
        border: "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "16px",
      },
      transitionDuration: {
        DEFAULT: "250ms",
        slow: "350ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-out",
      },
      minHeight: {
        touch: "48px",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};
export default config;
