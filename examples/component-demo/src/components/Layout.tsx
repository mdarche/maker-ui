import React from 'react'
import {
  Layout,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  Footer,
  SideNav,
} from 'maker-ui'
import {
  Announcement,
  // PageTransition,
  // CookieNotice,
} from '@maker-ui/components'
// import { SEOProvider } from '@maker-ui/seo'

import { options } from './options.tsx'
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
]

// const seo = {
//   title: 'Components',
//   description: 'Check out the Maker UI component showcase.',
//   twitter: 'mkdarshay',
//   titleTemplate: ' | Maker UI',
//   siteUrl: 'http://localhost:8000',
// }

export default ({ children, location }) => (
  <Layout theme={theme} options={options}>
    {/* <Topbar>Topbar content</Topbar> */}
    <Announcement sx={{ p: 30 }}>This is an announcement</Announcement>
    <Header>
      <Navbar
        logo={'Components Demo'}
        menu={menu}
        widgetArea="test widget area"
      />
      <MobileMenu menu={menu} />
    </Header>
    <Content>
      <Main>
        {children}
        {/* <PageTransition>{children}</PageTransition> */}
      </Main>
      <SideNav menu={menu} />
    </Content>
    <Footer>Footer</Footer>
    {/* <CookieNotice /> */}
  </Layout>
)
