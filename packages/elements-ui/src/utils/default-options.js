export default {
  navigation: 'split',
  layout: 'content',
  topbar: {
    maxWidth: 1260,
    sticky: true,
    stickyMobile: false,
  },
  header: {
    maxWidth: 1460,
    sticky: true,
    stickyMobile: false,
    colorToggle: true,
    hideColorToggleOnMobile: false,
    hideWidgetsOnMobile: true,
    dropdownCaret: true,
    dropdownStyle: 'triangle',
    dropdownAlign: 'center',
    dropdownTransition: 'fade',
  },
  mobileMenu: {
    width: '30vw',
    animation: 'slideRight',
    desktopVisible: false,
  },
  sideNav: {
    width: 300,
  },
  content: {
    maxWidth: 1020,
    maxWidthSection: 1020,
    gridGap: 30,
  },
  sidebar: {
    width: 300,
  },
  modal: {
    animation: 'fade',
    blur: false,
  },
  footer: {
    maxWidth: 1020,
  },
  breakpoints: {
    sm: 750,
    md: 960,
    lg: 1240,
  },
}
