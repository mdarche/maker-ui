export default [
  { label: 'Features', path: '/' },
  {
    label: 'Headers',
    path: '/demo',
    submenu: [
      { label: 'Basic', path: '/demo' },
      { label: 'Basic Left', path: '/demo/header-basic-left' },
      { label: 'Split', path: '/demo/header-split' },
      { label: 'Center', path: '/demo/header-center' },
      { label: 'Reverse', path: '/demo/header-reverse' },
      { label: 'Minimal', path: '/demo/header-minimal' },
      { label: 'Minimal Center', path: '/demo/header-minimal-center' },
      { label: 'Minimal Left', path: '/demo/header-minimal-left' },
    ],
  },
  {
    label: 'Layouts',
    path: '#',
    submenu: [
      { label: 'Content', path: '/demo' },
      { label: 'Full Width', path: '/demo/full-width' },
      { label: 'Content / Sidebar', path: '/demo/content-sidebar' },
      { label: 'Sidebar / Content', path: '/demo/sidebar-content' },
      { label: 'Content / SideNav', path: '/demo/content-sidenav' },
      { label: 'SideNav / Content', path: '/demo/sidenav-content' },
    ],
  },
  { label: 'Documentation', path: '/docs/getting-started' },
]
