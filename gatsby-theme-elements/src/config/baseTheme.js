import merge from "deepmerge"
import options from "./defaults"
import styles from "./styles"
import childTheme from "../theme"

/*
 *  Default THEME UI Object
 *
 *  Overwrite or extend by shadowing src/theme.js
 */

export default merge(
  {
    initialColorMode: "light",
    colors: {
      text: "#000",
      background: "#fff",
      primary: "#36313d",
      secondary: "#355cac",
      accent: "#1858dc",
      muted: "#f6f6f6",
      logo: "#000",
      border: "#e6e6e6",
      bg_topbar: "#355cac",
      bg_header: "#fff",
      bg_mobilenav: "rgba(0, 0, 0, 0.9)",
      bg_sidenav: "#fdfdfd",
      bg_tabbar: "#fff",
      bg_footer: "#fff",
      text_navlink: "#36313d",
      text_topbar: "#fff",
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
      tabbar: null,
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
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
        color: "text_navlink",
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
  },
  childTheme !== undefined ? childTheme : {}
)
