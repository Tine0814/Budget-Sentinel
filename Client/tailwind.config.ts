import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      primary: "Playfair Display",
      body: "Work Sans",
      logo: "Proxima Nova",
      main: "Abyssinica SIL",
      subtitle: "Roboto Slab",
      ptSans: ["PT Sans", "sans-serif"],
      ptSansNarrow: ["PT Sans Narrow", "sans-serif"],
      Rajdhani: ["Rajdhani", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "3rem",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        // Light Mode Colors
        primary: "#ffffff",
        secondary: "#fdf9ff",
        gray: "#eff0f5",
        darkGray: "#969696",
        curveGray: "#202731",
        hoverBlue: "#00173F",
        curveBlue: "#3c31dd",
        sideBar: "#051e34",
        sideBarTab: "#122c44",
        sideBarTabHover: "#253d53",
        blue: "#1a73e8",
        darkBlue: "#0F2A71",
        mainBlue: "#102973",
        yellow: "#F4C501",
        paragraph: "#878e99",

        // Dark Mode Colors (Flattened)
        darkPrimary: "#0a0a0a",
        darkSecondary: "#1e1e1e",
        darkDarkGray: "#4f4f4f",
        darkCurveGray: "#101217",
        darkHoverBlue: "#1a237e",
        darkCurveBlue: "#282a36",
        darkSideBar: "#0f1c2a",
        darkSideBarTab: "#1b2b3a",
        darkSideBarTabHover: "#2a3d54",
        darkDarkBlue: "#0d1b4d",
        darkMainBlue: "#0d223b",
        darkYellow: "#F5BF00",
        darkParagraph: "#c1c1c1",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
        "7xl": "4.5rem",
        "8xl": "6rem",
        "9xl": "8rem",
      },
    },
  },
  plugins: [],
};

export default config;
