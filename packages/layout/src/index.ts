import { ResizeObserver } from '@juggle/resize-observer'

// Components
export {
  Layout,
  Topbar,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  SideNav,
  Sidebar,
  Footer,
  Section,
  ColorButton,
  CollapsibleMenu,
  ErrorBoundary,
  type SectionProps,
  type MenuItemProps,
  type MakerMenu,
} from './components'

// Layout Hooks
export { useMenu, useSideNav } from './context/ActionContext'
export { useOptions } from './context/OptionContext'
export { useColorTheme } from './context/LayoutContext'

// Re-export external helper packages
export { ResizeObserver }

// Types
export type { MakerUIOptions } from './types'
