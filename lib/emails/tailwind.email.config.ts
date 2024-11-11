import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        foreground: "rgb(255, 255, 255)",
        background: {
          DEFAULT: "rgb(0, 0, 0)",
          start: "rgb(0, 0, 0)",
          end: "rgb(0, 0, 0)",
        },
        muted: "hsl(0, 1.51%, 39.02%)",
        "muted-foreground": "hsl(0, 0%, 73.08%)",
        popover: "hsl(33.26, 2.36%, 14.65%)",
        "popover-foreground": "hsl(0, 0%, 89.41%)",
        card: "hsl(0, 1.45%, 14.03%)",
        "card-foreground": "hsl(33, 0%, 100%)",
        border: "hsl(33, 11%, 93%)",
        input: "hsl(33.26, 41.82%, 56.86%)",
        primary: "hsl(33, 42%, 57%)",
        "primary-foreground": "hsl(0, 0%, 0%)",
        secondary: "hsl(3, 42%, 57%)",
        "secondary-foreground": "hsl(0, 0%, 0%)",
        accent: "hsl(33.26, 41.82%, 56.86%)",
        "accent-foreground": "hsl(0, 0%, 0%)",
        destructive: "hsl(11, 76.74%, 47.87%)",
        "destructive-foreground": "hsl(11, 87%, 94%)",
        ring: "hsl(30, 11.11%, 92.94%)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [],
}

export default config
