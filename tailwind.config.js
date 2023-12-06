const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: ".8rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1190px",
      },
    },
    extend: {
      colors: {
        brand: {
          gray: {
            5: "#F9F9F9",
            10: "#F4F5FA",
            20: "#EDEEF3",
            30: "#D7DBE0",
            40: "#C6CAD2",
            50: "#9CA5AF",
            60: "#6A7381",
            70: "#4B5563",
            80: "#3E4856",
            90: "#2D3A43",
            100: "#2A3033",
            900: "#1A262D",
          },
          green: {
            10: "#ECFDF5",
            20: "#DAFBEC",
            40: "#C1F0DB",
            70: "#069D6E",
            80: "#0B7F5E",
            100: "#1E3E34",
          },
          blue: {
            70: "#1D5BD8",
            90: "#2D374E",
            120: "#202A41",
          },
          red: {
            10: "#FEF2F2",
            20: "#FEE2E2",
            70: "#EA1717",
            80: "#B91C1C",
            100: "#542D28",
          },
          orange: {
            70: "#EA580C",
          },
          dark: {
            bg: "#101520",
          },
        },

        // Old Code styles
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },

        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      spacing: {
        13: "52px",
      },
      maxWidth: {
        sidebar: "375px",
      },
      fontSize: {
        h1: ["2rem", "2.5rem"],
        smx: ["13px"],
        xxs: ["0.625rem", "1rem"],
      },
      boxShadow: {
        day: "0px 1px 4px -1px rgba(0, 0, 0, 0.12)",
        base: "0px 3px 15px 0px rgba(11, 50, 67, 0.05)",
        thumb: "0px 6px 13px 0px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
