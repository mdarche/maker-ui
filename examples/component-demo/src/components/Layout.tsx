import * as React from 'react'
import {
  Layout,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  Footer,
  Sidebar,
  SideNav,
  Topbar,
  Workspace,
} from 'maker-ui'
import {
  Announcement,
  // PageTransition,
  // CookieNotice,
} from '@maker-ui/components'
// import { SEOProvider } from '@maker-ui/seo'
// import { Fixed } from './Fixed'
import { options } from './options'
import { theme } from './theme'

const menu = [
  {
    label: 'Carousel',
    path: '/carousel',
    submenu: [
      { label: 'Tabs', path: '/tabs' },
      {
        label: 'Tabs',
        path: '/tabs',
        submenu: [
          { label: 'Tabs', path: '/tabs' },
          { label: 'Tabs', path: '/tabs' },
        ],
      },
    ],
  },
  { label: 'Tabs', path: '/tabs' },
  { label: 'Accordion', path: '/accordion' },
  { label: 'Generative', path: '/generative' },
  { label: 'Tree Menu', path: '/tree-menu' },
  { label: 'Modal', path: '/modal' },
  { label: 'Lightbox', path: '/lightbox' },
  { label: 'Popover', path: '/popover' },
  { label: 'TableofContents', path: '/toc' },
  { label: 'Workspace', path: '/workspace' },
]

export default ({ children, location }) => (
  <Layout theme={theme} options={options}>
    <Topbar>Topbar content</Topbar>
    <Header>
      <Navbar
        logo={'Components Demo'}
        menu={menu}
        colorButtonInner={<div>Test</div>}
        menuButtonInner="Menu!"
        customMenuButton={(isOpen, attributes) => (
          <button {...attributes}>{isOpen ? 'Close' : 'Open'}</button>
        )}
      />
      <MobileMenu menu={menu} />
      {/* <MobileMenu menu={menu} closeButton={<div>Close!</div>} /> */}
    </Header>
    {location.pathname !== '/workspace' ? (
      <Content>
        <Main>{children}</Main>
        <SideNav menu={menu} />
      </Content>
    ) : (
      <Content>
        <Workspace>
          {/* <Workspace.Toolbar>Toolbar</Workspace.Toolbar> */}
          <Workspace.Panel>Panel</Workspace.Panel>
          <Workspace.Canvas>{children}</Workspace.Canvas>
          <Workspace.Panel>Panel</Workspace.Panel>
        </Workspace>
      </Content>
    )}
    <Footer>Footer</Footer>
    {/* <CookieNotice /> */}
  </Layout>
)
