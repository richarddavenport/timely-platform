module.exports = {
  darkMode: 'class',
  extract: {
    include: ["./**/*.html", "./**/*.svelte"],
  },
  safelist: ["bg-primary-700", "dark:bg-gray-900", '-rotate-180', 'rotate-0'],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  experimental: {
    uniformColorPalette: true,
    extendedFontSizeScale: true,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e4ebf5",
          100: "#bbcee6",
          200: "#8eaed5",
          300: "#618dc4",
          400: "#3f74b8",
          500: "#1d5cab",
          600: "#1a54a4",
          700: "#154a9a",
          800: "#114191",
          900: "#0a3080",
        },
        secondary: {
          50: "#e0f3f2",
          100: "#b3e1df",
          200: "#80cdca",
          300: "#4db8b4",
          400: "#26a9a4",
          500: "#009a94",
          600: "#00928c",
          700: "#008881",
          800: "#007e77",
          900: "#006c65",
        },
        accent: {
          50: "#fffaed",
          100: "#fff4d1",
          200: "#ffecb3",
          300: "#ffe494",
          400: "#ffdf7d",
          500: "#ffd966",
          600: "#ffd55e",
          700: "#ffcf53",
          800: "#ffca49",
          900: "#ffc038",
        },
      },
      height: {
        "2xs": "16rem",
        "3xs": "12rem",
      },
    },
  },
  plugins: [
    require("windicss/plugin/forms"),
    require("windicss/plugin/typography"),
  ],
};
