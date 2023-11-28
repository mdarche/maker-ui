import { Layout, Menu } from 'maker-ui/layout'
import { primaryMenu } from '../menu'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout fragment>
      <Layout.LeftPanel
        menuButton={{
          fixed: true,
          defaultIcon: 'menu',
          position: { bottom: 20, left: 20 },
        }}>
        <Menu items={primaryMenu} />
      </Layout.LeftPanel>
      <Layout.Main>{children}</Layout.Main>
    </Layout>
  )
}
