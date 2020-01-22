import layouts from "./variants/layouts"
import headers from "./variants/headers"

export default {
  initialColorMode: "light",
  colors: {
    text: "#333",
    background: "#fff",
    primary: "#1858dc",
    secondary: "#355cac",
    accent: "#1858dc",
    muted: "#f6f6f6",
    navlink: "#333",
    border: "#e6e6e6",
    bg_topbar: "#355cac",
    bg_header: "#fff",
    bg_mobilenav: "rgba(0, 0, 0, 0.9)",
    bg_sidenav: "#333",
    bg_footer: "#fff",
    bg_modal: "rgba(0, 0, 0, 0.71)",
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "system-ui, sans-serif",
    monospace: "Menlo, monospace",
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  shadows: {
    header: null,
    sidenav: null,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  ...layouts,
  ...headers,
}
