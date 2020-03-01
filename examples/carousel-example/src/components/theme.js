export default {
  initialColorModeName: 'light',
  colors: {
    text: '#333',
    background: '#fff',
    primary: '#1858dc',
    secondary: '#355cac',
    accent: '#1858dc',
    muted: '#f6f6f6',
    border: '#e6e6e6',
    bg_topbar: '#355cac',
    bg_header: '#fff',
    bg_mobileNav: 'rgba(0, 0, 0, 0.9)',
    bg_sideNav: '#eee',
    bg_footer: '#fff',
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  breakpoints: ['768px', '960px', '1240px'],
  styles: {
    root: {
      a: {
        textDecoration: 'none',
      },
      li: {
        listStyle: 'none',
      },
    },
  },
  // Elements UI layout variants
  header: {
    py: [2, '10px'],
    borderBottom: '1px solid',
    borderColor: 'border',
    fontFamily: 'heading',
    logo: { fontSize: [24, 36] },
    menu: {
      px: 60,
      a: {
        fontSize: 2,
        fontWeight: 700,
        display: 'block',
        color: 'primary',
        textDecoration: 'none',
        py: 3,
        px: 3,
      },
    },
    navbar: {},
    submenu: {},
    colorButton: {},
    mobileMenu: {
      pt: 40,
      fontSize: 24,
      lineHeight: 2,
      a: {
        color: '#fff',
      },
    },
  },
  main: {
    pt: 50,
  },
  carousel: {
    height: 500,
    overflow: 'hidden',
    pagination: {
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
    },
    page: {
      bg: 'rgba(123, 0, 0, 0.25)',
      '&.active': {
        bg: 'red',
      },
    },
  },
}
