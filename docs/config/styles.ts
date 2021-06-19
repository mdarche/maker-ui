export const styles = {
  // Global styles
  a: {
    textDecoration: 'none',
  },
  button: {
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
  },
  code: {
    display: 'inline-block',
    borderRadius: 2,
    fontSize: 16,
    backgroundColor: 'var(--color-bg_code)',
    padding: '3px 8px',
  },
  // Header Styles
  header: {
    borderBottom: '1px solid',
    borderColor: 'var(--color-border)',
    padding: '5px 20px',
  },
  main: {
    fontSize: 17,
    lineHeight: 1.6,
    padding: ['50px 30px'],
  },
  //SideNav styles
  '#sidenav': {
    borderRight: '1px solid',
    borderColor: 'var(--color-border)',
    'li a': {
      color: 'var(--color-text)',
      fontWeight: 700,
      transition: 'color ease 0.3s',
      '&.current, &:hover': {
        color: 'var(--color-link)',
      },
    },
    ul: {
      listStyle: 'none',
    },
    '> .container > ul': {
      padding: 0,
    },
    'ul ul': {
      borderLeft: '1px solid',
      borderColor: 'var(--color-border_dark)',
      margin: '5px 0 5px 36px',
      padding: 0,
    },
    'li div': {
      justifyContent: 'space-between',
    },
    '.submenu-toggle': {
      marginRight: 3,
      width: 50,
    },
    a: {
      display: 'block',
      padding: '8px 35px',
    },
  },
}
