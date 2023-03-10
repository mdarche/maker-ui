/* Combine all layout styles */
import './styles/global.css'
import './styles/header.css'
import './styles/layout.css'
import './styles/mobile-menu.css'
import './styles/side-nav.css'
import './styles/topbar.css'
import './styles/utility.css'
import './styles/workspace.css'

/* Export standalone Client components */
export {
  ColorButton,
  MenuButton,
  CollapseMenu,
  Provider,
  NavMenu,
  WorkspaceButton,
} from '@maker-ui/layout-client'

/* Export Layout component and types */
export { type MakerUIOptions, Layout, Section } from '@maker-ui/layout-server'
