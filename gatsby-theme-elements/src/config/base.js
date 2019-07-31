import options from "./defaults"
import styles from "./styles"

/*
 *  Default THEME UI Object
 *
 *  Overwrite or extend by shadowing src/theme.js
 */

export default {
  initialColorMode: "light",
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#07c",
    secondary: "#05a",
    accent: "#609",
    muted: "#f6f6f6f",
    bg_topbar: "#609",
    bg_header: "#fff",
    bg_mobilenav: "rgba(0, 0, 0, 0.9)",
    bg_sidenav: "#fff",
    bg_tabbar: "#fff",
    bg_footer: "#fff",
    logo: "#000",
    modes: {
      dark: {
        text: "#fff",
        background: "#000",
        primary: "#0cf",
        secondary: "#09c",
        accent: "#609",
        muted: "#111",
        bg_topbar: "#609",
        bg_header: "#fff",
        bg_mobilenav: "#fff",
        bg_sidenav: "#fff",
        bg_tabbar: "#fff",
        bg_footer: "#fff",
        logo: "#000",
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
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  borders: {
    header: "1px solid gainsboro",
    footer: "1px solid gainsboro",
    tabbar: "1px solid gainsboro",
    sidenav: "1px solid gainsboro",
  },
  sizes: {
    max_header: options.header.maxWidth,
    max_topbar: options.topbar.maxWidth,
    max_content: options.content.maxWidth,
    max_footer: options.footer.maxWidth,
    width_mobileNav: options.header.mobileNavWidth,
    width_sidebar: options.sidebar.width,
    width_sideNav: options.sideNav.width,
  },
  gaps: {
    widgetGap: {
      gridGap: options.footer.gridGap,
    },
    contentGap: {
      gridGap: options.content.gridGap,
    },
  },
  textStyles: {
    navlink: {
      textDecoration: "none",
      color: "primary",
      "&:hover": {
        color: "secondary",
      },
    },
  },
  breakpoints: [
    `${options.breakpoints.sm}px`,
    `${options.breakpoints.md}px`,
    `${options.breakpoints.lg}px`,
  ],
  styles,
}
