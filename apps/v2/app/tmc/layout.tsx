import { Layout, LayoutProvider, type MakerUIOptions } from 'maker-ui'
import { type MenuItem } from 'maker-ui/layout'

import { CloseIcon, MenuIcon, TMCLogo } from './icons'
import { Footer } from './Footer'
import './layout.scss'
import { RightMenu } from './RightMenu'

const leftMenu: MenuItem[] = [
  { label: 'Home', path: '/tmc' },
  { label: 'TMC NFT', path: '/tmc/nft' },
  { label: 'Experience', path: '/tmc/experience' },
  { label: 'Metaverse', path: '/tmc' },
  { label: 'About', path: '/tmc' },
]

const accountMenu = []

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutProvider options={options}>
      <Layout options={options}>
        {/* <Layout.Topbar>Test topbar</Layout.Topbar> */}
        <Layout.Header
          logo={{ icon: <TMCLogo />, path: '/demo' }}
          widgets={<RightMenu />}
          menuButton={{
            icon: <MenuIcon />,
          }}
        />
        <Layout.MobileMenu
          menu={leftMenu}
          closeButton={{
            icon: <CloseIcon />,
            absolute: true,
            position: {
              top: 20,
              left: 20,
            },
          }}
        />
        <Layout.Main>{children}</Layout.Main>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </Layout>
    </LayoutProvider>
  )
}

const options: MakerUIOptions = {
  colorThemes: ['light', 'dark', 'system'],
  layout: 'content',
  header: {
    navType: 'minimal-center',
    navTypeMobile: 'logo-center',
    sticky: true,
    stickyOnMobile: true,
  },
  mobileMenu: {
    transition: 'slide-left',
    closeOnBlur: false,
    closeOnRouteChange: true,
  },
}
