import { MenuProps } from 'maker-ui'

export const navMenu: MenuProps[] = []

// Add component for relevant / related components or doc pages

export const sideMenu: MenuProps[] = [
  { label: 'Getting Started', path: '/docs/getting-started' }, // package overview
  { label: 'Maker UI Options', path: '/docs/options' },
  {
    label: 'Layout Components',
    path: '/docs/layout',
    openNested: true,
    submenu: [
      { label: 'Layout', path: '/docs/layout/layout' },
      { label: 'Topbar', path: '/docs/layout/topbar' },
      { label: 'Header', path: '/docs/layout/header' },
      { label: 'Navbar', path: '/docs/layout/navbar' },
      { label: 'MobileMenu', path: '/docs/layout/mobile-menu' },
      { label: 'Content', path: '/docs/layout/content' },
      { label: 'Main', path: '/docs/layout/main' },
      { label: 'SideNav', path: '/docs/layout/sidenav' },
      { label: 'Sidebar', path: '/docs/layout/sidebar' },
      { label: 'Dock', path: '/docs/layout/dock' },
      { label: 'Workspace', path: '/docs/layout/workspace' },
      { label: 'Footer', path: '/docs/layout/footer' },
      { label: 'Section', path: '/docs/layout/section' },
      { label: 'CollapsibleMenu', path: '/docs/layout/collapsible-menu' },
      { label: 'ColorButton', path: '/docs/layout/color-button' },
      { label: 'PanelButton', path: '/docs/layout/panel-button' },
    ],
  },
  { label: 'Guides', path: '/docs/guides' },
  { label: 'Add Content', path: '/docs/add-content' },
  { label: 'Conditional Layouts', path: '/docs/conditional-layouts' },
  { label: 'Templates', path: '/docs/templates' },
  { label: 'Hooks API', path: '/docs/api' },
  { label: 'Maker Components', path: '/docs/maker-components' },
]
