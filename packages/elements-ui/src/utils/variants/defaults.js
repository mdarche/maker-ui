export default {
  header: {
    p: 2,
    borderBottom: '1px solid',
    borderColor: 'border',
    fontFamily: 'heading',
    logo: {},
    menu: {
      a: {
        display: 'block',
        color: 'navlink',
        textDecoration: 'none',
        py: 3,
        px: 3,
      },
      '.caret': {
        marginLeft: '5px',
        fontSize: '18px',
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
    colorButton: {},
    menuButton: {},
    widgets: {},
  },
  mobileNav: {},
  sideNav: {},
  modal: {},
  main: {},
  footer: {
    p: 4,
    borderTop: '1px solid',
    borderColor: 'border',
  },
}

// TODO - Move BG colors into actual components
