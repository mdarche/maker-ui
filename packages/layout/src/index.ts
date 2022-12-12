// Combine all global CSS files
import './styles/global.css'
import './styles/utility.css'
import './components/server/Header/header.css'
import './components/client/NavMenu/navmenu.css'
import './components/server/Layout/layout.css'
// Default export Server Components
export { Layout } from './components/server/Layout'
export { Section } from './components/server/Section'
// Types
export type { MakerUIOptions } from '@/types'
