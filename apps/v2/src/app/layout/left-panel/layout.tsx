import { Layout } from 'maker-ui/layout'

export default function LeftPanelLayout({
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
      <Layout.Main>{children}</Layout.Main>
    </Layout>
  )
}
