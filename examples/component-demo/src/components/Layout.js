import React from 'react'
import {
  Layout,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  Footer,
} from 'elements-ui'
import { Announcement } from '@maker-ui/components'
import { SEOProvider } from '@maker-ui/seo'

import options from './options'
import theme from './theme'

const menu = [
  { label: 'Carousel', path: '/carousel' },
  { label: 'Tabs', path: '/tabs' },
  { label: 'Accordion', path: '/accordion' },
  { label: 'Generative', path: '/generative' },
  { label: 'Tree Menu', path: '/tree-menu' },
  { label: 'Modal', path: '/modal' },
  { label: 'Lightbox', path: '/lightbox' },
]

const seo = {
  title: 'Components',
  description: 'Check out the Maker UI component showcase.',
  twitter: 'mkdarshay',
  titleTemplate: ' | Alpha UI',
  siteUrl: 'http://localhost:8000',
}

export default ({ children, location }) => (
  <SEOProvider base={seo}>
    <Layout theme={theme} options={options}>
      <Announcement sx={{ p: 30 }}>This is an announcement</Announcement>
      <Header>
        <Navbar logo={'Components Demo'} menu={menu} />
        <MobileMenu menu={menu} />
      </Header>
      <Content>
        <Main>{children}</Main>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
    {/* <Template
      options={options}
      theme={theme}
      menu={menu}
      pathname={location.pathname}
      logo="Components Demo">
      {children}
    </Template> */}
  </SEOProvider>
)
