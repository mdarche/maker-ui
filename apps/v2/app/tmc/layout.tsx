import { Layout, type MakerUIOptions } from 'maker-ui'
import Link from 'next/link'
import {
  CollapseMenu,
  ColorButton,
  MenuButton,
  NavMenu,
  Provider,
  MenuItemProps,
  WorkspaceButton,
} from '@/client'
// import { MenuButton } from 'maker-ui/layout'
import { CloseIcon, MenuIcon, TMCLogo } from './icons'
import { Footer } from './Footer'
import './layout.scss'
import { RightMenu } from './RightMenu'

const leftMenu: MenuItemProps[] = [
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
    <Provider options={options}>
      <Layout options={options}>
        {/* <Layout.Topbar>Test topbar</Layout.Topbar> */}
        <Layout.Header
          logo={{ image: <TMCLogo />, path: '/demo' }}
          widgets={<RightMenu />}
          menuButton={<MenuButton />}
          // menuButton={{
          //   icon: <MenuIcon />,
          //   // height: null,
          //   // width: null,
          //   padding: null,
          //   margin: null,
          //   fill: null,
          //   stroke: null,
          //   renderProps: null,
          // }}
        />
        <Layout.MobileMenu>
          <CollapseMenu items={leftMenu} />
        </Layout.MobileMenu>
        <Layout.Main>{children}</Layout.Main>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </Layout>
    </Provider>
  )
}

const options: MakerUIOptions = {
  colorThemes: ['light', 'dark', 'system'],
  layout: 'content',
  topbar: {
    sticky: true,
    stickyOnMobile: false,
    hideOnMobile: false,
  },
  header: {
    navType: 'minimal-center',
    navTypeMobile: 'logo-center',
    sticky: true,
    stickyOnMobile: true,
  },
  mobileMenu: {
    transition: 'slide-left',
    closeOnBlur: true,
    closeOnRouteChange: true,
  },
}
