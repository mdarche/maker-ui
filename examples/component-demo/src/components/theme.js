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
    bg_footer: 'blue',
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
      li: {
        listStyle: 'none',
      },
    },
  },
  testVariant: {
    bg: 'purple',
    p: 300,
  },
  bigVariant: {
    fontWeight: 700,
  },
  otherVariant: {
    p: 20,
  },
  // Maker UI layout variants
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
    submenu: {
      bg: 'gainsboro',
    },
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
  footer: {
    p: 200,
    fontWeight: 700,
    fontSize: 30,
  },
}
