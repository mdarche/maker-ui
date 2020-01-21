const sidebar = {
  display: "grid",
  px: ["20px", 0],
  gridGap: "gap_content",
  maxWidth: "maxWidth_content",
}

const sideNav = {
  display: "flex",
  "#content": {
    maxWidth: "maxWidth_content",
    mx: "auto",
  },
}

export default {
  eui_layout: {
    content: {
      display: "block",
      maxWidth: "maxWidth_content",
    },
    "sidebar-content": {
      ...sidebar,
      gridTemplateColumns: ({ sizes }) => [`1fr`, `${sizes.width_sidebar} 1fr`],
      "#primary-sidebar": {
        gridRow: [2, "auto"],
      },
    },
    "content-sidebar": {
      ...sidebar,
      gridTemplateColumns: ({ sizes }) => [`1fr`, `1fr ${sizes.width_sidebar}`],
    },
    "sidenav-content": {
      ...sideNav,
      "#side-nav": {
        left: 0,
      },
      "#toggle-sidenav": {
        right: 30,
      },
    },
    "content-sidenav": {
      ...sideNav,
      "#side-nav": {
        right: 0,
      },
      "#toggle-sidenav": {
        left: 30,
      },
    },
  },
}
