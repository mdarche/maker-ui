const format = value => {
  return isNaN(value) ? value : `${value}px`
}

const sidebar = {
  display: "grid",
  gridGap: ({ gap }) => gap.gap_content,
  maxWidth: "maxWidth_content",
  mx: "auto",
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
      mx: "auto",
    },
    "sidebar-content": {
      ...sidebar,
      gridTemplateColumns: ({ sizes }) => [
        `1fr`,
        `${format(sizes.width_sidebar)} 1fr`,
      ],
      "#primary-sidebar": {
        gridRow: [2, "auto"],
      },
    },
    "content-sidebar": {
      ...sidebar,
      gridTemplateColumns: ({ sizes }) => [
        `1fr`,
        `1fr ${format(sizes.width_sidebar)}`,
      ],
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
