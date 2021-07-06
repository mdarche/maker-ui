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
    padding: '0 8px',
  },
  // Header Styles
  header: {
    borderBottom: '1px solid',
    borderColor: 'var(--color-border)',
    padding: '5px 35px',
  },
  '.api-btn > div > a': {
    border: '1px solid',
    background: 'var(--color-bg_header)',
    borderColor: 'var(--color-border_dark)',
    width: '100%',
    margin: '5px 0 0',
    padding: '10px',
  },
  main: {
    fontSize: 17,
    lineHeight: 1.6,
    padding: ['20px 30px 50px'],
    h2: {
      borderBottom: '1px solid',
      borderColor: 'var(--color-border_dark)',
      paddingBottom: 10,
      margin: '60px 0 30px',
    },
  },
  //SideNav styles
  '#sidenav': {
    borderRight: '1px solid',
    borderColor: 'var(--color-border)',
    'li a': {
      color: 'var(--color-text)',
      fontWeight: 500,
      fontSize: 15,
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
      margin: '0 0 0 35px',
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
      padding: '8px 30px',
    },
  },
}
