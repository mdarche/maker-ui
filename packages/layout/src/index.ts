/* Combine all layout styles */
import './styles/global.css'
import './styles/header.css'
import './styles/layout.css'
import './styles/mobile-menu.css'
import './styles/side-nav.css'
import './styles/topbar.css'
import './styles/utility.css'
import './styles/workspace.css'
import './styles/components.css'

/* Export standalone Client components */
export {
  ColorButton,
  MenuButton,
  Menu,
  LayoutProvider,
  useColorTheme,
  useMenu,
  useLayout,
  Div,
} from '@maker-ui/layout-client'

/* Export standalone Server components and types */
export {
  Section,
  type MakerUIOptions,
  type MenuItemProps,
} from '@maker-ui/layout-server'

/* Export the blended server + client Layout component */
export { Layout } from './components'
