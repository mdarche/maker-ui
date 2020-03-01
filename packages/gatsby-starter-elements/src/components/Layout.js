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

import options from '../config/options'
import theme from '../config/theme'
import { menu } from '../config/menus'

export default ({ children, location }) => (
  <Layout theme={theme} options={options}>
    <Header>
      <Navbar
        logo={`Gatsby Starter Elements`}
        menu={menu}
        pathname={location.pathname}
      />
      <MobileMenu menu={menu} pathname={location.pathname} />
    </Header>
    <Content>
      <Main>{children}</Main>
    </Content>
    <Footer>Add a custom footer component here</Footer>
  </Layout>
)
