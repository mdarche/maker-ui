export default {
  header: {
    py: [3, '15px'],
    px: [3, 5],
    fontFamily: 'heading',
    logo: {
      svg: {
        height: [23, 27],
      },
    },
    a: {
      color: '#fff',
    },
    menu: {
      px: 60,
      a: {
        fontSize: 2,
        fontWeight: 700,
        display: 'block',
        color: '#fff',
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
    colorButton: {},
    menuButton: {},
    widgets: {},
  },
  mobileNav: {},
  sideNav: {
    pl: 30,
    fontFamily: 'body',
    minHeight: '90vh',
    fontWeight: 700,
    '.submenu-toggle': {
      ml: 20,
    },
    ul: { listStyle: 'none', lineHeight: 2, fontSize: 3, ul: { pl: 20 } },
    a: {
      color: 'primary',
    },
  },
  main: {
    px: [20, 0],
  },
}
