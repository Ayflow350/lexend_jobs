module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "0",
      },
    },
    fontFamily: {
      primary: "Rubik",
    },
    extend: {
      colors: {
        black: "#000000",
        white: "#FFFF",
        green: "#12715B",
      },

      backgroundImage: {
        hero: "url('/Hero.svg')",
        newsletterBox: "url('/src/assets/img/newsletter-box.png')",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
    },
  },
  plugins: [],
};
