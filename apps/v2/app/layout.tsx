// import { ColorButton } from '@maker-ui/layout'
import { Layout } from '@maker-ui/layout/dist/Layout'
// import '@maker-ui/layout/dist/index.css'

import './_variables.css'
import './_global.css'

// prefix prop can be used with all nested layout children
// All buttons / toggles will be built in a separate file and 'use client' -- read classes from the DOM, not relying on React context
// Any mobile styles that need to be injected will occur in a separate 'use client' leaf component inside Maker UI layout component

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Layout>
          <Layout.Topbar>Test</Layout.Topbar>
          <Layout.Header />
          <Layout.MobileMenu />
          <Layout.Main>{children}</Layout.Main>
          <Layout.Sidebar>Sidebar</Layout.Sidebar>
          <Layout.SideNav>SideNav</Layout.SideNav>
          <Layout.Footer>Footer stuff</Layout.Footer>
        </Layout>
      </body>
    </html>
  )
}
