export default {
  header: {
    py: [2, '10px'],
    borderBottom: '1px solid',
    borderColor: 'border',
    fontFamily: 'heading',
    logo: {},
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
      bg: 'background',
      boxShadow:
        'rgba(46, 41, 51, 0.08) 0px 4px 16px, rgba(71, 63, 79, 0.16) 0px 8px 24px',
      a: {
        px: 30,
        transition: 'all ease .3s',
        '&:hover': {
          bg: 'muted',
        },
      },
      'a:not(last-of-type)': {
        borderBottom: t => `1px solid ${t.colors.border}`,
      },
    },
    colorButton: {
      border: t => `3px solid ${t.colors.primary}`,
      color: 'primary',
      bg: 'transparent',
      py: '7px',
      px: 3,
      ml: 3,
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
