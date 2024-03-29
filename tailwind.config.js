module.exports = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: { min: "300px", max: "500px" },
      laptop: "1024px",
      desktop: "1280px",
      lg: "1280px",
    },
    extend: {
      colors: {
        primary: "#00AFA6",
        secondary: "#01968E",
        background: "#136475",
        text: "#000000",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
