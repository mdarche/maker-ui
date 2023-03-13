import { Layout, LayoutProvider, type MakerUIOptions } from 'maker-ui'
import Link from 'next/link'
import {
  Menu,
  ColorButton,
  MenuButton,
  NavMenu,
  type MenuItemProps,
} from 'maker-ui/layout'

const menu: MenuItemProps[] = [
  { label: 'Home', path: '/' },
  { label: 'Demo', path: '/demo' },
]

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutProvider options={options}>
      <Layout options={options}>
        {/* <Layout.Topbar>Test topbar</Layout.Topbar> */}
        <Layout.Header
          logo={<Link href="/">Logo</Link>}
          menu={<NavMenu menuItems={menu} />}
          widgets={<ColorButton />}
          menuButton={{ defaultIcon: 'menu' }}
        />
        <Layout.MobileMenu closeButton={{ defaultIcon: 'close' }} menu={menu} />
        <Layout.Workspace
          left={<div>Left Panel Menus</div>}
          right={<div>Right Panel Details</div>}
          toggles={{
            left: (
              <MenuButton
                type="ws-left"
                icon="Left Panel"
                fixed
                position={{
                  top: 'calc(var(--height-header) + 100px)',
                  left: 30,
                }}
              />
            ),
            right: (
              <MenuButton
                type="ws-right"
                icon="Right Panel"
                fixed
                position={{
                  top: 'calc(var(--height-header) + 100px)',
                  right: 30,
                }}
              />
            ),
          }}>
          {children}
        </Layout.Workspace>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    </LayoutProvider>
  )
}

const options: MakerUIOptions = {
  colorThemes: ['light', 'dark', 'system'],
  layout: 'workspace',
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
