import { Layout } from '@maker-ui/layout'
import '@maker-ui/layout/dist/index.css'

import './_variables.css'
import './_global.css'

// prefix prop can be used with all nested layout children
// All buttons / toggles will be built in a separate file and 'use client' -- read classes from the DOM, not relying on React context
// Any mobile styles that need to be injected will occur in a separate 'use client' leaf component inside Maker UI layout component

export interface MakerUIOptions {
  // Can be applied as root props
  type:
    | 'content-sidebar'
    | 'content-sidenav'
    | 'content'
    | 'sidebar-content'
    | 'sidenav-content'
    | 'sidebar-content-sidebar'
  skiplinks: boolean
  // Can be applied as props to the relevant child
  topbar: {
    hideOnMobile: boolean
    sticky: boolean
    stickyOnMobile: boolean
  }
  header: {
    breakpoint: string | number
    navType: ''
    mobileNavType: ''
    absolute: boolean
    sticky: boolean
    stickyOnMobile: boolean
    stickyUpScroll: boolean | { delay: number; start: number }
    scrollClass: {
      scrollTop: number
      className: string
    }
    showColorButtonOnMobile: boolean
    showWidgetsOnMobile: boolean
    menuOverflow: 'wrap' | 'scroll'
    dropdown: {
      caret: boolean | React.ReactElement
      transition: 'scale' | 'fade' | 'fade-down' | 'fade-up' | 'none'
    }
    menuButton?:
      | React.ReactNode
      | ((isOpen: boolean, attributes: object) => React.ReactNode)
    colorButton?:
      | React.ReactNode
      | ((
          currentMode?: string,
          attributes?: object,
          preference?: string
        ) => React.ReactNode)
  }
  mobileMenu: {
    transition: ''
    showCloseButton: boolean
    visibleOnDesktop: boolean
    closeOnBlur: boolean
    closeOnRouteChange: boolean
    closeButton?:
      | React.ReactNode
      | ((isOpen: boolean, attributes: object) => React.ReactNode)
  }
  sideNav: {
    breakpoint: string | number
    isHeader: boolean
    isPrimaryMobileNav: boolean
    closeOnBlur: boolean
    closeOnRouteChange: boolean
    showToggleOnMobile: boolean
    toggleButton?:
      | React.ReactNode
      | ((isOpen: boolean, attributes: object) => React.ReactNode)
    collapse: boolean
    collapseButton?:
      | React.ReactNode
      | ((isOpen: boolean, attributes: object) => React.ReactNode)
  }
  sidebar: {
    breakpoint: string | number
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Layout>
          <Layout.Topbar />
          {/* <Layout.Header logo="" menu="" /> */}
          {/* <Layout.MobileMenu />
          <Layout.Main>{children}</Layout.Main>
          <Layout.Sidebar>Sidebar</Layout.Sidebar>
          <Layout.SideNav>SideNav</Layout.SideNav>
          <Layout.Footer>Footer stuff</Layout.Footer> */}
        </Layout>
      </body>
    </html>
  )
}
