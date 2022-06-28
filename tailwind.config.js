/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      main: {
        1: "#7369CC",
        2: "#877BF4",
        3: "#BAB4EF",
        4: "#DBD7FC",
        5: "#F5F4FF",
        6: "#F9F9FF",
        7: "#FBFBFD",
      },
      red: {
        1: "#F04848",
        2: "#FFDBDB",
        3: "#FFF2F2",
        4: "#FFF6F6",
      },
      text: {
        1: "#38354B",
        2: "#5C5A74",
        3: "#9594A5",
        4: "#CDCCD9",
      },
    },
  },
  plugins: [],
};
