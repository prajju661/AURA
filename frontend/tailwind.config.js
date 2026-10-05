/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          bg: "#F5F0E8",
          surface: "#FBF8F2",
          elevated: "#EFE8DC",
          terracotta: "#B85C38",
          terracottaHover: "#9E4C2C",
          brass: "#B08D57",
          textPrimary: "#292722",
          textSecondary: "#716B61",
          border: "#DDD4C7",
          muted: "#C9C0B3",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
        mono: ['IBM Plex Sans', 'JetBrains Mono', 'Menlo', 'monospace'],
      }
    },
  },
  plugins: [],
}
