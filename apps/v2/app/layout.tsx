import { Layout } from '@maker-ui/layout'
import Link from 'next/link'
import { options } from './options'
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
            {/* <Layout.Topbar>Test</Layout.Topbar> */}
            <Layout.Header
              logo={<Link href="/">Logo</Link>}
              menu={<NavMenu menuItems={menu} />}
              widgets={<ColorButton />}
              menuButton={<MenuButton />}
            />
            <Layout.MobileMenu closeButton={<MenuButton close />}>
              <CollapseMenu items={menu} />
            </Layout.MobileMenu>
            <Layout.Main>{children}</Layout.Main>
            <Layout.Sidebar>Sidebar</Layout.Sidebar>
            <Layout.SideNav collapseButton={<MenuButton sideNav />}>
              <CollapseMenu items={menu} />
            </Layout.SideNav>
            {/* <Layout.Footer>Footer stuff</Layout.Footer> */}
          </Layout>
        </Provider>
      </body>
    </html>
  )
}
