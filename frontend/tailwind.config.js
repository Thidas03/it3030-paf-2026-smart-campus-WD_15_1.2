/**@type {import ('tailwind').config}**/
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#8b5cf6',
                'secondary': '#06b6d4',
                "dark-bg" : "#020617",
                "dark-card" : "#0f172a",
                "dark-border" : "#1e293b",
                "dark-text" : "#f8fafc",
                "dark-muted" : "#64748b",
        },
        boxShadow: {
            glow: '0 0 20px rgba(139, 92, 246, 0.25)',
        },
        backgroundImage: {
            "cyber-gradient": "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
      },
    },
  },
  plugins: [],
};