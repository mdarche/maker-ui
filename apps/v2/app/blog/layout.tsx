import { Layout, type MakerUIOptions } from 'maker-ui'
import Link from 'next/link'
import {
  CollapseMenu,
  ColorButton,
  MenuButton,
  NavMenu,
  Provider,
  MenuItemProps,
  CustomCollapseMenu,
} from '@/client'

const menu: MenuItemProps[] = [
  { label: 'Home', path: '/' },
  { label: 'Workspace', path: '/workspace' },
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
            <Layout.SideNav
              collapseButton={
                <MenuButton sideNav style={{ bottom: 30, right: 30 }}>
                  Collapse
                </MenuButton>
              }>
              <CustomCollapseMenu menu={menu} />
            </Layout.SideNav>
            {/* <Layout.Footer>Footer stuff</Layout.Footer> */}
          </Layout>
        </Provider>
      </body>
    </html>
  )
}

const options: MakerUIOptions = {
  colorThemes: ['light', 'dark', 'system'],
  layout: 'sidenav-content',
  topbar: {
    sticky: false,
    stickyOnMobile: false,
    hideOnMobile: false,
  },
  header: {
    // absolute: true,
    navType: 'basic',
    navTypeMobile: 'logo-center',
    sticky: true,
    stickyOnMobile: true,
    // stickyUpScroll: true,
    // scrollClass: {
    //   scrollTop: 1000,
    //   className: 'testss',
    // },
  },
  mobileMenu: {
    transition: 'fade',
    visibleOnDesktop: false,
    closeOnBlur: true,
    closeOnRouteChange: true,
  },
  sideNav: {
    isHeader: false,
    collapse: true,
    showCollapseOnMobile: false,
    closeOnBlur: true,
    closeOnRouteChange: true,
    // isPrimaryMobileNav: true,
    // cssTransition?: string;
  },
}
