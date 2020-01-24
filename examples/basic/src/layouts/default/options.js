export default {
  layout: "sidebar",
  topbar: {
    sticky: true,
    maxWidth: 1260,
  },
  header: {
    sticky: true,
    stickyMobile: true,
    maxWidth: 1260,
    mobileNavWidth: 300,
    mobileAnimation: "fade",
    spring: { tension: 170, friction: 26 },
  },
  sideNav: {
    width: 300,
    spring: { tension: 170, friction: 26 },
  },
  content: {
    maxWidth: 1020,
    gridGap: 30,
  },
  sidebar: {
    width: ".3fr",
  },
  footer: {
    maxWidth: 1020,
    gridGap: 30,
  },
  breakpoints: {
    sm: 750,
    md: 960,
    lg: 1240,
  },
}

export const menuItems = [
  { label: "Sample", path: "/test" },
  {
    label: "Headers",
    path: "/test",
    submenu: [
      { label: "Basic", path: "/test" },
      { label: "Text Center", path: "/test" },
      { label: "Text Left", path: "/test" },
      { label: "Split", path: "/test" },
      { label: "Center", path: "/test" },
    ],
  },
  {
    label: "Layouts",
    path: "/test",
    submenu: [
      { label: "Content", path: "/test" },
      { label: "Full Width", path: "/test" },
      { label: "Sidebar / Content", path: "/test" },
      { label: "Content / Sidebar", path: "/test" },
      { label: "SideNav / Content", path: "/test" },
      { label: "Content / SideNav", path: "/test" },
    ],
  },
  { label: "Topbar", path: "/test" },
]
