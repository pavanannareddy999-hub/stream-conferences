/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E1512",
        "ink-raised": "#161F1B",
        paper: "#ECF0EA",
        "paper-raised": "#E1E8DF",
        flow: "#1FCBB2",
        "flow-deep": "#0C8B79",
        amber: "#FFB238",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
