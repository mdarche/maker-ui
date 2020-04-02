const content = {
  display: 'block',
  maxWidth: 'maxWidth_content',
  mx: 'auto',
}

const sidebar = {
  base_sidebar: {
    display: 'grid',
    gridGap: t => t.gap.gap_content,
    maxWidth: 'maxWidth_content',
    mx: 'auto',
  },
  'sidebar-content': {
    variant: 'eui_layout.base_sidebar',
    '#primary-sidebar': {
      gridRow: [2, 'auto'],
    },
  },
  'content-sidebar': {
    variant: 'eui_layout.base_sidebar',
  },
}

const sideNav = {
  base_sidenav: {
    display: 'flex',
    '#content': {
      maxWidth: 'maxWidth_content',
      mx: 'auto',
    },
  },
  'sidenav-content': {
    variant: 'eui_layout.base_sidenav',
    '#side-nav': {
      left: 0,
    },
    '#toggle-sidenav': {
      right: 30,
    },
  },
  'content-sidenav': {
    variant: 'eui_layout.base_sidenav',
    '#side-nav': {
      right: 0,
    },
    '#toggle-sidenav': {
      left: 30,
    },
  },
}

export default {
  eui_layout: {
    content,
    'full-width': {
      display: 'block',
      maxWidth: '100%',
    },
    ...sidebar,
    ...sideNav,
  },
}
