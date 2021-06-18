export const styles = {
  a: {
    textDecoration: 'none',
  },
  header: {
    borderBottom: '1px solid',
    borderColor: 'var(--color-border)',
    padding: '5px 20px',
  },
  main: {
    padding: ['0 30px'],
  },
  '#sidenav': {
    ul: {
      listStyle: 'none',
    },
    '> .container > ul': {
      padding: 0,
    },
    'ul ul': {
      borderLeft: '1px solid',
      borderColor: 'var(--color-border)',
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
      padding: '8px 30px',
    },
  },
}
