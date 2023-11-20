import { Layout } from 'maker-ui/layout'

export default function BothPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout fragment>
      <Layout.LeftPanel
        menuButton={{
          icon: 'Left Panel',
          fixed: true,
          className: 'test',
          position: {
            top: 'calc(var(--height-header) + 100px)',
            left: 30,
          },
          css: {
            zIndex: 99,
          },
        }}>
        Left Panel
      </Layout.LeftPanel>
      <Layout.RightPanel
        menuButton={{
          icon: 'Right Panel',
          // fixed: true,
          position: {
            top: 'calc(var(--height-header) + 100px)',
            right: 30,
          },
          css: {
            zIndex: 99,
          },
        }}>
        Right Panel
      </Layout.RightPanel>
      <Layout.Main>{children}</Layout.Main>
    </Layout>
  )
}
