import { Layout } from 'maker-ui'
import { ColorButton, Menu } from 'maker-ui/layout'
import { Providers } from './providers'

import 'maker-ui/layout.css'
import '@/styles/styles.scss'

import { menu } from './menu'
import { options } from './options'

export const metadata = {
  title: 'Maker UI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout options={options}>
            <Layout.Header
              logo={{ icon: 'Logo', path: '/' }}
              menu={menu}
              widgets={<ColorButton />}
              menuButton={{ defaultIcon: 'menu' }}
            />
            <Layout.MobileMenu
              closeButton={{ defaultIcon: 'close' }}
              menu={menu}
            />
            <Layout.Main>{children}</Layout.Main>
            <Layout.SideNav
              menuButton={{
                icon: 'Collapse',
                fixed: true,
                position: { bottom: 30, right: 30 },
              }}>
              <Menu items={menu} />
            </Layout.SideNav>
            <Layout.Footer>Footer stuff</Layout.Footer>
          </Layout>
        </Providers>
      </body>
    </html>
  )
}
