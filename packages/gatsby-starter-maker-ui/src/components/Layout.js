import React from 'react'
import {
  Layout,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  Footer,
} from 'maker-ui'
import { SEOProvider } from '@maker-ui/seo'

import options from '../config/options'
import theme from '../config/theme'
import { menu } from '../config/menus'

const defaultSEO = {
  title: 'Gatsby Starter Maker UI',
  titleTemplate: ' | Maker UI',
  description:
    'This is the default Gatsby starter for prototyping with Maker UI.',
  siteUrl: 'https://maker-ui.dev/gatsby-starter-elements',
  twitter: 'mkdarshay',
}

export default ({ children, location }) => (
  <Layout theme={theme} options={options}>
    <Header>
      <Navbar
        logo={`Gatsby Starter Maker UI`}
        menu={menu}
        pathname={location.pathname}
      />
      <MobileMenu menu={menu} pathname={location.pathname} />
    </Header>
    <Content>
      <Main>
        <SEOProvider base={defaultSEO}>{children}</SEOProvider>
      </Main>
    </Content>
    <Footer>Add a custom footer component here</Footer>
  </Layout>
)
