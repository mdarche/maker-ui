import { Layout, LayoutProvider, type MakerUIOptions } from 'maker-ui'
import { ColorButton, Menu } from 'maker-ui/layout'

import 'maker-ui/layout.css'
import '@/styles/styles.scss'

import { menu } from './menu'

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
        <LayoutProvider options={options}>
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
                position: { bottom: 30, left: 30 },
              }}>
              <Menu items={menu} />
            </Layout.SideNav>
            {/* <Layout.Footer>Footer stuff</Layout.Footer> */}
          </Layout>
        </LayoutProvider>
      </body>
    </html>
  )
}

const options: MakerUIOptions = {
  colorThemes: ['light', 'dark', 'system'],
  layout: 'sidenav-content',
  topbar: {
    sticky: true,
    stickyOnMobile: false,
    hideOnMobile: false,
  },
  header: {
    navType: 'basic',
    navTypeMobile: 'logo-center',
    sticky: true,
    stickyOnMobile: true,
  },
  mobileMenu: {
    transition: 'fade',
    closeOnBlur: true,
    closeOnRouteChange: true,
  },
  sideNav: {
    isHeader: false,
    collapse: true,
    showCollapseOnMobile: true,
    closeOnBlur: true,
    closeOnRouteChange: true,
  },
}

