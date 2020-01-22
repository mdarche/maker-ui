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
  { label: "Link 1", path: "/test" },
  { label: "Link 2", path: "/test" },
  {
    label: "Link 3",
    path: "/test",
    submenu: [
      { label: "Link 1", path: "/test" },
      { label: "Link 2", path: "/test" },
      { label: "Link 3", path: "/test" },
      { label: "Link 4", path: "/test" },
    ],
  },
  { label: "Link 4", path: "/test" },
]
