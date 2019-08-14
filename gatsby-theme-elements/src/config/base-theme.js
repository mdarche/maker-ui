import merge from "deepmerge"

import options from "./defaults"
import styles from "./styles"
import childTheme from "../theme"
import { validate } from "../utils/helper"

// Default THEME UI Object

export default merge(
  {
    initialColorMode: "light",
    colors: {
      text: "#333",
      background: "#fff",
      primary: "#1858dc",
      secondary: "#355cac",
      accent: "#1858dc",
      muted: "#f6f6f6",
      logo: "#000",
      navlink: "#333",
      border: "#e6e6e6",
      bg_topbar: "#355cac",
      bg_header: "#fff",
      bg_mobilenav: "rgba(0, 0, 0, 0.9)",
      bg_sidenav: "#fdfdfd",
      bg_tabbar: "#fff",
      bg_footer: "#fff",
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
    layout: {
      header: {
        right: { justifyContent: "space-between" },
        center: {
          justifyContent: ["space-between", "center"],
          flexWrap: "wrap",
        },
        split: {
          justifyContent: ["space-between", "center"],
        },
      },
      fullFlex: {
        width: ["auto", "100%"],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    navlink: {
      textDecoration: "none",
      whiteSpace: "nowrap",
      color: "navlink",
      "&:hover": {
        color: "secondary",
      },
    },
    tablink: {
      color: "accent",
      fontSize: "12px",
      textDecoration: "none",
      textAlign: "center",
    },
    breakpoints: [
      `${options.breakpoints.sm}px`,
      `${options.breakpoints.md}px`,
      `${options.breakpoints.lg}px`,
    ],
    styles,
  },
  validate(childTheme)
)
