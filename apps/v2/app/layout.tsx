import { Layout, type MakerUIOptions } from '@maker-ui/layout'
import {
  CollapseMenu,
  ColorButton,
  MenuButton,
  NavMenu,
  Provider,
} from '../components/client'

import '@maker-ui/layout/dist/index.css'
import '@maker-ui/layout/dist/client.css'
import './_variables.css'
import './_global.css'
import Link from 'next/link'

const options: MakerUIOptions = {
  colorThemes: ['light', 'dark', 'system'],
  type: 'content',
  topbar: {
    sticky: true,
    stickyOnMobile: false,
    hideOnMobile: false,
  },
  header: {
    navType: 'basic',
    mobileNavType: 'logo-center',
    sticky: true,
    stickyOnMobile: true,
  },
  mobileMenu: {
    transition: 'slide-left',
    visibleOnDesktop: false,
  },
}

const menu = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/about' },
  { label: 'News', path: '/about' },
  { label: 'Contact', path: '/about' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider options={options}>
          <Layout options={options}>
            <Layout.Topbar>Test</Layout.Topbar>
            <Layout.Header
              logoSlot={<Link href="/">Logo</Link>}
              menuSlot={<NavMenu menuItems={menu} />}
              widgetSlot={<ColorButton />}
              menuButton={<MenuButton />}
            />
            <Layout.MobileMenu closeButton={<MenuButton closeIcon />}>
              <CollapseMenu items={menu} />
            </Layout.MobileMenu>
            <Layout.Main>{children}</Layout.Main>
            <Layout.Sidebar>Sidebar</Layout.Sidebar>
            <Layout.SideNav>
              <CollapseMenu items={menu} />
            </Layout.SideNav>
            {/* <Layout.Footer>Footer stuff</Layout.Footer> */}
          </Layout>
        </Provider>
      </body>
    </html>
  )
}
