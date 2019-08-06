export default {
  initialColorMode: "light",
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#c83d24",
    secondary: "#355cac",
    accent: "#1858dc",
    muted: "#f6f6f6",
    logo: "#000",
    border: "#e6e6e6",
    bg_topbar: "#355cac",
    bg_header: "#fff",
    bg_mobilenav: "rgba(0, 0, 0, 0.9)",
    bg_sidenav: "#f9f9f9",
    bg_tabbar: "#fff",
    bg_footer: "#fff",
    text_navlink: "#36313d",
    text_topbar: "#fff",
    modes: {
      dark: {
        text: "#fff",
        background: "#282c35",
        primary: "#0cf",
        secondary: "#fea7c4",
        accent: "#60d8d1",
        muted: "#111",
        bg_topbar: "#fea6c8",
        bg_header: "#20232d",
        bg_mobilenav: "#1c1e27",
        bg_sidenav: "#1c1e27",
        bg_tabbar: "#1c1e27",
        bg_footer: "#1c1e27",
        border: "#404040",
        logo: "#000",
        text_navlink: "#fff",
        text_topbar: "#000",
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

  styles: {
    h1: {
      mb: 4,
    },
  },
}
