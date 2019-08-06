const singleColor = "#c80c0c"

export default {
  initialColorMode: "light",
  colors: {
    text: "#000",
    background: "#fff",
    primary: singleColor,
    secondary: singleColor,
    accent: singleColor,
    muted: "#f6f6f6",
    border: "#e6e6e6",
    bg_header: "#fff",
    bg_sidenav: "#fbfbfb",
    bg_footer: "#fff",
    modes: {
      dark: {
        text: "#fff",
        background: "#282c35",
        primary: "#0cf",
        secondary: "#fea7c4",
        accent: "#60d8d1",
        muted: "#111",
        border: "#404040",
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
      borderColor: "primary",
      color: "primary",
      display: "inline-flex",
      flexDirection: "column",
      padding: "10px 20px",
      fontSize: 3,
      textDecoration: "none",
    },
  },
  styles: {
    h1: {
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
      fontSize: 3,
      mb: 2,
    },
    pre: {
      mb: 4,
    },
    em: {
      fontStyle: "italic",
    },
  },
}
