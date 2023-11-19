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
        {children}
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    </LayoutProvider>
  )
}

export const options: MakerUIOptions = {
  colorThemes: ['light', 'dark', 'system'],
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
}
