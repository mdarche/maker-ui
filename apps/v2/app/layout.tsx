import { Layout } from '@maker-ui/layout'
import Link from 'next/link'
import { options } from './options'
import {
  CollapseMenu,
  ColorButton,
  MenuButton,
  NavMenu,
  Provider,
  MenuItemProps,
} from '../components/client'
import { CustomCollapseMenu } from '../components/CustomCollapse'

import '@maker-ui/layout/dist/index.css'
import '@maker-ui/layout/dist/client.css'
import './_variables.css'
import './_global.css'

const menu: MenuItemProps[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Demo',
    path: '/about',
    openNested: true,
    submenu: [
      { label: 'Accordion', path: '/demo/accordion' },
      { label: 'Tabs', path: '/demo/tabs' },
      { label: 'Modal', path: '/demo/modal' },
      {
        label: 'Transition',
        path: '/demo/transition',
      },
      {
        label: 'Spinners',
        path: '/demo/spinners',
      },
      {
        label: 'Social',
        path: '/demo/social',
      },
      {
        label: 'Style',
        path: '/demo/style',
      },
    ],
  },
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
            <Layout.Sidebar primary>Sidebar</Layout.Sidebar>
            <Layout.Sidebar>Sidebar</Layout.Sidebar>
            <Layout.SideNav collapseButton={<MenuButton sideNav />}>
              <CustomCollapseMenu menu={menu} />
            </Layout.SideNav>
            {/* <Layout.Footer>Footer stuff</Layout.Footer> */}
          </Layout>
        </Provider>
      </body>
    </html>
  )
}
