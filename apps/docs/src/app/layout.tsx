import type { Metadata } from 'next'
import { Layout, LayoutProvider, type MakerUIOptions } from 'maker-ui'
import { Menu } from 'maker-ui/layout'
import { DesktopWidgets, SharedWidgets } from '../components/NavArea'

import 'maker-ui/layout.css'
import '@docsearch/css/dist/modal.css'
import '@docsearch/css/dist/_variables.css'
import '@/styles/styles.scss'

import { headerMenu, sideMenu } from './menu'

export const metadata: Metadata = {
  title: {
    default: 'Maker UI - React Design System',
    template: '%s - Maker UI',
  },
  metadataBase: new URL('https://maker-ui.com'),
  description:
    'Maker UI is a lightweight design system that helps you create responsive Next.js apps. Build accessible, production ready layouts in just a few lines of code, or use Maker UI components to construct responsive experiences.',
  openGraph: {
    title: 'Maker UI - React Design System',
    url: 'https://maker-ui.com/',
    siteName: 'Maker UI',
    images: '/share.jpg',
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    follow: true,
    index: true,
  },
  themeColor: '#fff',
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
              logo={{ icon: 'Maker UI', path: '/' }}
              menu={headerMenu}
              widgets={<DesktopWidgets />}
              menuButton={{ defaultIcon: 'menu' }}
            />
            <Layout.MobileMenu
              closeButton={{ defaultIcon: 'close' }}
              menu={sideMenu}
            />
            <Layout.Main>{children}</Layout.Main>
            <Layout.SideNav
              menuButton={{
                icon: 'Collapse',
                fixed: true,
                position: { bottom: 30, right: 30 },
              }}>
              <SharedWidgets />
              <Menu items={sideMenu} />
            </Layout.SideNav>
          </Layout>
        </LayoutProvider>
      </body>
    </html>
  )
}

const options: MakerUIOptions = {
  colorThemes: ['light', 'dark', 'system'],
  layout: 'sidenav-content',
  header: {
    navType: 'basic-left',
    navTypeMobile: 'basic',
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
    isPrimaryMobileNav: true,
    collapse: true,
    showCollapseOnMobile: false,
    closeOnBlur: true,
    closeOnRouteChange: true,
  },
}
