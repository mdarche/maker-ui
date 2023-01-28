import { Layout, type MakerUIOptions } from '@maker-ui/layout'
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
        <Layout.Workspace
          settings={{
            breakpoints: [800],
            columns: ['1fr', '1fr 2fr 1fr'],
            main: 'center',
          }}
          left={<div>Left Panel Menus</div>}
          center={children}
          right={<div>Right Panel Details</div>}
          toggleButtons={{
            left: <WorkspaceButton left />,
            right: <WorkspaceButton right hideOnMobile />,
          }}
        />
      </Layout>
    </Provider>
  )
}

export const options: MakerUIOptions = {
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
