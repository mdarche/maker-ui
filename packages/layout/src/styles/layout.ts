import { MakerProps } from '@maker-ui/css'

export const layoutStyles: MakerProps['css'] = {
  // Skiplinks
  '.skiplinks': {
    listStyle: 'none',
    position: 'relative',
    zIndex: 1000,
    padding: 0,
    margin: 0,
    a: {
      background: 'var(--color-bg_header)',
      display: 'block',
      position: 'absolute',
      fontFamily: 'var(--font-body)',
      left: -9999,
      padding: '1em',
      '&:focus': {
        left: 0,
      },
    },
  },
  // Header
  header: {
    zIndex: 100,
  },
  '#site-logo': {
    display: 'inline-flex',
  },
  // Nav Grid
  '.nav-grid': {
    margin: '0 auto',
    position: 'relative',
    maxWidth: 'var(--maxWidth_header)',
  },
  '.nav-area': {
    display: 'flex',
    alignItems: 'center',
  },
  '.button-slot': {
    gridArea: 'button',
  },
  '.menu-slot': {
    gridArea: 'menu',
  },
  '.menu-slot.split': {
    gridArea: 'menu-split',
    justifyContent: 'flex-end',
  },
  '.logo-slot': {
    gridArea: 'logo',
  },
  '.widget-slot': {
    gridArea: 'widgets',
  },
  '.menu-scroll .menu-slot': {
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
  },
  '.desktop-visible': {
    display: 'block',
  },
  '.layout-basic .menu-slot': {
    justifyContent: 'flex-end',
  },
  '.layout-basic-left .menu-slot': {
    justifyContent: 'flex-start',
  },
  '.layout-basic-center .menu-slot': {
    justifyContent: 'center',
  },
  '.layout-center .menu-slot, .layout-center .logo-slot': {
    justifyContent: 'center',
  },
  '.layout-split .widget-slot, .layout-center .widget-slot': {
    top: 0,
    right: 0,
    height: '100%',
  },
  '.layout-minimal-center .button-slot': {
    justifyContent: 'flex-start',
  },
  // Mobile Menu
  '#mobile-menu': {
    position: 'fixed',
    top: 0,
    bottom: 0,
    zIndex: 100,
    background: 'var(--color-bg_mobileMenu)',
    willChange: 'transform, opacity',
    visibility: 'hidden',
    transition: 'all ease 0.3s',
    '.menu-button': {
      position: 'absolute',
    },
    '&.center': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    '&.full-width': {
      width: '100%',
      left: 0,
    },
    '&:not(.full-width)': {
      width: 'var(--width_mobileMenu)',
    },
    '&.fade, &.fade-up, &.fade-down': {
      opacity: 0,
      '&.active': {
        opacity: 1,
        visibility: 'visible',
        transform: 'translateY(0)',
      },
    },
    '&.fade-up': { transform: 'translateY(20px)' },
    '&.fade-down': { transform: 'translateY(-20px)' },
    '&.slide-right.active, &.slide-left.active': {
      visibility: 'visible',
      transform: 'translateX(0)',
    },
    '&.slide-right': { right: 0, transform: 'translateX(100%)' },
    '&.slide-left': { left: 0, transform: 'translateX(-100%)' },
  },
  '.menu-button': {
    display: 'block',
    margin: 0,
    border: 'none',
    background: 'none',
    svg: {
      display: 'block',
      margin: '0 auto',
    },
  },
  '.menu-button-icon': {
    height: 27,
    '&.close-button-icon': {
      height: 35,
    },
  },
  '.close-top-left .menu-button': { top: 0, left: 0 },
  '.close-top-right .menu-button': { top: 0, right: 0 },
  '.close-bottom-left .menu-button': { bottom: 0, left: 0 },
  '.close-bottom-right .menu-button': { bottom: 0, right: 0 },
  '.menu-overlay': {
    background: 'rgba(0, 0, 0, 0.15)',
    zIndex: 100,
    willChange: 'opacity',
    transition: 'all ease .4s',
    visibility: 'hidden',
    opacity: 0,
    '&.active': {
      visibility: 'visible',
      opacity: 1,
    },
  },
  // Nav Menu and Menu Items
  '.nav-primary': {
    '.submenu': {
      display: 'inline-block',
      background: 'var(--color-bg_header)',
      width: 'max-content',
      margin: 0,
      padding: 0,
      zIndex: 1,
      opacity: 0,
      visibility: 'hidden',
      listStyle: 'none',
      a: {
        width: '100%',
      },
      li: {
        display: 'block',
      },
    },
    '.submenu.depth-0': {
      position: 'absolute',
      top: '99%',
      left: 0,
    },
    '.submenu:not(.depth-0)': {
      position: 'fixed',
      height: '100%',
      left: '100%',
      top: 0,
    },
  },
  '.submenu-toggle': {
    border: 'none',
    background: 'transparent',
    svg: {
      height: 12,
      width: 12,
      transition: 'transform ease .2s',
      transformOrigin: '50% 55%',
      '&.rotate': {
        transform: 'rotate(180deg)',
      },
    },
  },
  '.dropdown-fade, .dropdown-fade-down, .dropdown-fade-up': {
    '.submenu': {
      transition: 'all ease .3s',
    },
    'li:focus-within > .submenu, li:hover > .submenu': {
      opacity: 1,
      visibility: 'visible',
    },
  },
  '.dropdown-fade-down .submenu': {
    transform: 'translateY(-10px)',
  },
  '.dropdown-fade-up .submenu': {
    transform: 'translateY(10px)',
  },
  '.dropdown-fade-up, .dropdown-fade-down': {
    'li:focus-within > .submenu, li:hover > .submenu': {
      transform: 'translateY(0)',
    },
  },
  '.dropdown-scale': {
    '.submenu': {
      opacity: 1,
      visibility: 'visible',
      transform: 'scale(1, 0)',
      transformOrigin: '0 0',
      transition: 'transform ease-in-out .25s',
      li: {
        opacity: 0,
        transition: 'opacity .03s ease-in-out',
      },
    },
    'li:focus-within > .submenu, li:hover > .submenu': {
      transform: 'scale(1, 1)',
      li: { opacity: 1, transition: 'opacity ease-in-out .2s .2s' },
    },
  },
  '.header-nav > .menu-item': {
    position: 'relative',
    display: 'inline-flex',
  },
  '.menu-item.caret > a:after': {
    content: '""',
    display: 'inline-block',
    width: 0,
    height: 0,
    marginLeft: '.4em',
    verticalAlign: '.25em',
    borderTop: '.25em solid',
    borderRight: '.25em solid transparent',
    borderLeft: '.25em solid transparent',
  },
  // Content Area
  '#site-inner': {
    position: 'relative',
  },
  // SideNav
  '#sidenav': {
    top: 0,
    bottom: 0,
    width: 'var(--width_sideNav)',
    background: 'var(--color-bg_sideNav)',
    willChange: 'transform',
    transform: 'translateX(0)',
    '> .container': {
      position: 'sticky',
      overflowY: 'auto',
    },
  },
  '#toggle-sidenav': {
    position: 'fixed',
    bottom: 30,
    zIndex: 100,
  },
  '#collapse-sidenav': {
    position: 'sticky',
    zIndex: 100,
    top: 80,
    height: 50,
  },
  '.default-collapse': {
    height: 24,
  },
  // Layouts
  '.layout-content': {
    display: 'block',
    maxWidth: 'var(--maxWidth_content)',
    margin: '0 auto',
  },
  '.layout-sidebar-content, .layout-content-sidebar, .layout-sidebar-content-sidebar':
    {
      display: 'grid',
      gap: 'var(--gap_content)',
      maxWidth: 'var(--maxWidth_content)',
      margin: '0 auto',
      minHeight: '80vh',
    },
  '.layout-sidenav-content, .layout-content-sidenav': {
    display: 'flex',
    main: {
      maxWidth: 'var(--maxWidth_content)',
    },
  },
  '.layout-sidenav-content': {
    '#sidenav': { left: 0 },
    '#toggle-sidenav': { right: 30 },
    '.default-collapse:not(.rotate)': {
      transform: 'rotate(180deg)',
    },
  },
  '.layout-content-sidenav': {
    '#sidenav': { right: 0 },
    '#toggle-sidenav': { left: 30 },
    '.default-collapse.rotate': {
      transform: 'rotate(180deg)',
    },
  },
  main: {
    position: 'relative',
    flex: 1,
    margin: '0 auto',
  },
  section: {
    width: '100%',
  },
  footer: {
    background: 'var(--color-bg_footer)',
  },
  '.footer-container': {
    maxWidth: 'var(--maxWidth_footer)',
  },
}
