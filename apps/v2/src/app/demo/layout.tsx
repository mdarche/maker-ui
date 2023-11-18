import {
  Layout,
  LayoutProvider,
  ColorButton,
  Menu,
  type MenuItem,
  type MakerUIOptions,
} from 'maker-ui/layout'

const menu: MenuItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'Megamenu',
    path: '/about',
    megamenu: (
      <div style={{ height: 200, width: 200, background: '#000' }}>
        Lets go!
      </div>
    ),
  },
  {
    label: 'Demo',
    path: '/about',
    openNested: true,
    submenu: [
      { label: 'Accordion', path: '/demo/accordion' },
      { label: 'Carousel', path: '/demo/carousel' },
      { label: 'Forms', path: '/demo/forms' },
      { label: 'Lightbox', path: '/demo/lightbox' },
      { label: 'SmartGrid', path: '/demo/smart-grid' },
      { label: 'SmartTable', path: '/demo/smart-table' },
      { label: 'Modal', path: '/demo/modal' },
      { label: 'Notifications', path: '/demo/notifications' },
      { label: 'Popovers', path: '/demo/popovers' },
      { label: 'Scroll', path: '/demo/scroll' },
      { label: 'Social', path: '/demo/social' },
      { label: 'Spinners', path: '/demo/spinners' },
      { label: 'Style', path: '/demo/style' },
      { label: 'Tabs', path: '/demo/tabs' },
      { label: 'Transition', path: '/demo/transition' },
    ],
  },
  { label: 'Workspace', path: '/workspace' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutProvider options={options}>
      <Layout options={options}>
        <Layout.Header
          logo={{ icon: 'Logo', path: '/' }}
          menu={menu}
          widgets={<ColorButton />}
          menuButton={{ defaultIcon: 'menu' }}
        />
        <Layout.MobileMenu closeButton={{ defaultIcon: 'close' }} menu={menu} />
        <Layout.Main>{children}</Layout.Main>
        <Layout.SideNav
          menuButton={{
            icon: 'Collapse',
            fixed: true,
            position: { bottom: 30, right: 30 },
          }}>
          <Menu items={menu} />
        </Layout.SideNav>
        {/* <Layout.Footer>Footer stuff</Layout.Footer> */}
      </Layout>
    </LayoutProvider>
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
    navType: 'minimal',
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
