// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Add any other paths where you use Tailwind classes
  ],
  theme: {
    container: {
      // Your existing container settings
      center: true, // Often useful for containers
      padding: {
        DEFAULT: "1rem",
        sm: "2rem", // Optional: more specific padding for sm
        lg: "0", // As per your original
      },
    },
    fontFamily: {
      // Your existing font family
      primary: "Rubik", // Ensure 'Rubik' font is imported/linked via @font-face or a <link> tag
      // sans: ['var(--font-sans)', ...fontFamily.sans], // Example if using next/font for sans-serif
    },
    extend: {
      colors: {
        // Your Custom Colors
        black: "#000000",
        white: "#FFFFFF",
        green: "#12715B", // YOUR BRAND GREEN
        "blue-hover": "#2563eb", // Example blue for hover, adjust or remove

        // shadcn/ui theme colors linked to CSS Variables
        // These allow you to use classes like bg-primary, text-secondary-foreground, etc.
        border: "hsl(var(--border))",
        input: "hsl(var(--input))", // Often the same as border for consistency
        ring: "hsl(var(--ring))", // Will be your brand green for focus rings

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))", // Your brand green from CSS variables
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          // If you use charts and have variables for them
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        // Your existing background images
        hero: "url('/Hero.svg')",
        newsletterBox: "url('/Hero-login.svg')",
      },
      borderRadius: {
        // Your existing border radius setup linking to CSS variable
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // Required by tailwindcss-animate (often added by shadcn/ui init)
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        // Required by tailwindcss-animate
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    screens: {
      // Your existing screen breakpoints
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
