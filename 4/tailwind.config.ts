import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))"
      },
      borderRadius: {
        sm: "0.5rem",
        md: "0.75rem",
        lg: "0.875rem",
        xl: "1rem"
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(15, 23, 42, 0.04)",
        card: "0 6px 24px rgba(15, 23, 42, 0.06)",
        panel: "0 8px 30px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
