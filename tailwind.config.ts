import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        japanese: ["var(--font-zen-kaku-gothic-new)", "sans-serif"],
      },
      colors: {
        blue: {
          50: "#f0f5ff",
          100: "#e0eaff",
          200: "#c7d9ff",
          300: "#a4c1ff",
          400: "#81a4ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
    },
  },
  plugins: [],
}
export default config
