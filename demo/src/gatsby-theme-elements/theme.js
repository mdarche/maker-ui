import styles from "./styles"
import options from "../../options"

export default {
  initialColorMode: "light",
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#07c",
    secondary: "#05a",
    accent: "#609",
    muted: "#f6f6ff",
    text_topbar: "#fff",
    bg_topbar: "#802",
    bg_header: "#fff",
    bg_navmobile: "rgba(0, 0, 0, 0.9)",
    bg_widgets: "#fff",
    bg_tabbar: "#fff",
    bg_footer: "#fff",
    modes: {
      dark: {
        text: "#fff",
        background: "#000",
        primary: "#0cf",
        secondary: "#09c",
        accent: "#609",
        muted: "#111",
        bg_topbar: "#802",
        bg_header: "#fff",
        bg_navmobile: "#fff",
        bg_widgets: "#fff",
        bg_tabbar: "#fff",
        bg_footer: "#fff",
      },
    },
  },
  fonts: {
    topbar: "system-ui, sans-serif",
    nav: "system-ui, sans-serif",
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
    tabbar: null,
  },
  borders: {
    header: "1px solid gainsboro",
    footer: "1px solid gainsboro",
    tabbar: "1px solid gainsboro",
  },
  sizes: {
    width_mobileNav: options.header.mobileNavWidth,
    max_header: options.header.maxWidth,
    max_topbar: options.topbar.maxWidth,
    max_content: options.content.maxWidth,
    max_footer: options.footer.maxWidth,
  },
  // space: {
  //   widgetGap: options.footer.columnGap,
  //   contentGap: options.content.columnGap,
  // },
  breakpoints: ["40em", "56em", "64em"],
  styles,
}
