import styles from "./styles"
import options from "../../options"

export default {
  initialColorMode: "light",
  colors: {
    topbarBG: "#609",
    topbarText: "#fff",
    headerBG: "#fff",
    headerText: "#000",
    background: "#fff",
    primary: "#07c",
    secondary: "#05a",
    text: "#000",
    accent: "#609",
    muted: "#f6f6f6f",
    modes: {
      dark: {
        text: "#fff",
        background: "#000",
        primary: "#0cf",
        secondary: "#09c",
        muted: "#111",
      },
    },
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
    headerShadow: null,
  },
  borders: {
    headerBorder: "1px solid gainsboro",
  },
  sizes: {
    headerContentWidth: options.header.contentMaxWidth,
  },
  breakpoints: ["40em", "56em", "64em"],
  styles,
}
