export const primaryMenu = [
  {
    label: 'Docs',
    path: '/docs/getting-started',
  },
  { label: 'Tutorials', path: '/tutorials' },
  {
    label: 'Demo Site',
    path: '/demo',
    submenu: [
      { label: 'Tutorials', path: '/tutorials' },
      { label: 'T', path: '/tutorials1' },
      { label: 'Test', path: '/tutorials2' },
      {
        label: 'Test',
        path: '/tutorials3',
        submenu: [
          { label: 'Tutorials', path: '/tutorials' },
          { label: 'T', path: '/tutorials1' },
          {
            label: 'Test',
            path: '/tutorials3',
            submenu: [
              { label: 'Tutorials', path: '/tutorials' },
              { label: 'T', path: '/tutorials1' },
            ],
          },
          {
            label: 'Test',
            path: '/tutorials3',
            submenu: [
              { label: 'Tutorials', path: '/tutorials' },
              { label: 'T', path: '/tutorials1' },
            ],
          },
        ],
      },
    ],
  },
  { label: 'FAQs', path: '/faqs' },
]

export const docsMenu = [
  { label: 'Getting Started', path: '/docs/getting-started' },
  { label: 'Configure Options', path: '/docs/options' },
  { label: 'Design a Theme', path: '/docs/theming' },
  {
    label: 'Build a Layout',
    path: '/docs/layouts',
    openNested: true,
    submenu: [
      {
        label: 'Components',
        path: '/docs/layout-components',
        submenu: [
          { label: 'Layout', path: '/docs/layout' },
          { label: 'Topbar', path: '/docs/topbar' },
          { label: 'Header', path: '/docs/header' },
          { label: 'Navbar', path: '/docs/navbar' },
          { label: 'MobileMenu', path: '/docs/mobile-menu' },
          { label: 'Content', path: '/docs/content' },
          { label: 'Main', path: '/docs/main' },
          { label: 'Section', path: '/docs/section' },
          { label: 'SideNav', path: '/docs/sidenav' },
          { label: 'Sidebar', path: '/docs/sidebar' },
          { label: 'AccordionMenu', path: '/docs/accordion-menu' },
          { label: 'Footer', path: '/docs/footer' },
        ],
        openNested: true,
      },
      { label: 'Conditional Layouts', path: '/docs/conditional-layouts' },
      { label: 'Templates', path: '/docs/templates' },
    ],
  },
  { label: 'Add Content', path: '/docs/add-content' },
  { label: 'Maker Components', path: '/docs/maker-components' },
  { label: 'API', path: '/docs/api' },
]
