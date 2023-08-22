import { type MenuItem } from 'maker-ui/layout'

// Root path for all API Reference pages
const root = '/api-reference'
// Paths for each section
const layout = `${root}/layout`
const components = `${root}/components`
const functions = `${root}/functions`

export const menu: MenuItem[] = [
  { label: 'Home', path: '/' },
  // {
  //   label: 'Megamenu',
  //   path: '/about',
  //   megamenu: (
  //     <div style={{ height: 200, width: 200, background: '#000' }}>
  //       Lets go!
  //     </div>
  //   ),
  // },
  { label: 'API Reference', divider: true },
  {
    label: 'Layout System',
    path: `${root}/layout`,
    submenu: [
      { label: 'Create a Layout', path: `${layout}/create-a-layout` },
      { label: 'MakerUIOptions', path: `${layout}/maker-ui-options` },
      { label: 'CSS Variables', path: `${layout}/css-variables` },
      { label: 'Mobile Menu', path: `${layout}/mobile-menu` },
      { label: 'Layout Demo', path: `${layout}/layout-demo` },
      { label: 'Components', className: 'nav-heading', divider: true },
      { label: '<ColorButton>', path: `${layout}/color-button` },
      { label: '<Layout>', path: `${layout}/layout` },
      { label: '<LayoutProvider>', path: `${layout}/layout-provider` },
      { label: '<MenuButton>', path: `${layout}/menu-button` },
      { label: '<Menu>', path: `${layout}/menu` },
      { label: '<Div>', path: `${layout}/div` },
      { label: '<Section>', path: `${layout}/section` },
      { label: '<ThemeProvider>', path: `${layout}/theme-provider` },
      { label: 'Hooks', className: 'nav-heading', divider: true },
      { label: 'useColorTheme', path: `${layout}/use-color-theme` },
      { label: 'useMenu', path: `${layout}/use-menu` },
      { label: 'useLayout', path: `${layout}/use-layout` },
    ],
  },
  {
    label: 'Components',
    path: `${root}/components`,
    openNested: true,
    submenu: [
      { label: '<Accordion>', path: `${components}/accordion` },
      { label: '<Announcement>', path: `${components}/announcement` },
      { label: '<Carousel>', path: `${components}/carousel` },
      { label: '<Conditional>', path: `${components}/conditional` },
      { label: '<CookieNotice>', path: `${components}/cookie-notice` },
      { label: '<Dropdown>', path: `${components}/dropdown` },
      { label: '<Form>', path: `${components}/form` },
      { label: '<Generate>', path: `${components}/generate` },
      { label: '<Lightbox>', path: `${components}/lightbox` },
      { label: '<Modal>', path: `${components}/modal` },
      { label: '<Parallax>', path: `${components}/parallax` },
      { label: '<Popover>', path: `${components}/popover` },
      { label: '<SmartGrid>', path: `${components}/smart-grid` },
      { label: '<SmartTable>', path: `${components}/smart-table` },
      { label: '<SocialAccounts>', path: `${components}/social-accounts` },
      { label: '<Spinner>', path: `${components}/spinner` },
      { label: '<Style>', path: `${components}/style` },
      { label: '<Tabs>', path: `${root}/tabs` },
      { label: '<ToastProvider>', path: `${components}/toast-provider` },
      { label: '<Tooltip>', path: `${components}/tooltip` },
      { label: '<Transition>', path: `${components}/transition` },
      { label: '<CSSTransition>', path: `${components}/css-transition` },
    ],
  },
  {
    label: 'Functions',
    path: `${root}/functions`,
    openNested: true,
    submenu: [
      { label: 'Hooks', className: 'nav-heading', divider: true },
      { label: 'useCountdown', path: `${functions}/use-countdown` },
      { label: 'useFocusTrap', path: `${functions}/use-focus-trap` },
      { label: 'useIntersection', path: `${functions}/use-intersection` },
      {
        label: 'useKeyboardShortcut',
        path: `${functions}/use-keyboard-shortcut`,
      },
      {
        label: 'useScrollPosition',
        path: `${functions}/use-scroll-position`,
      },
      { label: 'useStorage', path: `${functions}/use-storage` },
      { label: 'useWindowFocus', path: `${functions}/use-window-focus` },
      { label: 'useWindowSize', path: `${functions}/use-window-size` },
      { label: 'Utilities', className: 'nav-heading', divider: true },
      { label: 'Utilities', path: `${functions}/utilities` },
    ],
  },
]
