import merge from "deepmerge"
import options from "../options"

/*
 *  Default GATSBY THEME ELEMENTS Layout Settings
 *
 *  Overwrite or extend this file by shadowing src/options.js
 */

export default merge(
  {
    topbar: {
      sticky: true,
      maxWidth: 1260,
    },
    header: {
      sticky: true,
      stickyMobile: true,
      maxWidth: 1260,
      mobileNavStyle: "fade",
      mobileNavWidth: 300,
      spring: { tension: 170, friction: 26 },
    },
    sideNav: {
      active: false,
      width: "18em",
      spring: { tension: 170, friction: 26 },
    },
    main: {
      paddingTop: 0,
      maxWidth: 1260,
      gridGap: 30,
      sidebar: true,
      sidebarWidth: ".3fr",
      sidebarPosition: "left",
    },
    footer: {
      maxWidth: 1260,
      gridGap: 30,
    },
    breakpoints: {
      sm: 750,
      md: 960,
      lg: 1240,
    },
  },
  options
)
