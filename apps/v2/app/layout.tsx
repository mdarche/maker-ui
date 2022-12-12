import { Layout, type MakerUIOptions } from '@maker-ui/layout'
import { Provider } from '../components/client'

import '@maker-ui/layout/dist/index.css'
import './_variables.css'
import './_global.css'

const options: MakerUIOptions = {
  colorThemes: ['light', 'dark', 'system'],
  type: 'content-sidenav',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider options={options}>
          <Layout options={options}>
            <Layout.Topbar>Test</Layout.Topbar>
            <Layout.Header />
            <Layout.MobileMenu />
            <Layout.Main>{children}</Layout.Main>
            <Layout.Sidebar>Sidebar</Layout.Sidebar>
            <Layout.SideNav>SideNav</Layout.SideNav>
            <Layout.Footer>Footer stuff</Layout.Footer>
          </Layout>
        </Provider>
      </body>
    </html>
  )
}
