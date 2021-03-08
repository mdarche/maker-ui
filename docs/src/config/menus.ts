import { MenuProps } from 'maker-ui'

export const navMenu: MenuProps[] = []

// Add component for relevant / related components or doc pages

export const sideMenu: MenuProps[] = [
  { label: 'Getting Started', path: '/docs/getting-started' }, // package overview
  { label: 'Maker UI Options', path: '/docs/options' },
  {
    label: 'Layout Components',
    path: '/docs/layout',
    openNested: false,
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
  {
    label: 'Maker Components',
    path: '/docs/components',
    openNested: false,
    submenu: [
      { label: 'Primitives', path: '/docs/components/primitives' },
      { label: 'Accordion', path: '/docs/components/acccordion' },
      { label: 'Carousel', path: '/docs/components/carousel' },
      { label: 'Lightbox', path: '/docs/components/lightbox' },
      { label: 'Modal', path: '/docs/components/modal' },
      { label: 'Tabs', path: '/docs/components/tabs' },
      { label: 'Announcement', path: '/docs/components/announcement' },
      { label: 'Cookie Notice', path: '/docs/components/cookie-notice' },
      { label: 'Generate', path: '/docs/components/generate' },
      { label: 'Spinner', path: '/docs/components/spinner' },
      { label: 'Popover', path: '/docs/components/popover' },
      { label: 'Tooltip', path: '/docs/components/tooltip' },
      { label: 'Dropdown', path: '/docs/components/dropdown' },
      { label: 'TreeMenu', path: '/docs/components/tree-menu' },
      { label: 'PageTransition', path: '/docs/components/page-transition' },
      { label: 'TableofContents', path: '/docs/components/table-of-contents' },
    ],
  },
  { label: 'SEO', path: '/docs/seo' },
  { label: 'Guides', path: '/docs/guides' },
  { label: 'Conditional Layouts', path: '/docs/conditional-layouts' },
  { label: 'Templates', path: '/docs/templates' },
  { label: 'Hooks', path: '/docs/hooks' },
]
