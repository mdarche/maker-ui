export default {
  initialColorModeName: 'light',
  colors: {
    text: '#333',
    background: '#f7f7f7',
    primary: '#ead1fd',
    secondary: '#355cac',
    border: '#e6e6e6',
    navlink: '#333',
    bg_topbar: '',
    bg_header: '#fff',
    bg_mobileMenu: '#fff',
    bg_sideNav: '',
    bg_footer: '#fff',
    modes: {
      dark: {
        text: '#fff',
        background: '#0e0a21',
        primary: '#3a1ca0',
        secondary: '#355cac',
        border: '#443e5f',
        navlink: '#fff',
        bg_topbar: '',
        bg_header: '#1b123c',
        bg_mobileMenu: 'rgba(0, 0, 0, 0.9)',
        bg_sideNav: '',
        bg_footer: '#fff',
      },
    },
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  breakpoints: ['768px', '960px', '1240px'],
  styles: {
    root: {
      fontFamily: 'body',
      a: {
        textDecoration: 'none',
      },
    },
  },
  // ---------------------------
  //
  //  Maker UI layout variants
  //
  //  See: https://maker-ui.dev/layout-components for a complete list of variants
  //
  // ---------------------------
  header: {
    py: [2, '10px'],
    px: 2,
    borderBottom: '1px solid',
    borderColor: 'border',
    fontFamily: 'heading',
    logo: {
      fontSize: [16, 24],
      fontWeight: 'bold',
      a: { color: 'navlink' },
    },
    menu: {
      px: 20,
      display: 'flex',
      a: {
        fontSize: 2,
        display: 'flex',
        alignItems: 'center',
        color: 'navlink',
        p: 3,
        '.menu-link-icon': {
          display: 'flex',
          mr: '5px',
          fill: 'currentColor',
        },
      },
    },
    navbar: {},
    submenu: {
      bg: 'bg_header',
      boxShadow: '0px 4px 16px rgba(46, 41, 51, 0.08)',
      border: t => `1px solid ${t.colors.border}`,
      borderBottom: 'none',
      a: {
        px: 30,
        color: 'text',
        borderBottom: t => `1px solid ${t.colors.border}`,
        transition: 'all ease .3s',
        '&:hover': {
          bg: 'background',
        },
      },
    },
    colorButton: {
      border: '2px solid',
      color: 'navlink',
      bg: 'transparent',
      p: '7px 15px',
      borderRadius: 3,
      fontSize: 2,
      fontWeight: 700,
    },
    menuButton: {},
    widgets: {},
  },
  mobileNav: {},
  sideNav: {},
  main: {},
}
