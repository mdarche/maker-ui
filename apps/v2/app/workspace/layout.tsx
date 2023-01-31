import { Layout, type MakerUIOptions } from '@maker-ui/layout'
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
    <Provider options={options}>
      <Layout options={options}>
        <Layout.Topbar>Test topbar</Layout.Topbar>
        <Layout.Header
          logo={<Link href="/">Logo</Link>}
          menu={<NavMenu menuItems={menu} />}
          widgets={<ColorButton />}
          menuButton={<MenuButton />}
        />
        <Layout.MobileMenu closeButton={<MenuButton close />}>
          <CollapseMenu items={menu} />
        </Layout.MobileMenu>
        <Layout.Workspace
          left={<div>Left Panel Menus</div>}
          right={<div>Right Panel Details</div>}
          toggles={{
            left: (
              <WorkspaceButton
                left
                fixed
                position={{
                  top: 'calc(var(--height-header) + 100px)',
                  left: 30,
                }}>
                Left Panel
              </WorkspaceButton>
            ),
            right: (
              <WorkspaceButton
                right
                fixed
                hideOnMobile
                position={{
                  top: 'calc(var(--height-header) + 100px)',
                  right: 30,
                }}>
                Right
              </WorkspaceButton>
            ),
          }}>
          {children}
        </Layout.Workspace>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    </Provider>
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
