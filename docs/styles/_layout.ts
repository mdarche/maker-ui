/**
 * All Maker UI Layout or semantic element styles
 */

export const layout_styles = {
  header: {
    borderBottom: '1px solid',
    borderColor: 'var(--color-border)',
    padding: ['15px 20px', '5px 35px'],
  },
  '.api-btn > div > a': {
    width: '100%',
  },
  '#site-logo svg': {
    height: 24,
    marginTop: 2,
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
      borderColor: 'var(--color-border)',
      margin: '0 0 0 45px',
      paddingLeft: 8,
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
  '.label-icon': {
    marginRight: '10px',
    border: '1px solid',
    padding: '4px 6px',
    borderColor: 'var(--color-border_theme)',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: '1px',
    color: 'var(--color-primary)',
    borderRadius: '2px',
    background: 'white',
  },
  '.has-submenu a': {
    display: 'flex !important',
    alignItems: 'center',
  },
  '.doc-header': {
    padding: '20px 30px',
    borderBottom: '1px solid',
    borderColor: 'var(--color-border)',
    fontWeight: 'bold',
    background: 'white',
  },
}
