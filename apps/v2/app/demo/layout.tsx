import { Layout, type MakerUIOptions } from 'maker-ui'
import {
  LayoutProvider,
  type MenuItemProps,
  CollapseMenu,
  ColorButton,
  MenuButton,
  NavMenu,
} from 'maker-ui/layout'
import Link from 'next/link'
import { CustomCollapseMenu } from '@/client'

const menu: MenuItemProps[] = [
  { label: 'Home', path: '/' },
  {
    label: 'Demo',
    path: '/about',
    openNested: true,
    submenu: [
      { label: 'Accordion', path: '/demo/accordion' },
      { label: 'Carousel', path: '/demo/carousel' },
      { label: 'Forms', path: '/demo/forms' },
      { label: 'Lightbox', path: '/demo/lightbox' },
      { label: 'Modal', path: '/demo/modal' },
      { label: 'Notifications', path: '/demo/notifications' },
      { label: 'Popovers', path: '/demo/popovers' },
      { label: 'Social', path: '/demo/social' },
      { label: 'Spinners', path: '/demo/spinners' },
      { label: 'Style', path: '/demo/style' },
      { label: 'Tabs', path: '/demo/tabs' },
      { label: 'Transition', path: '/demo/transition' },
    ],
  },
  { label: 'Workspace', path: '/workspace' },
  {
    label: 'Megamenu',
    path: '/about',
    megamenu: (
      <div style={{ height: 200, width: 200, background: '#000' }}>
        Lets go!
      </div>
    ),
  },
]

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
