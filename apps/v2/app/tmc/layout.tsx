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
          logo={
            <Link href="/">
              <TMCLogo />
            </Link>
          }
          widgets={<RightMenu />}
          menuButton={
            <MenuButton>
              <MenuIcon />
            </MenuButton>
          }
        />
        <Layout.MobileMenu
          closeButtonPosition="top-left"
          closeButton={
            <MenuButton close>
              <CloseIcon />
            </MenuButton>
          }>
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
