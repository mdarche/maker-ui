// Palettes

const light = ["#c03456", "#4e34c0", "#2357be", "#be2323"]
const dark = ["#0cf", "#ffbbf6", "#95e4fd", "#f79a9a", "#bbffcb"]

const themeLight = Array.from(
  Array(2),
  () => light[Math.floor(Math.random() * light.length)]
)
const themeDark = Array.from(
  Array(2),
  () => dark[Math.floor(Math.random() * dark.length)]
)

export default {
  initialColorMode: "light",
  colors: {
    text: "#000",
    background: "#fff",
    primary: themeLight[0],
    secondary: themeLight[0],
    accent: themeLight[1],
    muted: "#f9f9f9",
    border: "#e6e6e6",
    bg_header: "#fff",
    bg_sidenav: "#fbfbfb",
    bg_footer: "#fff",
    modes: {
      dark: {
        text: "#fff",
        background: "#282c35",
        primary: themeDark[0],
        secondary: themeDark[0],
        accent: themeDark[1],
        muted: "#21262e",
        border: "#373f4a",
        bg_header: "#20232d",
        bg_sidenav: "#1c1e27",
        bg_tabbar: "#1c1e27",
        bg_footer: "#1c1e27",
      },
    },
  },
  // You can also merge Typography.js fonts into this theme object
  fonts: {
    body: "Merriweather, serif",
    heading: "Merriweather Sans, sans-serif",
    monospace: "Menlo, monospace",
  },
  shadows: {
    header: null,
    tabbar: null,
  },
  buttons: {
    pagination: {
      fontFamily: "heading",
      border: "2px solid",
      borderColor: "accent",
      color: "accent",
      display: "inline-flex",
      flexDirection: "column",
      padding: "10px 20px",
      fontSize: 3,
      textDecoration: "none",
      ".label": {
        fontWeight: 700,
      },
    },
  },
  fontSizes: [14, 16, 18, 20, 24, 32, 48, 64],
  sideLink: {
    fontFamily: "heading",
    lineHeight: 2.3,
    fontSize: 2,
    a: { textDecoration: "none", color: "primary" },
    "ul li": {
      pl: 3,
    },
    "> li": {
      p: "10px 30px",
      borderBottom: "1px solid",
      borderColor: "border",
      boxShadow: "inset -1px -2px 0px rgba(0, 0, 0, 0.01)",
    },
  },
  styles: {
    h1: {
      mt: 0,
      mb: 4,
    },
    h2: {
      borderBottom: "1px solid",
      borderColor: "border",
      pb: 3,
      mt: "60px",
      mb: 4,
    },
    ul: {
      mb: 4,
      listStyle: "disc",
      ml: "20px",
    },
    li: {
      fontSize: "18px",
      mb: 2,
    },
    p: {
      fontSize: "18px",
    },
    pre: {
      mb: 4,
      ".comment": {
        color: "gainsboro",
      },
    },
    em: {
      fontStyle: "italic",
    },
    table: {
      border: "1px solid",
      borderColor: "border",
      fontFamily: "heading",
      my: 5,
    },
    tr: {
      borderColor: "border",
      ":nth-of-type(odd)": {
        bg: "muted",
      },
    },
    td: {
      padding: "15px",
    },
    th: {
      padding: "25px 15px",
      bg: "background",
      fontSize: 3,
      fontWeight: 700,
    },
  },
}
