export const theme = {
  styles: {
    root: {
      // fontFamily: 'body',
      a: {
        textDecoration: 'none',
      },
      li: {
        listStyle: 'none',
      },
      header: {
        borderBottom: '1px solid gainsboro',
      },
    },
  },
  // Maker UI layout variants
  header: {
    py: [2, '10px'],

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
    pageIndicator: {
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
