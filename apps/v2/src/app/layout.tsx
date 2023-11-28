import {
  Layout,
  LayoutProvider,
  type MakerUIOptions,
  ColorButton,
} from 'maker-ui/layout'
import { ResponsiveStyle } from 'maker-ui/layout'
import Link from 'next/link'

import 'maker-ui/layout.css'
import 'maker-ui/lightbox.css'
import 'maker-ui/data.css'
import '@maker-ui/studio/studio.css'
import '@/styles/variables.css'
import '@/styles/global.css'

import { primaryMenu } from './menu'

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
      <head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
        <link key="favicon" rel="shortcut icon" href="/favicon.ico" />
        <ResponsiveStyle options={options} />
      </head>
      <body>
        <LayoutProvider options={options}>
          <Layout options={options}>
            <Layout.Header
              logo={<Link href="/">Logo</Link>}
              menu={primaryMenu}
              widgets={<ColorButton />}
              menuButton={{ defaultIcon: 'menu' }}
            />
            <Layout.MobileMenu
              closeButton={{ defaultIcon: 'close' }}
              menu={primaryMenu}
            />
            {children}
            <Layout.Footer>Footer</Layout.Footer>
          </Layout>
        </LayoutProvider>
      </body>
    </html>
  )
}

export const options: MakerUIOptions = {
  colorThemes: ['light', 'dark', 'system'],
  header: {
    // absolute: true,
    template: 'basic',
    templateMobile: 'logo-center',
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
