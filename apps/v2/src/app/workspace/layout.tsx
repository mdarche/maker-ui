import {
  Layout,
  LayoutProvider,
  type MakerUIOptions,
  ColorButton,
  type MenuItem,
} from 'maker-ui/layout'
import Link from 'next/link'

const menu: MenuItem[] = [
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
        <Layout.Header
          logo={<Link href="/">Logo</Link>}
          menu={menu}
          widgets={<ColorButton />}
          menuButton={{ defaultIcon: 'menu' }}
        />
        <Layout.MobileMenu closeButton={{ defaultIcon: 'close' }} menu={menu} />
        <Layout.Workspace
          leftPanel={<div>Left Panel Menus</div>}
          rightPanel={<div>Right Panel Details</div>}
          menuButtons={{
            right: {
              icon: 'Right Panel',
              fixed: true,
              position: {
                top: 'calc(var(--height-header) + 100px)',
                right: 30,
              },
            },
            left: {
              icon: 'Left Panel',
              fixed: true,
              position: { top: 'calc(var(--height-header) + 100px)', left: 30 },
            },
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
