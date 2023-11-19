/* Combine all layout styles */
import './styles/global.css'
import './styles/header.css'
import './styles/layout.css'
import './styles/mobile-menu.css'
import './styles/topbar.css'
import './styles/utility.css'

/* Export standalone Client components */
export {
  ColorButton,
  MenuButton,
  Menu,
  LayoutProvider,
  ThemeProvider,
  Div,
  useTheme,
  useMenu,
  useLayout,
} from '@maker-ui/layout-client'

/* Export standalone Server components and types */
export {
  Section,
  Skiplinks,
  type MakerUIOptions,
  type MenuItemProps,
} from '@maker-ui/layout-server'

/* Export the blended server + client Layout component */
export { Layout, ResponsiveStyle } from './components'
